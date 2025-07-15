package com.example.Courses.domain.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
// Entity chứa kết quả tổng  user làm xong Quiz
@Entity
public class QuizzResult {
    @Id
    @GeneratedValue
    private Long id;

    // 1 User - N Result
    @ManyToOne
    private User user;
//      1 Quiz - N result
    @ManyToOne
    private Quiz quiz;

}
