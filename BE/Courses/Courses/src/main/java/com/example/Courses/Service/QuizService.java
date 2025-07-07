package com.example.Courses.Service;

import com.example.Courses.Domain.model.Question;
import com.example.Courses.Domain.model.Quiz;
import com.example.Courses.Domain.model.User;
import com.example.Courses.Domain.request.ReqCreateQuizDTO;
import com.example.Courses.Domain.response.ResQuizDTO;
import com.example.Courses.Repository.QuestionRepository;
import com.example.Courses.Repository.QuizReposiotry;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {
    private final QuizReposiotry quizReposiotry;
    private final QuestionService questionService;
    private final AnswerService answerService;
    private  final UserService userService;
    public QuizService(QuizReposiotry quizReposiotry, QuestionService questionService, AnswerService answerService, UserService userService) {
       this.quizReposiotry = quizReposiotry;
       this.questionService = questionService;
       this.answerService = answerService;
       this.userService = userService;
    }
//    HandleCreateQuiz
    public Quiz handleCreateQuiz(ReqCreateQuizDTO reqCreateQuizDTO) {
        User creator = userService.getUserById(reqCreateQuizDTO.getCreatedByIdCreator());
        Quiz quiz = new Quiz();
        quiz.setTitle(reqCreateQuizDTO.getTitle());
        quiz.setDescription(reqCreateQuizDTO.getDescription());
        quiz.setDuration(reqCreateQuizDTO.getDuration());
        quiz.setCreateBy(creator);
        quiz.setPublic(true); // Default sẽ là true
        // Lưu Quiz để có ID Quiz
        this.quizReposiotry.save(quiz);
        // Call QuestionServer để tạo câu hỏi và câu trả lời
       List<Question> questions = this.questionService.handleCreateQuestion(reqCreateQuizDTO.getQuestions(),quiz);
       quiz.setQuestions(questions);
       quiz.setTotalQuestions(questions.size()); // Đếm  số lượng question r tự thêm vào total
        return this.quizReposiotry.save(quiz); // Lưu lại với danh sách câu hỏi

    }
//     Covert sang DTO :
    public ResQuizDTO convertQuizToDTO(Quiz quiz) {
        ResQuizDTO resQuizDTO = new ResQuizDTO();
        resQuizDTO.setId(quiz.getId());
        resQuizDTO.setTitle(quiz.getTitle());
        resQuizDTO.setDescription(quiz.getDescription());
        return resQuizDTO;
    }
//     Fetch all Quiz
    public List<Quiz> getAllQuiz() {
        return this.quizReposiotry.findAll();
    }
//     Update
//    public Quiz updateQuiz(Long id, Quiz quiz) {
//        Quiz currentQuiz = this.quizReposiotry.findById(id).get();
//        if(currentQuiz != null) {
//            currentQuiz.getDescription()
//        }
//    }
}
