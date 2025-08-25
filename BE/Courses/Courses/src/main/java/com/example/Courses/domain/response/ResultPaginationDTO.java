package com.example.Courses.domain.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ResultPaginationDTO {
    // Set up
    private Meta meta;
    private Object data;  // List các danh sách

    @Getter
    @Setter
    public static class Meta{ // Class render ra page
        private int page; //  Current page
        private int pageSize; // limit pages on size
        private int pages; // Tổng số trang
        private Long total; // All

    }
}
