package com.example.Courses.service;

import com.example.Courses.domain.model.Quiz;
import com.example.Courses.domain.request.ReqCreateQuizDTO;
import com.example.Courses.domain.response.ResultPaginationDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;


public interface QuizService {
//     CRUD :
//    Fetch All
   List<Quiz> getAllQuiz();
//     Render ra Quiz theo từng user
//    Update
    Quiz handleUpdateQuiz(Long id, ReqCreateQuizDTO dto);
    // Fetch theo id
     Quiz getQuizById(Long id);
//    Create :
    Quiz handleCreateQuiz(ReqCreateQuizDTO dto);
    // Delete
    void deleteQuiz(Long id);

//     Fetch phan trang cho Quiz
    ResultPaginationDTO getAllQuizPage(Pageable pageable, Specification<Quiz> specification);
//    Specification<T> : Spring data JPA call các cau truy vấn động dựa trên tiêu chí, filter
}
