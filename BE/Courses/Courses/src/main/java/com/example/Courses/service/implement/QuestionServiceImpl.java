// package: com.example.Courses.service.implement

package com.example.Courses.service.implement;

import com.example.Courses.domain.model.Question;
import com.example.Courses.domain.model.Quiz;
import com.example.Courses.domain.request.QuestionDTO;
import com.example.Courses.repository.QuestionRepository;
import com.example.Courses.repository.QuizReposiotry;
import com.example.Courses.service.AnswerService;
import com.example.Courses.service.QuestionService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService {
    private final QuizReposiotry quizReposiotry;
    private final QuestionRepository questionRepository;
    private final AnswerService answerService;

    public QuestionServiceImpl(QuestionRepository questionRepository, AnswerService answerService, QuizReposiotry quizReposiotry) {
        this.questionRepository = questionRepository;
        this.answerService = answerService;
        this.quizReposiotry = quizReposiotry;
    }

    @Override
    public List<Question> getAllQuestions() {
        return this.questionRepository.findAll();
    }

    @Override
    public Optional<Question> getQuestionById(Long id) {
        return this.questionRepository.findById(id);
    }

    @Override
    public List<Question> getQuestionsByQuizId(Long quizId) {
        return questionRepository.findByQuizId(quizId);
    }

    @Override
    public Optional<Question> handleCreateQuestion(QuestionDTO dto, Long quizId) {
        Optional<Quiz> currentQuiz = quizReposiotry.findById(quizId);
        if (currentQuiz.isPresent()) {
            Question question = new Question();
            question.setType(dto.getType());
            question.setContent(dto.getContent());
            question.setLevel(dto.getLevel());
            question.setQuiz(currentQuiz.get());

            // Nếu có danh sách câu trả lời
//            if (dto.getAnswers() != null && !dto.getAnswers().isEmpty()) {
//                var answers = answerService.createAnswersFromDTOs(dto.getAnswers(), question);
//                question.setAnswers(answers);
//            }

            return Optional.of(questionRepository.save(question));
        }
        return Optional.empty();
    }

    @Override
    public Optional<Question> handleUpdateQuestion(Long questionId, QuestionDTO dto) {
        Optional<Question> existingQuestion = questionRepository.findById(questionId);
        if (existingQuestion.isPresent()) {
            Question question = existingQuestion.get();
            question.setType(dto.getType());
            question.setContent(dto.getContent());
            question.setLevel(dto.getLevel());

            // Cập nhật lại danh sách câu trả lời
//            if (dto.getAnswers() != null) {
//                var updatedAnswers = answerService.createAnswersFromDTOs(dto.getAnswers(), question);
//                question.setAnswers(updatedAnswers);
//            }

            return Optional.of(questionRepository.save(question));
        }
        return Optional.empty();
    }

    @Override
    public void handleDeleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }
}

