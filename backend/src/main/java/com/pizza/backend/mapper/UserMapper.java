package com.pizza.backend.mapper;

import com.pizza.backend.data.model.User;
import com.pizza.backend.dto.response.UserDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toDto(User user);
    User toEntity(UserDto userDto);
}
