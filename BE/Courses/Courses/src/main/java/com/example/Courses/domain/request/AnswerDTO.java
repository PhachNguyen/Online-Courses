package com.example.Courses.domain.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnswerDTO {
    private Long id;
    private String content;
    @JsonProperty("isCorrect")
    private boolean isCorrect;
//private  boolean correctAnswer;
//
//    public boolean isCorrectAnswer() {
//        return correctAnswer;
//    }
//
//    public boolean isCorrect() {
//        return isCorrect;
//    }
}
