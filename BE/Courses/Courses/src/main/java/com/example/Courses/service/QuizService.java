package com.example.Courses.service;

import com.example.Courses.domain.model.Quiz;
import com.example.Courses.domain.request.ReqCreateQuizDTO;

public interface QuizService {
//     CRUD :
//     Render ra Quiz theo từng user
//    todo

//    Update
//
    // public Quiz handleUpdateQuiz(Long id,ReqCreateQuizDTO dto);
//    Create :
    public Quiz handleCreateQuiz(ReqCreateQuizDTO dto);
}
