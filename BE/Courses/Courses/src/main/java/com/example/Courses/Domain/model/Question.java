package com.example.Courses.Domain.model;

import com.example.Courses.Util.constant.QuestionType;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne // N ques- 1 Quiz

    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    private String content;

    @Enumerated(EnumType.STRING)
    private QuestionType type;

    private String level;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Answer> answers;
}

