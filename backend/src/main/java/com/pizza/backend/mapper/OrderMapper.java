package com.pizza.backend.mapper;

import com.pizza.backend.data.model.Order;
import com.pizza.backend.data.model.OrderItem;
import com.pizza.backend.dto.response.OrderDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {UserMapper.class, PizzaMapper.class})
public interface OrderMapper {
    @Mapping(target = "user", source = "user")
    @Mapping(target = "items", source = "items")
    OrderDto toDto(Order order);

    @Mapping(target = "pizza", source = "pizza")
    OrderDto.OrderItemDto toDto(OrderItem orderItem);
}
