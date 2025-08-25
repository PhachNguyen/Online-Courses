package com.example.Courses.domain.response.Quiz;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ResQuizDTO {
    private Long id;
    private String title;
    private String description;
    private boolean isPublic;
    private  String subject;
    private int duration;
    private String createBy;
    private Instant createAt;
    private String logo;
    private String university;
    private int totalQuestions;
}
