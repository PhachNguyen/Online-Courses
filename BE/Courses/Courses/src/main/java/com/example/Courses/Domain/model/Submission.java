package com.example.Courses.Domain.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "submissions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double score;
    private int durationTaken;
    private LocalDateTime submittedAt;

    @ManyToOne
    private User user;

    @ManyToOne
    private Quiz quiz;

    @OneToMany(mappedBy = "submission", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SubmissionDetail> submissionDetails;

    @PrePersist
    public void onSubmit() {
        this.submittedAt = LocalDateTime.now();
    }
}

