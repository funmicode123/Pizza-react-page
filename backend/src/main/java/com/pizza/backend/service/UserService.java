package com.pizza.backend.service;

import com.pizza.backend.data.model.User;
import com.pizza.backend.data.repository.UserRepository;
import com.pizza.backend.dto.response.UserDto;
import com.pizza.backend.exception.ResourceNotFoundException;
import com.pizza.backend.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserDto getUserProfile(UUID id) {
        return userRepository.findById(id)
                .map(userMapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public UserDto updateUserProfile(UUID id, UserDto userDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        
        return userMapper.toDto(userRepository.save(user));
    }

    public UserDto signupUser(UserDto userDto) {
        // If user already exists (e.g., subsequent OAuth logins), just return their data
        return userRepository.findById(userDto.getId())
                .map(userMapper::toDto)
                .orElseGet(() -> {
                    User newUser = User.builder()
                            .id(userDto.getId())
                            .email(userDto.getEmail())
                            .firstName(userDto.getFirstName())
                            .lastName(userDto.getLastName())
                            .role(User.Role.USER)
                            .build();
                    return userMapper.toDto(userRepository.save(newUser));
                });
    }
}
