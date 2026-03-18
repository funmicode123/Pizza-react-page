package com.pizza.backend.controller;

import com.pizza.backend.dto.response.OrderDto;
import com.pizza.backend.dto.request.OrderRequest;
import com.pizza.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> createOrder(@PathVariable UUID userId, @RequestBody OrderRequest orderRequest) {
        return ResponseEntity.ok(orderService.createOrder(userId, orderRequest));
    }

    @PostMapping("/confirm/{reference}")
    public ResponseEntity<OrderDto> confirmPayment(@PathVariable String reference) {
        return ResponseEntity.ok(orderService.confirmPayment(reference));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderDto>> getUserOrders(@PathVariable UUID userId) {
        return ResponseEntity.ok(orderService.getUserOrders(userId));
    }
}
