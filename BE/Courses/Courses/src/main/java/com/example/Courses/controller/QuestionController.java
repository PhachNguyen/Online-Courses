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

    // GET: /api/questions/{id} : FIXES RENDER RA CẢ ANSWER
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

    // POST: /api/questions/quiz/{quizId} = DONE
    @PostMapping("/quiz/{quizId}")
    public ResponseEntity<QuestionDTO> createQuestion(
            @PathVariable Long quizId, // Lấy id Quiz
            @RequestBody @Valid QuestionDTO dto // Các trường nhập từ FE
    ) {
        Optional<Question> createdQuestion = questionService.handleCreateQuestion(dto, quizId);
        if (createdQuestion.isPresent()) {
            QuestionDTO resQuestionDTO = this.questionService.convertQuestionToQuestionDTO(createdQuestion.get());
            // Succes
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(resQuestionDTO);
        }
        // Fail
        return ResponseEntity.badRequest().build(); // Trả về HTTP 400 nếu tạo thất bại
    }

// Fixes lại PUT update: mới chỉ update được mỗi question, còn answer chưa đc update
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

    // DELETE: /api/questions/{id} = DONE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.handleDeleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
}
