// package: com.example.Courses.service.implement

package com.example.Courses.service.implement;

import com.example.Courses.domain.model.Answer;
import com.example.Courses.domain.model.Question;
import com.example.Courses.domain.request.AnswerDTO;
import com.example.Courses.repository.AnswerRepository;
import com.example.Courses.repository.QuestionRepository;
import com.example.Courses.service.AnswerService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AnswerServiceImpl implements AnswerService {

    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;

    public AnswerServiceImpl(AnswerRepository answerRepository, QuestionRepository questionRepository) {
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
    }

        @Override
        public List<Answer> handleCreateAnswerForQuestion(List<AnswerDTO> answerDTOs, Long idQuestion) { // Truyền vào một List từ Req answer
    //         Dùng Optional thì sẽ không bao giờ có th null
            Optional<Question> optionalQuestion = this.questionRepository.findById(idQuestion);
            if (optionalQuestion.isPresent()) {
                Question questionQuiz = optionalQuestion.get(); // Lấy object Question
                // Tạo một list các answer
                List<Answer> answers = new ArrayList<>();
                for (AnswerDTO answerDTO : answerDTOs) {
                    Answer answer = new Answer();
                  answer.setQuestion(questionQuiz);
                    answer.setCorrect(answerDTO.isCorrect());
                    answer.setContent(answerDTO.getContent());
                    answers.add(answer); // Lưu vào list

                }
           return    answerRepository.saveAll(answers);

            }
            return  null;
        }

    @Override
    public List<Answer> findAllAnswersByQuestionId(Long questionId) {
        return answerRepository.findByQuestionId(questionId);
    }

    @Override
    public void handleDeleteAnswer(Long id) {
        if (!answerRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy đáp án với ID: " + id);
        }
        answerRepository.deleteById(id);
    }


    @Override
    public Answer handleUpdateAnswer(AnswerDTO reqAnswerDTO) {
        Long id = reqAnswerDTO.getId();
        Answer answer = answerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đáp án với ID: " + id));

        answer.setContent(reqAnswerDTO.getContent());
        answer.setCorrect(reqAnswerDTO.isCorrect());

        return answerRepository.save(answer);
    }

}
