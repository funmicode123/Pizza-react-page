package com.pizza.backend.mapper;

import com.pizza.backend.data.model.Pizza;
import com.pizza.backend.dto.response.PizzaDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PizzaMapper {
    PizzaDto toDto(Pizza pizza);
    Pizza toEntity(PizzaDto pizzaDto);
}
