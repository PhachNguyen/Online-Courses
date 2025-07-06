package com.example.Courses.Controller;

import com.example.Courses.Domain.model.Answer;
import com.example.Courses.Domain.model.Question;
import com.example.Courses.Domain.model.Quiz;
import com.example.Courses.Domain.model.User;
import com.example.Courses.Domain.request.AnswerDTO;
import com.example.Courses.Domain.request.QuestionDTO;
import com.example.Courses.Domain.request.ReqCreateQuizDTO;
import com.example.Courses.Repository.*;
import com.example.Courses.Util.constant.QuestionType;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin("*")
@RequiredArgsConstructor
public class QuizController {

    private final QuizReposiotry quizReposiotry;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<?> createQuiz(@RequestBody ReqCreateQuizDTO dto) {
        // 1. Tìm người tạo quiz
        User user = userRepository.findById(dto.getCreatedBy())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Tạo quiz không dùng builder
        Quiz quiz = new Quiz();
        quiz.setTitle(dto.getTitle());
        quiz.setDescription(dto.getDescription());
        quiz.setDuration(dto.getDuration());
//        quiz.setCreatedBy(user);
        quiz.setPublic(true);

        quiz = quizReposiotry.save(quiz);

        // 3. Thêm câu hỏi và đáp án
        for (QuestionDTO qDto : dto.getQuestions()) {
            Question question = new Question();
            question.setQuiz(quiz);
            question.setContent(qDto.getContent());
            question.setType(QuestionType.valueOf(qDto.getType()));
            question.setLevel(qDto.getLevel());

            question = questionRepository.save(question);

            for (AnswerDTO aDto : qDto.getAnswers()) {
                Answer answer = new Answer();
                answer.setQuestion(question);
                answer.setContent(aDto.getContent());
                answer.setCorrect(aDto.isCorrect());

                answerRepository.save(answer);
            }
        }

        return ResponseEntity.ok("Quiz created successfully");
    }
}
