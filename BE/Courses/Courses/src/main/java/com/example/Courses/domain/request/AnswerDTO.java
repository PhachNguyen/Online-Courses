package com.example.Courses.domain.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnswerDTO {
    private Long id;
    private String content;
    private boolean isCorrect;
}
