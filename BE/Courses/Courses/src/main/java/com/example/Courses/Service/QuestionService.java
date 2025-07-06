package com.example.Courses.Service;


import com.example.Courses.Domain.model.Question;
import com.example.Courses.Repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {
    private QuestionRepository questionRepository;
    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Optional<Question> getQuestionById(Long id) {
        return questionRepository.findById(id);
    }

    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    public Question updateQuestion(Long id, Question updatedQuestion) {
        return questionRepository.findById(id).map(q -> {
            q.setContent(updatedQuestion.getContent());
            q.setType(updatedQuestion.getType());
            q.setLevel(updatedQuestion.getLevel());
            q.setQuiz(updatedQuestion.getQuiz());
            return questionRepository.save(q);
        }).orElse(null);
    }

    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }
}
