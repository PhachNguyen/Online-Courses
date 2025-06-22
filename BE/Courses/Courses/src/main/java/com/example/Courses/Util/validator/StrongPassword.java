package com.example.Courses.Util.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

// Annotation : Chú thích, cung cấp các thông tin bổ sung cho mã nguồn
// Custom Validate : Tự init một annotation validate
// Định nghĩa một Annotation Validate
@Constraint(validatedBy = StrongPasswordValidator.class)
// Phạm vi sử dụng
@Target({ElementType.METHOD,ElementType.FIELD})
// Khi nào chạy cái annotation này ?
@Retention(RetentionPolicy.RUNTIME)
// Sử dụng annotation @Documented để định nghĩa một annotation khác
@Documented
// Interface là một ban thiết kế,định nghĩa những gì một class phải làm, nhưng k nói cách làm
public @interface StrongPassword {
//     Tạo một custom validation thì bắt buộc phải theo chuẩn 3 dòng này
//     Tạo message trong trường hợp validation bị lỗi
    String message() default "Cần viết hoa chữ cái đầu ";
//     Cơ chế phân nhóm validation
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
