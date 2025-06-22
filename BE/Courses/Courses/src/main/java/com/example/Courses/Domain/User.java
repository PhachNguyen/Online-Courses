package com.example.Courses.Domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
// Entity : Thiết kế đầy đủ,chứa cả logic nội bộ,đầy đủ
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
// Validate các trường thông tin
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;
@NotBlank(message = "Email không được để trống ")
    @Column(nullable = false)
    private String email;
    @NotBlank(message = "Password không được để trống ")
    @Column(nullable = false)
    private String password;

    private String role; // ví dụ: ADMIN, USER
}