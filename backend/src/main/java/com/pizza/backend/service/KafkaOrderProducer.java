package com.pizza.backend.service;

import com.pizza.backend.dto.response.OrderDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaOrderProducer {
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Value("${kafka.topics.order-placed}")
    private String orderPlacedTopic;

    @Value("${kafka.topics.payment-confirmed}")
    private String paymentConfirmedTopic;

    public void sendOrderPlacedEvent(OrderDto orderDto) {
        log.info("Sending order placed event for order: {}", orderDto.getId());
        kafkaTemplate.send(orderPlacedTopic, orderDto.getId().toString(), orderDto);
    }

    public void sendPaymentConfirmedEvent(OrderDto orderDto) {
        log.info("Sending payment confirmed event for order: {}", orderDto.getId());
        kafkaTemplate.send(paymentConfirmedTopic, orderDto.getId().toString(), orderDto);
    }
}
