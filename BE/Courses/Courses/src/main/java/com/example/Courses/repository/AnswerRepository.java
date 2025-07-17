package com.example.Courses.repository;

import com.example.Courses.domain.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
//     Render answer theo Question
    List<Answer> findByQuestionId(Long questionId);
}
