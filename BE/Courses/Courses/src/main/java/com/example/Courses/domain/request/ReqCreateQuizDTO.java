package com.example.Courses.domain.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;
// Yêu cầu từ client lên server
@Data
public class ReqCreateQuizDTO {
    @NotBlank(message = "Không được để title trông ")
    private String title;

    private String description;
    @Min(value = 1, message = "Thời gian làm bài phải lớn hơn 0 phút")
    private int duration;
    private Long createdByIdCreator ; // userId
    private boolean isPublic;
    private  String subject;
    private String majorName;
    private List<QuestionDTO> questions;
}

