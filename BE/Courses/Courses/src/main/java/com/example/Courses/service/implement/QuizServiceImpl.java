package com.example.Courses.service.implement;

import com.example.Courses.domain.response.ResultPaginationDTO;
import com.example.Courses.service.QuizService;
import com.example.Courses.service.UserService;
import com.example.Courses.domain.model.Question;
import com.example.Courses.domain.model.Quiz;
import com.example.Courses.domain.model.User;
import com.example.Courses.domain.request.ReqCreateQuizDTO;
import com.example.Courses.domain.response.ResQuizDTO;
import com.example.Courses.repository.QuizReposiotry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class QuizServiceImpl implements QuizService {
    private final QuizReposiotry quizReposiotry;

    public QuizServiceImpl(QuizReposiotry quizReposiotry) {
       this.quizReposiotry = quizReposiotry;

    }
//    HandleCreateQuiz
//    public Quiz handleCreateQuiz(ReqCreateQuizDTO reqCreateQuizDTO) {
//        User creator = userService.getUserById(reqCreateQuizDTO.getCreatedByIdCreator());
//        Quiz quiz = new Quiz();
//        quiz.setTitle(reqCreateQuizDTO.getTitle());
//        quiz.setDescription(reqCreateQuizDTO.getDescription());
//        quiz.setDuration(reqCreateQuizDTO.getDuration());
//        quiz.setCreateBy(creator);
//        quiz.setPublic(true); // Default sẽ là true
//        // Lưu Quiz để có ID Quiz
//        this.quizReposiotry.save(quiz);
//        // Call QuestionServer để tạo câu hỏi và câu trả lời
//       List<Question> questions = this.questionService.handleCreateQuestion(reqCreateQuizDTO.getQuestions(),quiz);
//       quiz.setQuestions(questions);
//       quiz.setTotalQuestions(questions.size()); // Đếm  số lượng question r tự thêm vào total
//        return this.quizReposiotry.save(quiz); // Lưu lại với danh sách câu hỏi
//
//    }
//     Tạo  mới Quiz :
    @Override
    public Quiz handleCreateQuiz(ReqCreateQuizDTO dto) {
        Quiz quiz = new Quiz();
        quiz.setTitle(dto.getTitle());
        quiz.setDescription(dto.getDescription());
        quiz.setPublic(dto.isPublic());
        quiz.setDuration(dto.getDuration());
        quiz.setSubject(dto.getSubject());
        quiz.setMajorName(dto.getMajorName());

        return this.quizReposiotry.save(quiz);
    }

//     Covert sang DTO :
//    public ResQuizDTO convertQuizToDTO(Quiz quiz) {
//        ResQuizDTO resQuizDTO = new ResQuizDTO();
//        resQuizDTO.setId(quiz.getId());
//        resQuizDTO.setTitle(quiz.getTitle());
//        resQuizDTO.setDescription(quiz.getDescription());
//        return resQuizDTO;
//    }
////     Fetch all Quiz
//    public List<Quiz> getAllQuiz() {
//        return this.quizReposiotry.findAll();
//    }
////     Update
//
//@Override
//    public Quiz handleUpdateQuiz(Long id,ReqCreateQuizDTO dto){
//    Quiz quiz = this.quizReposiotry.findById(id).orElseThrow(null);
//    quiz.setTitle(dto.getTitle());
//    quiz.setDescription(dto.getDescription());
//    quiz.setPublic(dto.isPublic());
//    quiz.setDuration(dto.getDuration());
//    quiz.setSubject(dto.getSubject());
//    quiz.setMajorName(dto.getMajorName());
//    return this.quizReposiotry.save(quiz);

//}

@Override
public Quiz getQuizById(Long id) {
    return quizReposiotry.findById(id)
            .orElseThrow(() -> new RuntimeException("Quiz không tồn tại với ID: " + id));
}

    @Override
    public List<Quiz> getAllQuiz() {
        return this.quizReposiotry.findAll();
    }

    @Override
    public Quiz handleUpdateQuiz(Long id, ReqCreateQuizDTO dto) {
        Quiz quiz = quizReposiotry.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz không tồn tại với ID: " + id));

        quiz.setTitle(dto.getTitle());
        quiz.setDescription(dto.getDescription());
        quiz.setPublic(dto.isPublic());
        quiz.setDuration(dto.getDuration());
        quiz.setSubject(dto.getSubject());
        quiz.setMajorName(dto.getMajorName());

        return quizReposiotry.save(quiz);
    }


    @Override
    public void deleteQuiz(Long id) {
        if (!quizReposiotry.existsById(id)) {
            throw new RuntimeException("Quiz không tồn tại với ID: " + id);
        }
        quizReposiotry.deleteById(id);
    }
//     Fetch phân trang

    @Override
    public ResultPaginationDTO getAllQuizPage(Pageable pageable, Specification<Quiz> specification) {
        Page<Quiz> quizPage = quizReposiotry.findAll(specification, pageable);
        ResultPaginationDTO rs = new ResultPaginationDTO();
        ResultPaginationDTO.Meta mt = new ResultPaginationDTO.Meta();
        mt.setPage(pageable.getPageNumber() + 1); // Page bd từ 0
        mt.setPageSize(pageable.getPageSize());
        mt.setPages(quizPage.getTotalPages());
        mt.setTotal(quizPage.getTotalPages());
         rs.setMeta(mt);
         rs.setData(quizPage.getContent());
         return rs;
}



}
