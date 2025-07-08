package com.example.Courses.controller;

import com.example.Courses.domain.model.Quiz;
import com.example.Courses.domain.request.ReqCreateQuizDTO;
import com.example.Courses.service.implement.QuestionServiceImpl;
import com.example.Courses.service.implement.QuizServiceImpl;
import com.example.Courses.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/quizzes")
@RequiredArgsConstructor
public class QuizController {
    private final QuizServiceImpl quizService;
    private final UserService userService;
    private final QuestionServiceImpl questionService;

    @PostMapping
    public ResponseEntity<?> createQuiz(@RequestBody ReqCreateQuizDTO dto) {
        Quiz createdQuiz = quizService.handleCreateQuiz(dto);
        return ResponseEntity.ok("Tạo quiz thành công với ID: " + createdQuiz.getId());
    }
}
