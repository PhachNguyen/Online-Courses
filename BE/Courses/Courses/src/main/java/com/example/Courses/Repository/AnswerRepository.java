package com.example.Courses.Repository;

import com.example.Courses.Domain.model.Answer;
import org.springframework.data.repository.CrudRepository;

public interface AnswerRepository extends CrudRepository<Answer, Long> {
}
