package com.example.demo.Controller;

import com.example.demo.DTO.UserDto;
import com.example.demo.Service.GoogleAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class GoogleAuthController {

    @Autowired
    private GoogleAuthService googleAuthService;

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody UserDto request) {
        String jwt = googleAuthService.verifyGoogleToken(request.getToken());
        return ResponseEntity.ok(Map.of("jwt", jwt));
    }
}
