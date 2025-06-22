package com.example.Courses.Util.annotation;

// Sử dụng Spring AOP : Giusp tách biệt các logic dùng chung

import java.lang.annotation.*;

@Target(ElementType.METHOD)               // Dùng cho method
@Retention(RetentionPolicy.RUNTIME)      // Tồn tại khi chạy chương trình
//@Documented                               // Hiển thị trong JavaDoc
public @interface ApiMessage {
    String value(); // Giá trị truyền vào, ví dụ: "Create a new user"
}