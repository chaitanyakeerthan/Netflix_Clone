package com.example.demo.Service;


import com.example.demo.DTO.UserRegisterDTO;

public interface UserService {



    boolean Register(UserRegisterDTO dto);

      boolean login(String email, String password);
}
