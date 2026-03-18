package com.pizza.backend.dto.response;

import com.pizza.backend.data.model.Order.OrderStatus;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDto {
    private UUID id;
    private UserDto user;
    private List<OrderItemDto> items;
    private BigDecimal totalAmount;
    private OrderStatus status;
    private String paymentReference;
    private LocalDateTime createdAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderItemDto {
        private PizzaDto pizza;
        private int quantity;
        private BigDecimal priceAtOrder;
    }
}
