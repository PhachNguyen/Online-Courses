package com.example.Courses.Domain.request;

import lombok.Data;

@Data
public class AnswerDTO {
    private String content;
    private boolean isCorrect;
}
