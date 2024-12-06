package com.example.TestJavaspringboot.controller;

import com.example.TestJavaspringboot.model.User;
import com.example.TestJavaspringboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userid}")
    public User getUserById(@PathVariable int userid) { 
        return userService.getUserById(userid);
    }

    @PostMapping("/register")
    public String createUser(@RequestBody User user) {
        int result = userService.createUser(user);
        return result > 0 ? "User created successfully" : "Error creating user";
    }

    @PutMapping("/{userid}")
    public String updateUser(@PathVariable int userid, @RequestBody User user) {
        int result = userService.updateUser(userid, user);
        return result > 0 ? "User updated successfully" : "Error updating user";
    }

    @DeleteMapping("/{userid}")
    public String deleteUser(@PathVariable int userid) {
        int result = userService.deleteUser(userid);
        return result > 0 ? "User deleted successfully" : "Error deleting user";
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
    User loggedInUser = userService.login(user.getUsername(), user.getPassword());
    if (loggedInUser != null) {
        return ResponseEntity.ok(loggedInUser); // ส่งข้อมูลผู้ใช้ที่เข้าสู่ระบบกลับไป
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }
}


}
