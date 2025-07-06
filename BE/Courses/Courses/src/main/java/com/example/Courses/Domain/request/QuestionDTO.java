package com.example.Courses.Domain.request;

import lombok.Data;
import java.util.List;

@Data
public class QuestionDTO {
    private String content;
    private String type;
    private String level;
    private List<AnswerDTO> answers;
}
