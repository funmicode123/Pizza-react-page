package com.pizza.backend.service;

import com.pizza.backend.data.model.Pizza;
import com.pizza.backend.data.repository.PizzaRepository;
import com.pizza.backend.dto.response.PizzaDto;
import com.pizza.backend.exception.ResourceNotFoundException;
import com.pizza.backend.mapper.PizzaMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PizzaService {
    private final PizzaRepository pizzaRepository;
    private final PizzaMapper pizzaMapper;

    public List<PizzaDto> getAllPizzas() {
        return pizzaRepository.findAll().stream()
                .map(pizzaMapper::toDto)
                .collect(Collectors.toList());
    }

    public PizzaDto getPizzaById(UUID id) {
        Pizza pizza = pizzaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pizza not found with id: " + id));
        return pizzaMapper.toDto(pizza);
    }

    public PizzaDto createPizza(PizzaDto pizzaDto) {
        Pizza pizza = pizzaMapper.toEntity(pizzaDto);
        return pizzaMapper.toDto(pizzaRepository.save(pizza));
    }
}
