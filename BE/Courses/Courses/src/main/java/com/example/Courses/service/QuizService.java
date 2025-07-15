package com.example.Courses.service;

import com.example.Courses.domain.model.Quiz;
import com.example.Courses.domain.request.ReqCreateQuizDTO;

import java.util.List;


public interface QuizService {
//     CRUD :
//    Fetch All
   List<Quiz> getAllQuiz();
//     Render ra Quiz theo từng user

//
//    Update
    Quiz handleUpdateQuiz(Long id, ReqCreateQuizDTO dto);
    // Fetch theo id
     Quiz getQuizById(Long id);
//    Create :
    Quiz handleCreateQuiz(ReqCreateQuizDTO dto);
    // Delete
    void deleteQuiz(Long id);
}
