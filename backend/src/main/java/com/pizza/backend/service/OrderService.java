package com.pizza.backend.service;

import com.pizza.backend.data.model.Order;
import com.pizza.backend.data.model.OrderItem;
import com.pizza.backend.data.model.Pizza;
import com.pizza.backend.data.model.User;
import com.pizza.backend.data.repository.OrderRepository;
import com.pizza.backend.data.repository.PizzaRepository;
import com.pizza.backend.data.repository.UserRepository;
import com.pizza.backend.dto.response.OrderDto;
import com.pizza.backend.dto.request.OrderRequest;
import com.pizza.backend.exception.ResourceNotFoundException;
import com.pizza.backend.mapper.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final PizzaRepository pizzaRepository;
    private final UserRepository userRepository;
    private final OrderMapper orderMapper;
    private final PaystackService paystackService;
    private final KafkaOrderProducer kafkaOrderProducer;

    @Transactional
    public Map<String, Object> createOrder(UUID userId, OrderRequest orderRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setStatus(Order.OrderStatus.PENDING);

        List<OrderItem> items = orderRequest.getItems().stream().map(itemReq -> {
            Pizza pizza = pizzaRepository.findById(itemReq.getPizzaId())
                    .orElseThrow(() -> new ResourceNotFoundException("Pizza not found"));
            return OrderItem.builder()
                    .order(order)
                    .pizza(pizza)
                    .quantity(itemReq.getQuantity())
                    .priceAtOrder(pizza.getPrice())
                    .build();
        }).collect(Collectors.toList());

        order.setItems(items);
        BigDecimal total = items.stream()
                .map(item -> item.getPriceAtOrder().multiply(new BigDecimal(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        order.setTotalAmount(total);

        String reference = "ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        order.setPaymentReference(reference);

        orderRepository.save(order);

        // Initial event
        OrderDto orderDto = orderMapper.toDto(order);
        kafkaOrderProducer.sendOrderPlacedEvent(orderDto);

        // Initialize Paystack
        return paystackService.initializeTransaction(user.getEmail(), total, reference);
    }

    @Transactional
    public OrderDto confirmPayment(String reference) {
        Order order = orderRepository.findAll().stream()
                .filter(o -> reference.equals(o.getPaymentReference()))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Order with reference " + reference + " not found"));

        if (paystackService.verifyTransaction(reference)) {
            order.setStatus(Order.OrderStatus.PAID);
            orderRepository.save(order);

            OrderDto orderDto = orderMapper.toDto(order);
            kafkaOrderProducer.sendPaymentConfirmedEvent(orderDto);
            return orderDto;
        }

        throw new RuntimeException("Payment verification failed");
    }

    public List<OrderDto> getUserOrders(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return orderRepository.findByUser(user).stream()
                .map(orderMapper::toDto)
                .collect(Collectors.toList());
    }
}
