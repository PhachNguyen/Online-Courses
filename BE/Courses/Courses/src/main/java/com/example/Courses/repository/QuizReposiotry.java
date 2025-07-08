package com.example.Courses.repository;

import com.example.Courses.domain.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizReposiotry extends JpaRepository<Quiz, Long> {
//    List<Quiz> findByQuiz(Quiz quiz);
}
