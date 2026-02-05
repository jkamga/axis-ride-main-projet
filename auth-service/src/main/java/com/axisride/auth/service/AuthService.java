package com.axisride.auth.service;

import com.axisride.auth.dto.AuthResponse;
import com.axisride.auth.dto.LoginRequest;
import com.axisride.auth.dto.RegisterRequest;
import com.axisride.auth.entity.Role;
import com.axisride.auth.entity.User;
import com.axisride.auth.repository.RoleRepository;
import com.axisride.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final KafkaTemplate<String, Object> kafkaTemplate;
    
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Check if user exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        
        if (request.getPhoneNumber() != null && userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new RuntimeException("Phone number already in use");
        }
        
        // Create user
        User user = User.builder()
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .emailVerified(false)
                .phoneVerified(false)
                .isActive(true)
                .twoFactorEnabled(false)
                .build();
        
        // Assign role
        Set<Role> roles = new HashSet<>();
        String roleName = request.getRole() != null && request.getRole().equalsIgnoreCase("DRIVER") 
                ? "ROLE_DRIVER" : "ROLE_USER";
        
        Role userRole = roleRepository.findByName(Role.RoleName.valueOf(roleName))
                .orElseThrow(() -> new RuntimeException("Role not found"));
        roles.add(userRole);
        user.setRoles(roles);
        
        // Save user
        User savedUser = userRepository.save(user);
        
        // Publish user created event to Kafka
        publishUserCreatedEvent(savedUser);
        
        // Generate tokens
        String accessToken = jwtService.generateAccessToken(savedUser);
        String refreshToken = jwtService.generateRefreshToken(savedUser);
        
        return buildAuthResponse(savedUser, accessToken, refreshToken);
    }
    
    public AuthResponse login(LoginRequest request) {
        // Find user by email or phone
        User user = userRepository.findByEmail(request.getEmailOrPhone())
                .or(() -> userRepository.findByPhoneNumber(request.getEmailOrPhone()))
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        
        // Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        // Check if account is active
        if (!user.getIsActive()) {
            throw new RuntimeException("Account is inactive");
        }
        
        // Update last login
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
        
        // Generate tokens
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        
        return buildAuthResponse(user, accessToken, refreshToken);
    }
    
    public AuthResponse refreshToken(String refreshToken) {
        if (!jwtService.validateToken(refreshToken)) {
            throw new RuntimeException("Invalid refresh token");
        }
        
        String email = jwtService.extractEmail(refreshToken);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        String newAccessToken = jwtService.generateAccessToken(user);
        String newRefreshToken = jwtService.generateRefreshToken(user);
        
        return buildAuthResponse(user, newAccessToken, newRefreshToken);
    }
    
    private AuthResponse buildAuthResponse(User user, String accessToken, String refreshToken) {
        Set<String> roleNames = user.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toSet());
        
        AuthResponse.UserInfo userInfo = AuthResponse.UserInfo.builder()
                .id(user.getId())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .roles(roleNames)
                .emailVerified(user.getEmailVerified())
                .phoneVerified(user.getPhoneVerified())
                .build();
        
        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(3600L) // 1 hour
                .user(userInfo)
                .build();
    }
    
    private void publishUserCreatedEvent(User user) {
        try {
            kafkaTemplate.send("user.created", user.getId(), user);
            log.info("Published user.created event for user: {}", user.getId());
        } catch (Exception e) {
            log.error("Failed to publish user.created event", e);
        }
    }
}
