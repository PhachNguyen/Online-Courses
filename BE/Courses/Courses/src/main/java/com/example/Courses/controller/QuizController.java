package com.example.Courses.controller;

import com.example.Courses.domain.model.Quiz;
import com.example.Courses.domain.request.ReqCreateQuizDTO;
import com.example.Courses.service.implement.QuestionServiceImpl;
import com.example.Courses.service.implement.QuizServiceImpl;
import com.example.Courses.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/quizzes")
@RequiredArgsConstructor
public class QuizController {
    private final QuizServiceImpl quizService;
    private final UserService userService;
    private final QuestionServiceImpl questionService;

    @PostMapping
    public ResponseEntity<?> createQuiz(@Valid @RequestBody ReqCreateQuizDTO dto) {
        try {
            Quiz createdQuiz = quizService.handleCreateQuiz(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdQuiz);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Long id) {
        Quiz quiz = quizService.getQuizById(id);
        return ResponseEntity.ok(quiz);
    }
    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        return ResponseEntity.ok(quizService.getAllQuiz());
    }
    //  Cập nhật quiz
    @PutMapping("/{id}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable Long id, @Valid @RequestBody ReqCreateQuizDTO dto) {
        Quiz updatedQuiz = quizService.handleUpdateQuiz(id, dto);
        return ResponseEntity.ok(updatedQuiz);
    }

    //  Xoá quiz -- Hiện đang bị lỗi foregin key
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteQuiz(@PathVariable Long id) {
        quizService.deleteQuiz(id);
        return ResponseEntity.ok("Quiz đã được xoá thành công!");
    }
}
