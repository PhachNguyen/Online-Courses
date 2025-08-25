package com.example.Courses.domain.model;

import com.example.Courses.Util.SecurityUtil;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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
    @NotBlank(message = " Title không được để trống")
    @Size(max = 255, message = "Tối đa 255 kí tự")
    private String title;
    private String description; // Mô tả về đề thi
//    @NotBlank(message = "Môn học không được để trống")
    private String subject; // Major
    //
    private String university; // Chọn trường học
    private  String majorName;
//    @Min(value = 1, message = "Thời gian làm bài không hợp lệ ")
   private int duration; // Thời gian làm bài
    private boolean isPublic;
    // 1 User - N Quiz
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "create_by")
         private  String createBy;
         private  String updateBy;
         private Instant createAt;
         private Instant updateAt;
         // File ảnh
    private  String logo;
//    createdAt, updatedAt
//     1 Quiz - N Question
@OneToMany(mappedBy = "quiz", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
private List<Question> questions;

// N - Quiz  == 1 Course
@ManyToOne
@JsonIgnoreProperties(value = "Quizzes")
    private Course course;


    //    @PrePersist = trước khi thêm mới vào DB, hãy chạy code này
    @PrePersist
    public void handleBeforePersist() {
        this.createBy = SecurityUtil.getCurrentUserLogin().isPresent() == true
                ? SecurityUtil.getCurrentUserLogin().get()
                : "Không tìm được người thêm mới";
        this.createAt = Instant.now();
    }
//    @PreUpdate = trước khi cập nhật DB, hãy chạy code này.
    @PreUpdate
    public void handleBeforeUpdate() {
        this.updateAt = Instant.now();
        this.updateBy = SecurityUtil.getCurrentUserLogin().isPresent() == true
        ? SecurityUtil.getCurrentUserLogin().get()
        :"Không tìm được người Update";
    }
}
