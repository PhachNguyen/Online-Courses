// package: com.example.Courses.service

package com.example.Courses.service;

import com.example.Courses.domain.model.Question;
import com.example.Courses.domain.model.Quiz;
import com.example.Courses.domain.request.QuestionDTO;

import java.util.List;
import java.util.Optional;

public interface QuestionService {
    List<Question> getAllQuestions();
    Optional<Question> getQuestionById(Long id);
    List<Question> handleCreateQuestion(List<QuestionDTO> questionDTOs, Quiz quiz);
    Question updateQuestion(Long id, Question updatedQuestion);
    void deleteQuestion(Long id);
}
