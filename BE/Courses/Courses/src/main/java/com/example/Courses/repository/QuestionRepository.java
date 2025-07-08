package com.example.Courses.repository;

import com.example.Courses.domain.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
//    List<Question> findByQuiz(Quiz quiz);
}
