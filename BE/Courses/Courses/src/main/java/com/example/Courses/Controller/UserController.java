//package com.example.Courses.Controller;
//
//import com.example.Courses.Domain.model.User;
//import com.example.Courses.Domain.response.ResCreateUserDTO;
//import com.example.Courses.Repository.UserRepository;
//import com.example.Courses.Service.UserService;
//
//import com.example.Courses.Util.annotation.ApiMessage;
//import jakarta.validation.Valid;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/v1")
////ReponseEntity : Trả phản hồi về cho server, dùng khi muốn trả một status cụ thể, thêm header( Token)
////ResponseEntity<T> đại diện cho toàn bộ phản hồi HTTP, bao gồm:
////Dữ liệu trả về (body)
////Mã trạng thái (HTTP status)
////Header
//public class UserController {
//    private final UserService userService;
//    public UserController(UserService userService) {
//        this.userService = userService;
//    }
////    @PostMapping("/add")
////    @ApiMessage("Create a new user")
////    public User handleAddUser(@RequestBody User user){
////        return userService.handleSaveUser(user);
////
////    }
//
////     Tạo user trả vể ResUserDTO:
//    @PostMapping("/user")
//    @ApiMessage("Create a new user")
////    @RequestBody : được lấy từ boday của HTTP request
////    @Valid : Dùng để kích hoạt cơ chế kiểm tra validate
////    ResponseEntity<ResCreateUserDTO> handleCreateUser(@RequestBody @Valid ResCreateUserDTO userDTO) {
////
////    }
//}
