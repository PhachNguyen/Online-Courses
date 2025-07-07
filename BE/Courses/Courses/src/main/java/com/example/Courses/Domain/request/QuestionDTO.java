package com.example.Courses.Domain.request;

import com.example.Courses.Util.constant.QuestionType;
import lombok.Data;
import java.util.List;

@Data
public class QuestionDTO {
    private String content;
    private QuestionType type;
    private String level;
    private List<AnswerDTO> answers;
}
