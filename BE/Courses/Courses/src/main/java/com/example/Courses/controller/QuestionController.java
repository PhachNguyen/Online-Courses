// package: com.example.Courses.controller

package com.example.Courses.controller;

import com.example.Courses.domain.model.Question;
import com.example.Courses.domain.request.QuestionDTO;
import com.example.Courses.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    // GET: /api/v1/questions/all
    @GetMapping("/all")
    public ResponseEntity<List<Question>> getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    // GET: /api/questions/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
        return questionService.getQuestionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET: /api/questions/quiz/{quizId}
    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<List<Question>> getQuestionsByQuizId(@PathVariable Long quizId) {
        return ResponseEntity.ok(questionService.getQuestionsByQuizId(quizId));
    }

    // POST: /api/questions/quiz/{quizId}
    @PostMapping("/quiz/{quizId}")
    public ResponseEntity<Question> createQuestion(
            @PathVariable Long quizId,
            @RequestBody @Valid QuestionDTO dto
    ) {
        Optional<Question> createdQuestion = questionService.handleCreateQuestion(dto, quizId);
        if (createdQuestion.isPresent()) {
            Question question = createdQuestion.get();
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(question);
        }
        return ResponseEntity.badRequest().build(); // Trả về HTTP 400 nếu tạo thất bại
    }


    // PUT: /api/questions/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(
            @PathVariable Long id,
            @RequestBody QuestionDTO dto
    ) {
        return questionService.handleUpdateQuestion(id, dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE: /api/questions/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.handleDeleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
}
