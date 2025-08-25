package com.example.Courses.domain.model;

import com.example.Courses.Util.constant.QuestionType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @JsonIgnore
    private Quiz quiz;
    private String content;
    @Enumerated(EnumType.STRING)
    private QuestionType type;
    private String level; // Chuyển thành session ở FE

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value =   "question")
    private List<Answer> answers;
}

