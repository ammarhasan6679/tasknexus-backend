package com.ammar.tasknexus.controller;

import com.ammar.tasknexus.dto.LoginRequest;
import com.ammar.tasknexus.dto.LoginResponse;
import com.ammar.tasknexus.dto.SignupRequest;
import com.ammar.tasknexus.entity.User;
import com.ammar.tasknexus.repository.UserRepository;
import com.ammar.tasknexus.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @PostMapping("/signup")
    public User signup(
            @RequestBody SignupRequest request) {

        User user = new User();

        user.setName(request.getName());

        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()));

        user.setRole(request.getRole());

        return userRepository.save(user);
    }

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        boolean passwordMatches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword());

        if (!passwordMatches) {

            throw new RuntimeException(
                    "Invalid password");
        }

        String token =
                jwtService.generateToken(
                        user.getEmail());

        return new LoginResponse(
                token,
                user.getRole());
    }

}