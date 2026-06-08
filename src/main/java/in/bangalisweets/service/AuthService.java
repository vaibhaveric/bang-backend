package in.bangalisweets.service;

import in.bangalisweets.entity.OtpStore;
import in.bangalisweets.entity.User;
import in.bangalisweets.repository.OtpRepository;
import in.bangalisweets.repository.UserRepository;
import in.bangalisweets.security.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;

@Service
public class AuthService {

    private final OtpRepository otpRepo;
    private final UserRepository userRepo;
    private final JwtUtil jwtUtil;

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.password}")
    private String adminPassword;

    public AuthService(OtpRepository otpRepo, UserRepository userRepo, JwtUtil jwtUtil) {
        this.otpRepo = otpRepo;
        this.userRepo = userRepo;
        this.jwtUtil = jwtUtil;
    }

    @Transactional
    public String sendOtp(String phone) {
        otpRepo.deleteExpired(LocalDateTime.now());
        String otp = String.format("%06d", new Random().nextInt(999999));
        OtpStore store = new OtpStore();
        store.setPhone(phone);
        store.setOtp(otp);
        store.setExpiresAt(LocalDateTime.now().plusMinutes(10));
        otpRepo.save(store);
        // In production: integrate SMS gateway here
        return otp; // returned for dev; remove in production
    }

    @Transactional
    public Map<String, Object> verifyOtp(String phone, String otp, String name) {
        OtpStore record = otpRepo
                .findTopByPhoneAndUsedFalseOrderByExpiresAtDesc(phone)
                .orElseThrow(() -> new RuntimeException("No OTP found for this number"));

        if (record.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired");
        }
        if (!record.getOtp().equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }

        record.setUsed(true);
        otpRepo.save(record);

        User user = userRepo.findByPhone(phone).orElseGet(() -> {
            User u = new User();
            u.setPhone(phone);
            return u;
        });

        if (name != null && !name.isBlank() && (user.getName() == null || user.getName().isBlank())) {
            user.setName(name.trim());
        }
        userRepo.save(user);

        String token = jwtUtil.generateUserToken(phone, user.getId());
        return Map.of(
                "token", token,
                "userId", user.getId(),
                "name", user.getName() != null ? user.getName() : "",
                "phone", user.getPhone(),
                "isNew", user.getName() == null || user.getName().isBlank()
        );
    }

    public Map<String, Object> adminLogin(String username, String password) {
        if (!adminUsername.equals(username) || !adminPassword.equals(password)) {
            throw new RuntimeException("Invalid admin credentials");
        }
        String token = jwtUtil.generateAdminToken(username);
        return Map.of("token", token, "role", "ADMIN");
    }
}
