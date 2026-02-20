package com.example.demo.Service;

import com.example.demo.Security.PaypalConfig;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Base64;

@Service
public class PaypalService {

    private final PaypalConfig config;
    private final WebClient webClient;

    public PaypalService(PaypalConfig config) {
        this.config = config;
        this.webClient = WebClient.create();
    }


    public String getAccessToken() {

        String auth = config.getClientId() + ":" + config.getClientSecret();
        String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes());

        String response = webClient.post()
                .uri(config.getBaseUrl() + "/v1/oauth2/token")
                .header("Authorization", "Basic " + encodedAuth)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .bodyValue("grant_type=client_credentials")
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return response;
    }
}

