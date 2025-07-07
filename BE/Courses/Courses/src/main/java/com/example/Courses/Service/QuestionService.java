package com.example.Courses.Service;


import com.example.Courses.Domain.model.Question;
import com.example.Courses.Domain.model.Quiz;
import com.example.Courses.Domain.request.QuestionDTO;
import com.example.Courses.Repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {
    private QuestionRepository questionRepository;
    private  AnswerService answerService;
    public QuestionService(QuestionRepository questionRepository, AnswerService answerService) {
        this.questionRepository = questionRepository;
        this.answerService = answerService;
    }

//     Fetch all question
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }
// Fetch by ID
    public Optional<Question> getQuestionById(Long id) {
        return questionRepository.findById(id);
    }
// Handle Create Question
    public List<Question> handleCreateQuestion(List<QuestionDTO> questionDTOs, Quiz quiz) {
     List<Question> questions = new ArrayList<>();
        for (QuestionDTO questionDTO : questionDTOs) {
            Question question = new Question();
            question.setContent(questionDTO.getContent());
            question.setType(questionDTO.getType());
            question.setLevel(questionDTO.getLevel());
            question.setQuiz(quiz);
            Question savedQuestion = questionRepository.save(question);
            if (savedQuestion != null) {
//                 Call AnswerSerivce để tạo đáp án cho mỗi Question
                answerService.handleCreateAnswer(questionDTO.getAnswers(), savedQuestion);
            }
            questions.add(question);
        }
        return questions;
    }
// Update Question
    public Question updateQuestion(Long id, Question updatedQuestion) {
        return questionRepository.findById(id).map(q -> {
            q.setContent(updatedQuestion.getContent());
            q.setType(updatedQuestion.getType());
            q.setLevel(updatedQuestion.getLevel());
            q.setQuiz(updatedQuestion.getQuiz());
            return questionRepository.save(q);
        }).orElse(null);
    }
// Delete
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }
}
