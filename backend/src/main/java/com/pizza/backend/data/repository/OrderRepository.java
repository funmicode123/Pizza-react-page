package com.pizza.backend.data.repository;

import com.pizza.backend.data.model.Order;
import com.pizza.backend.data.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {
    List<Order> findByUser(User user);
}
