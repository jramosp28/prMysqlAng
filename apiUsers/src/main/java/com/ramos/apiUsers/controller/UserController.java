package com.ramos.apiUsers.controller;

import com.ramos.apiUsers.model.User;
import com.ramos.apiUsers.service.UserService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author javierrampob
 */
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

    private final UserService userService;

    @GetMapping("/user")
    public List<User> listUsers() {
        return userService.listUsers();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUser(@PathVariable Integer id) {
        try {
            User user = userService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/user")
    public void newUser(@RequestBody User user) {
        userService.saveUser(user);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<?> editUser(@RequestBody User user, @PathVariable Integer id) {
        try {
            User userExist = userService.getUserById(id);
            userExist.setName(user.getName());
            userExist.setLast_name(user.getLast_name());
            userExist.setLast_name2(user.getLast_name2());
            userExist.setEmail(user.getEmail());
            userExist.setPhone(user.getPhone());
            userExist.setAddress(user.getAddress());
            userExist.setCity(user.getCity());
            userExist.setDate(user.getDate());
            userExist.setBike_model(user.getBike_model());
            userService.saveUser(userExist);
            ResponseEntity<User> userResponseEntity = new ResponseEntity<>(user, HttpStatus.OK);
            return userResponseEntity;
        } catch (Exception e) {
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable Integer id) {
        userService.removeUser(id);
    }
}
