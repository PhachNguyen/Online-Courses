package com.example.Courses.Service;

import com.example.Courses.Domain.model.Answer;
import com.example.Courses.Domain.model.Question;
import com.example.Courses.Domain.request.AnswerDTO;
import com.example.Courses.Domain.request.QuestionDTO;
import com.example.Courses.Repository.AnswerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }
   // Handle Create Anwer
    public void handleCreateAnswer(List<AnswerDTO> answerDTOs, Question question) {
        for (AnswerDTO answerDTO : answerDTOs) {
            Answer answer = new Answer();
            answer.setQuestion(question); // Đáp án của của mỗi question
            answer.setContent(answerDTO.getContent());
            answer.setCorrect(answerDTO.isCorrect());
            answerRepository.save(answer);
        }

    }
    // Fetch all
    public List<Answer> findAllAnswers() {
        return this.answerRepository.findAll();
    }
}
