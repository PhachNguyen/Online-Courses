package com.example.Courses.Domain.model;

import com.example.Courses.Util.constant.LoginType;
import com.example.Courses.Util.constant.RoleUser;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;

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

    @Enumerated(EnumType.STRING)
//    @Enumerated(EnumType.ORDINAL) : Lưu STT enum
    @Column(nullable = false)
    private LoginType loginType;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoleUser roleUser;

//    createdAt, updatedAt : Todo
//     Foreign key:
//     1 user - N quiz
    @OneToMany
    private List<Quiz> quizzes;
}