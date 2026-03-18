package com.pizza.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@SpringBootApplication
public class BackendApplication {
    public static void main(String[] args) {
        loadEnv();
        SpringApplication.run(BackendApplication.class, args);
    }

    private static void loadEnv() {
        try {
            List<String> lines = Files.readAllLines(Paths.get(".env"));
            for (String line : lines) {
                if (line.trim().isEmpty() || line.startsWith("#")) continue;
                String[] parts = line.split("=", 2);
                if (parts.length == 2) {
                    System.setProperty(parts[0].trim(), parts[1].trim());
                }
            }
        } catch (IOException e) {
            System.err.println(".env file not found or could not be read. Falling back to system environment variables.");
        }
    }
}
