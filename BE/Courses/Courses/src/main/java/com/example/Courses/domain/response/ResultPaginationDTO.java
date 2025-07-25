package com.example.Courses.domain.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ResultPaginationDTO {
    private Meta meta;
    private Object data;

    @Getter
    @Setter
    public static class Meta{
        private int page;
        private int pageSize;
        private int pages;
        private int total;

    }
}
