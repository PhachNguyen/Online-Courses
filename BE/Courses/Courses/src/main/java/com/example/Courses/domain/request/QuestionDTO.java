package com.example.Courses.domain.request;

import com.example.Courses.Util.constant.QuestionType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.List;

@Data
public class QuestionDTO {
    private Long id;
//    @NotBlank
    private String content;
//    @NotNull
    private QuestionType type;
//    @NotBlank
    private String level;
    private List<AnswerDTO> answers; // Tạo các answer cho 1 question
}
