package com.example.demo.Service;

import com.example.demo.DTO.UserDto;
import com.example.demo.DTO.UserRegisterDTO;
import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder();

    @Override
    public boolean Register(UserRegisterDTO dto) {
    if(dto.getPassword()==null || dto.getPassword().isEmpty())
    {
        throw new IllegalArgumentException("Password is not found");
    }

    User user=new User();

    user.setName(dto.getName());
    user.setEmail(dto.getEmail());
    user.setPassword(encoder.encode(dto.getPassword()));

    userRepository.save(user);
        return true;
    }

    @Override
    public boolean login(String email, String password) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        return existingUser != null && encoder.matches(password, existingUser.get().getPassword());
    }

}
