// package: com.example.Courses.service

package com.example.Courses.service;

import com.example.Courses.domain.model.Answer;
import com.example.Courses.domain.model.Question;
import com.example.Courses.domain.request.AnswerDTO;

import java.util.List;

public interface AnswerService {
    List<Answer> handleCreateAnswerForQuestion(List<AnswerDTO> answerDTOs, Long idQuestion);
    // Fail : k nên trả về toàn bộ dap an, mà chỉ cần trả answer theo question
    List<Answer> findAllAnswersByQuestionId(Long questionId);

    void handleDeleteAnswer(Long id);

    Answer handleUpdateAnswer(AnswerDTO reqAnswerDTO);
}
