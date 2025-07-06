package com.example.Courses.Domain.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class ResLoginDTO {
    @JsonProperty("access_token")
    private String accessToken;
    private  UserLogin userLogin;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
//     Tạo 1 class static lồng nhau
//     Thông tin người dùng sau khi res
    public static class UserLogin{
        private long id;
        private String email;
        private String username;

    }
//     Bọc lại user cho Response trả về tài khoan
    public static class UserGetAccount{
        private UserLogin userLogin;
    }
//     Dùng để nhúng JWT t
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserInsideToken{
        private long id;
        private String email;
        private String username;
}

}
