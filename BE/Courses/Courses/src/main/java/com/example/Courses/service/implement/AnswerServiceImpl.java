// package: com.example.Courses.service.implement

package com.example.Courses.service.implement;

import com.example.Courses.domain.model.Answer;
import com.example.Courses.domain.model.Question;
import com.example.Courses.domain.request.AnswerDTO;
import com.example.Courses.repository.AnswerRepository;
import com.example.Courses.service.AnswerService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerServiceImpl implements AnswerService {

    private final AnswerRepository answerRepository;

    public AnswerServiceImpl(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    @Override
    public void handleCreateAnswer(List<AnswerDTO> answerDTOs, Question question) {
        for (AnswerDTO answerDTO : answerDTOs) {
            Answer answer = new Answer();
            answer.setQuestion(question);
            answer.setContent(answerDTO.getContent());
            answer.setCorrect(answerDTO.isCorrect());
            answerRepository.save(answer);
        }
    }

    @Override
    public List<Answer> findAllAnswers() {
        return this.answerRepository.findAll();
    }

    @Override
    public void handleDeleteAnswer(Long id) {
        Answer answer = this.answerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Answer"));
        this.answerRepository.delete(answer);
    }

    @Override
    public Answer handleUpdateAnswer(Answer reqAnswerDTO) {
        Answer answer = this.answerRepository.findById(reqAnswerDTO.getId()).orElse(null);
        if (answer != null) {
            answer.setContent(reqAnswerDTO.getContent());
            answer.setCorrect(reqAnswerDTO.isCorrect());
        }
        return answerRepository.save(answer);
    }
}
