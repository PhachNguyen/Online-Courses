package com.example.Courses.Util.error;

import com.example.Courses.domain.response.RestResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import javax.xml.stream.FactoryConfigurationError;
import java.util.List;
import java.util.stream.Collectors;

// Bắt catch tất cả các exception
// Tự động chuyển exception thành JSON đẹp và thống nhất
// Tránh lặp try-catch trong tưng controller
@RestControllerAdvice
public class GlobalException {
//     Tạo ngoại lệ toàn cục
    @ExceptionHandler(Exception.class)
    public ResponseEntity<RestResponse<Object>> handleExceptionAll(Exception e) {
        RestResponse<Object> res = new RestResponse<Object>();
        res.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value()); // Truyền mã lỗi
//        Message : Thông báo lỗi chi tiết
        res.setMessage(e.getMessage());
//         Error: Thông báo lỗi cụ thể ngắn gọn
        res.setError("Internal Server Error");

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
    }
    // Resource
    @ExceptionHandler(value = NoResourceFoundException.class)
    public ResponseEntity<RestResponse<Object>> handleNoResourceFoundException(NoResourceFoundException e) {
        RestResponse<Object> res = new RestResponse<>();
        res.setStatus(HttpStatus.NOT_FOUND.value());
        res.setMessage(e.getMessage());
        res.setError("Resource Not Found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
    }
//     Exception Valid
   @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<RestResponse<Object>> handleValidationErrors(MethodArgumentNotValidException e) {
        BindingResult bindingResult = e.getBindingResult();
        final List<FieldError> fieldErrors = bindingResult.getFieldErrors();
        RestResponse<Object> res = new RestResponse<>();
//       res.setMessage(fieldErrors.toString());
        res.setStatus(HttpStatus.BAD_REQUEST.value());
        res.setError(e.getBody().getDetail());
        List<String> errors = fieldErrors.stream().map(FieldError::getDefaultMessage)
                .collect(Collectors.toList());
        res.setMessage(errors.size()>1 ? errors: errors.get(0));
//       res.setMessage(errors);
//       res.setData(fieldErrors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);

   }
//    Exception lưu file
    @ExceptionHandler(value = StorageExeption.class)  // Khi exception bị ném ra sẽ chạy method này
    public ResponseEntity<RestResponse<Object>>handleFileUploadExeption(FactoryConfigurationError e) {
        RestResponse<Object> res = new RestResponse<>();
        res.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        res.setMessage(e.getMessage());
        res.setError("Execption Upload File ..");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }
}
