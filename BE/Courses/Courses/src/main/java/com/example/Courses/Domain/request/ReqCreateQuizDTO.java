package com.example.Courses.Domain.request;

import lombok.Data;

import java.util.List;

@Data
public class ReqCreateQuizDTO {
    private String title;
    private String description;
    private int duration;
    private Long createdBy; // userId

    private List<QuestionDTO> questions;
}

