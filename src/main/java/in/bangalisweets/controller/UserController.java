package in.bangalisweets.controller;

import in.bangalisweets.entity.Address;
import in.bangalisweets.entity.User;
import in.bangalisweets.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<User> profile(Authentication auth) {
        Long userId = (Long) auth.getDetails();
        return ResponseEntity.ok(userService.getById(userId));
    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(@RequestBody Map<String, String> body,
                                              Authentication auth) {
        Long userId = (Long) auth.getDetails();
        return ResponseEntity.ok(userService.updateProfile(userId, body.get("name"), body.get("email")));
    }

    @PostMapping("/addresses")
    public ResponseEntity<Address> addAddress(@RequestBody Address address, Authentication auth) {
        Long userId = (Long) auth.getDetails();
        return ResponseEntity.ok(userService.addAddress(userId, address));
    }

    @DeleteMapping("/addresses/{addressId}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long addressId, Authentication auth) {
        Long userId = (Long) auth.getDetails();
        userService.deleteAddress(userId, addressId);
        return ResponseEntity.noContent().build();
    }
}
