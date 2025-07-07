package com.example.Courses.Repository;

import com.example.Courses.Domain.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
}
