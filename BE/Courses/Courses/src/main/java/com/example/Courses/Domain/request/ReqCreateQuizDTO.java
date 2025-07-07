package com.example.Courses.Domain.request;

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
    @NotNull(message = "Thời gian làm bài là bắt buộc")
    private int duration;
    private Long createdByIdCreator ; // userId

    private List<QuestionDTO> questions;
}

