// package: com.example.Courses.service

package com.example.Courses.service;

import com.example.Courses.domain.model.Answer;
import com.example.Courses.domain.model.Question;
import com.example.Courses.domain.request.AnswerDTO;

import java.util.List;

public interface AnswerService {
    void handleCreateAnswer(List<AnswerDTO> answerDTOs, Question question);

    List<Answer> findAllAnswers();

    void handleDeleteAnswer(Long id);

    Answer handleUpdateAnswer(Answer reqAnswerDTO);
}
