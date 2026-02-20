package com.example.demo.Controller;

import com.example.demo.DTO.UserDto;
import com.example.demo.DTO.UserLoginDTO;
import com.example.demo.DTO.UserRegisterDTO;
import com.example.demo.Entity.User;
import com.example.demo.Service.UserService;
import com.example.demo.Utility.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/Netflix/api")
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/Register")
    public String Regsiter( @RequestBody UserRegisterDTO dto)
    {
        boolean result =userService.Register(dto);
        if(result) {
            return "Success";
        }
        return "Failed";
        
    }
    @PostMapping("/login")
    public UserDto login(@RequestBody UserLoginDTO log) {

        boolean isValid = userService.login(log.getEmail(), log.getPassword());

        if (!isValid) {
            return new UserDto("");
        }

        String token = jwtUtils.generateToken(log.getEmail());
        return new UserDto(token);
    }
    @GetMapping("/validate")
    public boolean validate(@RequestHeader("Authorization") String header) {
        String token = header.substring(7); 
        return jwtUtils.validateToken(token);
    }

}
