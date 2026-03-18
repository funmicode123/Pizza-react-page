package com.pizza.backend.controller;

import com.pizza.backend.dto.response.PizzaDto;
import com.pizza.backend.service.PizzaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/pizzas")
@RequiredArgsConstructor
public class PizzaController {
    private final PizzaService pizzaService;

    @GetMapping
    public ResponseEntity<List<PizzaDto>> getAllPizzas() {
        return ResponseEntity.ok(pizzaService.getAllPizzas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PizzaDto> getPizzaById(@PathVariable UUID id) {
        return ResponseEntity.ok(pizzaService.getPizzaById(id));
    }

    @PostMapping
    public ResponseEntity<PizzaDto> createPizza(@RequestBody PizzaDto pizzaDto) {
        return ResponseEntity.ok(pizzaService.createPizza(pizzaDto));
    }
}
