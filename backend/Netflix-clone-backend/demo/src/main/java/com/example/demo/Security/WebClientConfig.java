package com.example.demo.Security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient webClient(
            @Value("${tmdb.api.base-url}") String baseUrl) {

        System.out.println("TMDB BASE URL = " + baseUrl);

        return WebClient.builder()
                .baseUrl(baseUrl)
                .build();
    }
}

