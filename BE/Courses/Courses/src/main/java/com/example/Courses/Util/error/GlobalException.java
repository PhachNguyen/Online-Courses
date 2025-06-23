//package com.example.Courses.Util.error;
//
//import com.example.Courses.Domain.response.RestResponse;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//
//public class GlobalException {
////     Tạo ngoại lệ toàn cục
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<RestResponse<Object>> handleExceptionAll(Exception e) {
//        RestResponse<Object> res = new RestResponse<Object>();
//        res.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value()); // Truyền mã lỗi
////        Message : Thông báo lỗi chi tiết
//        res.setMessage(e.getMessage());
////         Error: Thông báo lỗi cụ thể ngắn gọn
//        res.setError("Internal Server Error");
//
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
//    }
//    // Tự tạo ngoại lệ
//    @ExceptionHandler(value =
//            {
//                    UsernameNotFoundException.class,
//
//            })
//}
