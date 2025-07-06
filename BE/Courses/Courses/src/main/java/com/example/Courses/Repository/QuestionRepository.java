package com.example.Courses.Repository;

import com.example.Courses.Domain.model.Question;
import com.example.Courses.Domain.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
//    List<Question> findByQuiz(Quiz quiz);
}
