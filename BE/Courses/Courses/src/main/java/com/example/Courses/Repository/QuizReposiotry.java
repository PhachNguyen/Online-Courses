package com.example.Courses.Repository;

import com.example.Courses.Domain.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface QuizReposiotry extends JpaRepository<Quiz, Long> {
//    List<Quiz> findByQuiz(Quiz quiz);
}
