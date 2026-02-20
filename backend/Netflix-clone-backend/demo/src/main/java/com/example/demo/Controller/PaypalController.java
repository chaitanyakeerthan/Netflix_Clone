package com.example.demo.Controller;

import com.example.demo.Service.PaypalService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/paypal")
@CrossOrigin("*")
public class PaypalController {

    private final PaypalService paypalService;

    public PaypalController(PaypalService paypalService) {
        this.paypalService = paypalService;
    }

    @GetMapping("/token")
    public String getToken() {
        return paypalService.getAccessToken();
    }
}
