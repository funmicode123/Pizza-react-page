package com.pizza.backend.controller;

import com.pizza.backend.dto.response.UserDto;
import com.pizza.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserProfile(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.getUserProfile(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUserProfile(@PathVariable UUID id, @RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.updateUserProfile(id, userDto));
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDto> signupUser(@RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.signupUser(userDto));
    }
}
