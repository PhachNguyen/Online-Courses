// package: com.example.Courses.service

package com.example.Courses.service;

import com.example.Courses.domain.model.Question;
import com.example.Courses.domain.model.Quiz;
import com.example.Courses.domain.request.QuestionDTO;

import java.util.List;
import java.util.Optional;

public interface QuestionService {
   //CRUD :
    // Fetch All
    List<Question> getAllQuestions();
    Optional<Question> getQuestionById(Long id);
 List<Question> getQuestionsByQuizId(Long quizId); //  Tìm kiếm Question theo ID Quiz
 Optional<Question> handleCreateQuestion(QuestionDTO dto, Long quizId); // sửa
 Optional<Question> handleUpdateQuestion(Long questionId, QuestionDTO dto); // sửa

 void handleDeleteQuestion(Long id);
    //
}
