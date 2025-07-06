package com.example.Courses.Domain.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "submission_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubmissionDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Submission submission;

    @ManyToOne
    private Question question;

    @ManyToOne
    private Answer selectedAnswer;

    private boolean isCorrect;
}

