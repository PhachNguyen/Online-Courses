package com.example.Courses.Domain.response;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
}
