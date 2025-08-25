// package: com.example.Courses.service.implement

package com.example.Courses.service.implement;

import com.example.Courses.domain.model.Answer;
import com.example.Courses.domain.model.Question;
import com.example.Courses.domain.model.Quiz;
import com.example.Courses.domain.request.AnswerDTO;
import com.example.Courses.domain.request.QuestionDTO;
import com.example.Courses.repository.AnswerRepository;
import com.example.Courses.repository.QuestionRepository;
import com.example.Courses.repository.QuizReposiotry;
import com.example.Courses.service.AnswerService;
import com.example.Courses.service.QuestionService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {
    private final QuizReposiotry quizReposiotry;
    private final QuestionRepository questionRepository;
    private final AnswerService answerService;
    private final AnswerRepository answerRepository;
    public QuestionServiceImpl(QuestionRepository questionRepository, AnswerService answerService, QuizReposiotry quizReposiotry,AnswerRepository answerRepository) {
        this.questionRepository = questionRepository;
        this.answerService = answerService;
        this.quizReposiotry = quizReposiotry;
        this.answerRepository = answerRepository;
    }

    @Override
    public Question findById(Long id) {
        return this.questionRepository.findById(id).orElse(null);
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

            // Convert AnswerDTO sang Answer entity
            List<Answer> answersList = new ArrayList<>();
            for (AnswerDTO answerDTO : dto.getAnswers()) {
                Answer answer = new Answer();
                answer.setContent(answerDTO.getContent());
                answer.setCorrect(answerDTO.isCorrect());
                answer.setQuestion(question);
                answersList.add(answer);
            }

            question.setAnswers(answersList);

            // Lưu
            Question savedQuestion = questionRepository.save(question);
            return Optional.of(savedQuestion);
        }
        return Optional.empty();
    }


    @Override
    public Optional<Question> handleUpdateQuestion(Long questionId, QuestionDTO dto) { // DTO là question đang đc req
        Optional<Question> existingQuestion = questionRepository.findById(questionId); // Check question exist
        if (existingQuestion.isPresent()) {
            Question question = existingQuestion.get();

            question.setType(dto.getType());
            question.setContent(dto.getContent());
            question.setLevel(dto.getLevel());
            Map<Long, Answer> currentMap = question.getAnswers().stream()
                    // Convert sang Map
                    .collect(Collectors.toMap(Answer::getId,
                            Function.identity()));  // Nhận 1 object và giữ chính object đó

            for (AnswerDTO answerDTO : dto.getAnswers()) {
                if (answerDTO.getId() != null) {
                    //
                    Answer ans = currentMap.get(answerDTO.getId()); // Tìm Key là id và lấy object Answer
                    if (ans != null) {
                        ans.setContent(answerDTO.getContent());
                        ans.setCorrect(answerDTO.isCorrect());
                    }
                }
            }
            return Optional.of(questionRepository.save(question));
        }
        return Optional.empty();
    }

    public Answer findAnswer( Long answerId) {
        return this.answerRepository.findById(answerId).orElse(null);
    }
    @Override
    public void handleDeleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    // Convert DTO
    @Override
    public QuestionDTO convertQuestionToQuestionDTO(Question question) {
        QuestionDTO dto = new QuestionDTO();
        dto.setId(question.getId());
        dto.setContent(question.getContent());
        dto.setType(question.getType());
        dto.setLevel(question.getLevel());

        List<AnswerDTO> answerDTOs = new ArrayList<>();
        for (Answer answer : question.getAnswers()) {
            AnswerDTO ansDTO = new AnswerDTO();
            ansDTO.setId(answer.getId());
            ansDTO.setContent(answer.getContent());
            ansDTO.setCorrect(answer.isCorrect());
            answerDTOs.add(ansDTO);
        }

        dto.setAnswers(answerDTOs);
        return dto;
    }
}

