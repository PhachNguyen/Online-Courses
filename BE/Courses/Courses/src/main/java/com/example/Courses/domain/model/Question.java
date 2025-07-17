package com.example.Courses.domain.model;

import com.example.Courses.Util.constant.QuestionType;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    private String level;
//cascade = CascadeType.ALL : Nếu bạn lưu/xóa/cập nhật Question, thì các Answer
// liên quan cũng sẽ tự động được xử lý theo (ví dụ: lưu luôn tất cả đáp án khi lưu câu hỏi)
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Answer> answers;
}

