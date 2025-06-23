package com.example.Courses.Controller;

import com.example.Courses.Domain.request.ReqRegisterDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    // Register
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody ReqRegisterDTO dto) {
        // nếu password != confirmPassword thì tự động trả về lỗi 400 với message
        // "Mật khẩu và xác nhận mật khẩu không khớp"
        return ResponseEntity.ok("Đăng ký thành công!");
    }
}
