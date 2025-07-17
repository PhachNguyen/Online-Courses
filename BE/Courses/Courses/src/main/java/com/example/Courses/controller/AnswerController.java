package com.example.Courses.controller;

import com.example.Courses.domain.model.Answer;
import com.example.Courses.domain.request.AnswerDTO;
import com.example.Courses.service.AnswerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/answer")
public class AnswerController {

    private final AnswerService answerService;

    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    //  1. Tạo danh sách đáp án cho câu hỏi
    @PostMapping("/question/{questionId}")
    public ResponseEntity<List<AnswerDTO>> createAnswersForQuestion(
            @PathVariable Long questionId,
            @RequestBody List<AnswerDTO> answerDTOs) {

        List<Answer> savedAnswers = answerService.handleCreateAnswerForQuestion(answerDTOs, questionId);

        List<AnswerDTO> response = savedAnswers.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    //  2. Lấy danh sách đáp án theo questionId
    @GetMapping("/question/{questionId}")
    public ResponseEntity<List<AnswerDTO>> getAnswersByQuestionId(
            @PathVariable Long questionId) {
        List<AnswerDTO> answers = answerService.findAllAnswersByQuestionId(questionId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(answers);
    }

    //  3. Cập nhật 1 đáp án
    @PutMapping
    public ResponseEntity<AnswerDTO> updateAnswer(@RequestBody AnswerDTO dto) {
        Answer updated = answerService.handleUpdateAnswer(dto);
        return ResponseEntity.ok(mapToDTO(updated));
    }

    //  4. Xóa đáp án
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnswer(@PathVariable Long id) {
        answerService.handleDeleteAnswer(id);
        return ResponseEntity.noContent().build();
    }

    //  Mapping từ Entity sang DTO
    private AnswerDTO mapToDTO(Answer answer) {
        return new AnswerDTO(answer.getId(), answer.getContent(), answer.isCorrect());
    }
}
