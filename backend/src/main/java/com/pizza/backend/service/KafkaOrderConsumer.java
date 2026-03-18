package com.pizza.backend.service;

import com.pizza.backend.dto.response.OrderDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class KafkaOrderConsumer {

    @KafkaListener(topics = "${kafka.topics.order-placed}", groupId = "inventory-group")
    public void handleInventory(OrderDto order) {
        log.info("Inventory group received order: {}. Deducting stock...", order.getId());
        // Logic to update inventory
    }

    @KafkaListener(topics = "${kafka.topics.payment-confirmed}", groupId = "notification-group")
    public void handleNotifications(OrderDto order) {
        log.info("Notification group received confirmed order: {}. Sending SMS to user...", order.getId());
        // Logic to send notification
    }

    @KafkaListener(topics = "${kafka.topics.payment-confirmed}", groupId = "analytics-group")
    public void handleAnalytics(OrderDto order) {
        log.info("Analytics group received order: {}. Updating sales dashboard...", order.getId());
        // Logic to update analytics
    }
}
