package com.pizza.backend.data.repository;

import com.pizza.backend.data.model.Pizza;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface PizzaRepository extends JpaRepository<Pizza, UUID> {
}
