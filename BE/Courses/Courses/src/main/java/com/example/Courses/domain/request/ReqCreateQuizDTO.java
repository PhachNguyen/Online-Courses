package com.example.Courses.domain.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.List;
// Yêu cầu từ client lên server
@Data
public class ReqCreateQuizDTO {
    @NotBlank(message = "Không được để title trống ")
    @Size(max = 255, message = "Tiêu đề tối đa 255 ký tự")
    private String title;

    private String description;
//    @Min(value = 1, message = "Thời gian làm bài phải lớn hơn 0 phút")
    private int duration;
    private Long createdByIdCreator ; // userId
    private String university;
    private boolean isPublic;
    private  String subject;
    private String majorName;
    private String logo;
//    @NotEmpty(message = "Quiz phải có ít nhất 1 câu hỏi")
    private List<QuestionDTO> questions; // Một list các question cho quizz
}

