// package: com.example.Courses.service.implement

package com.example.Courses.service.implement;

import com.example.Courses.domain.model.Question;
import com.example.Courses.domain.model.Quiz;
import com.example.Courses.domain.request.QuestionDTO;
import com.example.Courses.repository.QuestionRepository;
import com.example.Courses.service.AnswerService;
import com.example.Courses.service.QuestionService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;
    private final AnswerService answerService;

    public QuestionServiceImpl(QuestionRepository questionRepository, AnswerService answerService) {
        this.questionRepository = questionRepository;
        this.answerService = answerService;
    }

    @Override
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    @Override
    public Optional<Question> getQuestionById(Long id) {
        return questionRepository.findById(id);
    }

    @Override
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
                answerService.handleCreateAnswer(questionDTO.getAnswers(), savedQuestion);
            }
            questions.add(savedQuestion);
        }
        return questions;
    }

    @Override
    public Question updateQuestion(Long id, Question updatedQuestion) {
        return questionRepository.findById(id).map(q -> {
            q.setContent(updatedQuestion.getContent());
            q.setType(updatedQuestion.getType());
            q.setLevel(updatedQuestion.getLevel());
            q.setQuiz(updatedQuestion.getQuiz());
            return questionRepository.save(q);
        }).orElse(null);
    }

    @Override
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }
}
