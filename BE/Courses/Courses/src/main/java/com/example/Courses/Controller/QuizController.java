package com.example.Courses.Controller;

import com.example.Courses.Domain.model.Answer;
import com.example.Courses.Domain.model.Question;
import com.example.Courses.Domain.model.Quiz;
import com.example.Courses.Domain.model.User;
import com.example.Courses.Domain.request.AnswerDTO;
import com.example.Courses.Domain.request.QuestionDTO;
import com.example.Courses.Domain.request.ReqCreateQuizDTO;
import com.example.Courses.Repository.*;
import com.example.Courses.Service.QuestionService;
import com.example.Courses.Service.QuizService;
import com.example.Courses.Service.UserService;
import com.example.Courses.Util.constant.QuestionType;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/quizzes")
@RequiredArgsConstructor
public class QuizController {
    private final QuizService quizService;
    private final UserService userService;
    private final QuestionService questionService;

    @PostMapping
    public ResponseEntity<?> createQuiz(@RequestBody ReqCreateQuizDTO dto) {
        Quiz createdQuiz = quizService.handleCreateQuiz(dto);
        return ResponseEntity.ok("Tạo quiz thành công với ID: " + createdQuiz.getId());
    }
}
