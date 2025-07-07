package com.example.Courses.Domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor

@Entity
// Quiz : Bai kiểm tra, một tập các question
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String subject; // Toán cao cấp, dstt
   private int duration; // Th ời gian làm bài
    private int totalQuestions; // Tổng số câu hỏi
    private boolean isPublic;
    // 1 User - N Quiz
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "create_by")
         private  User createBy;
//    createdAt, updatedAt
//     1 Quiz - N Question
    @OneToMany
    private List<Question> questions;

}
