package in.bangalisweets.service;

import in.bangalisweets.entity.Address;
import in.bangalisweets.entity.User;
import in.bangalisweets.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepo;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public User getById(Long id) {
        return userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getByPhone(String phone) {
        return userRepo.findByPhone(phone)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<User> getAll() {
        return userRepo.findAll();
    }

    @Transactional
    public User updateProfile(Long id, String name, String email) {
        User user = getById(id);
        if (name != null && !name.isBlank()) user.setName(name.trim());
        if (email != null && !email.isBlank()) user.setEmail(email.trim());
        return userRepo.save(user);
    }

    @Transactional
    public Address addAddress(Long userId, Address address) {
        User user = getById(userId);
        address.setUser(user);
        if (address.getIsDefault()) {
            user.getAddresses().forEach(a -> a.setIsDefault(false));
        }
        user.getAddresses().add(address);
        userRepo.save(user);
        return address;
    }

    @Transactional
    public void deleteAddress(Long userId, Long addressId) {
        User user = getById(userId);
        user.getAddresses().removeIf(a -> a.getId().equals(addressId));
        userRepo.save(user);
    }
}
