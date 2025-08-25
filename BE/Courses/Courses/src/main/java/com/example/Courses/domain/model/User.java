package com.example.Courses.domain.model;

import com.example.Courses.Util.SecurityUtil;
import com.example.Courses.Util.constant.LoginType;
import com.example.Courses.Util.constant.RoleUser;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.Instant;
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
    private String dob;
    private String phone;
    private String address;

    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
    private LoginType loginType;
    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
    private RoleUser roleUser;

    public Instant createAt;
    public Instant updateAt;

    public String createdBy;
    public String updatedBy;

//    1 User - N Course
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<Course> courses;

//     Foreign key:
//     1 user - N quiz
//     Fixes sau, xóa quizzes đi
    @OneToMany
    private List<Quiz> quizzes;

//     Khi sign up thì user sẽ k có create By
    @PrePersist
    public void prePersist() {
        this.createAt = Instant.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updateAt = Instant.now();
        this.updatedBy = SecurityUtil.getCurrentUserLogin().isPresent()== true
                ? SecurityUtil.getCurrentUserLogin().get()
                : "Không tìm thấy người update";
    }
}