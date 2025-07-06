package com.example.Courses.Util.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
// Generic : Cách viết tổng quát, linh hoạt với kiểu dữ liệu chưa được xác định, được cung cap sau khi chay ctrinh
// Generic type :

public class StrongPasswordValidator implements ConstraintValidator<StrongPassword, String> {

    @Override
//    Value : Input đầu vào, so sánh giá trị đầu vào

    public boolean isValid(String value, ConstraintValidatorContext context) {
        // check if string contains at least one digit, one lowercase letter, one
        // uppercase letter, one special character and 8 characters long
        return value.matches("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!*()]).{8,}$");
    }
}