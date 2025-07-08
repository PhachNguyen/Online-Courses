package com.example.Courses.domain.request;

import lombok.Data;

@Data
public class AnswerDTO {
    private String content;
    private boolean isCorrect;
}
