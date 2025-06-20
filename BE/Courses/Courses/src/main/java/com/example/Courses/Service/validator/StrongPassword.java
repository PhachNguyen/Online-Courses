package com.example.Courses.Service.validator;

import jakarta.validation.Constraint;

import java.lang.annotation.ElementType;
import java.lang.annotation.Target;

// Annotation : Chú thích, cung cấp các thông tin bổ sung cho mã nguồn
// Custom Validate : Tự init một annotation validate
// Định nghĩa một Annotation Validate
@Constraint(validatedBy = StrongPasswordValidator.class)
// Phạm vi sử dụng
@Target({ElementType.METHOD,ElementType.FIELD})
public @interface StrongPassword {
}
