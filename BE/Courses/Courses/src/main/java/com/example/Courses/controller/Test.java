package com.example.Courses.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Test {
    @GetMapping("/Test")
    public String home() {
        return "home";
    }
}
