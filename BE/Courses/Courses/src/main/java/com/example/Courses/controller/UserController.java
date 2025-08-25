 package com.example.Courses.controller;

 import com.example.Courses.domain.model.User;
 import com.example.Courses.domain.response.ResCreateUserDTO;
 import com.example.Courses.domain.response.ResultPaginationDTO;
 import com.example.Courses.repository.UserRepository;
 import com.example.Courses.service.UserService;

 import com.example.Courses.Util.annotation.ApiMessage;
 import com.turkraft.springfilter.boot.Filter;
 import jakarta.validation.Valid;
 import org.springframework.data.domain.Pageable;
 import org.springframework.data.jpa.domain.Specification;
 import org.springframework.http.HttpStatus;
 import org.springframework.http.HttpStatusCode;
 import org.springframework.http.ResponseEntity;
 import org.springframework.web.bind.annotation.*;

 import java.util.List;

 @RestController
 @RequestMapping("/api/v1/users")
// ReponseEntity : Trả phản hồi về cho server, dùng khi muốn trả một status cụ
// thể, thêm header( Token)
// ResponseEntity<T> đại diện cho toàn bộ phản hồi HTTP, bao gồm:
// Dữ liệu trả về (body)
// Mã trạng thái (HTTP status)
// Header
 public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
   this.userService = userService;
  }

  // Dùng cho admin có quyền tự dang ký cho user - hoặc giáo viên
  @PostMapping("/add")
  @ApiMessage("Create a new user")
  public ResponseEntity<User> handleAddUser(@RequestBody User user) { // Check email đã tồn tại( Fixes sau )
   User createUser = this.userService.handleCreateUser(user);
   return ResponseEntity.status(HttpStatus.CREATED).body(createUser);
  }
// Hàm Fetch User
  @GetMapping
  @ApiMessage("Fetch  User")
  public ResponseEntity<List<User>> getUser() {
   List<User> res = this.userService.hanldeFetchUser();
   return ResponseEntity.status(HttpStatus.OK).body(res);
  }

//   Fetch User Pagination

//  @GetMapping
//  @ApiMessage("Fetch  User")
//  public ResponseEntity<ResultPaginationDTO> getUser(
//          @Filter Specification<User> spec, Pageable pageable
//  ) {
//  ResultPaginationDTO res = this.userService.getAllUsers(pageable, spec);
//   return ResponseEntity.status(HttpStatus.OK).body(res);
//  }


// Tạo user trả vể ResUserDTO:
// @PostMapping("/user")
// @ApiMessage("Create a new user")
//// @RequestBody : được lấy từ boday của HTTP request
//// @Valid : Dùng để kích hoạt cơ chế kiểm tra validate
// ResponseEntity<ResCreateUserDTO> handleCreateUser(@RequestBody @Valid
// ResCreateUserDTO userDTO) {
//
//  return
// }

  // Hàm Delete
  @DeleteMapping ("/{userId}")
  @ApiMessage("Delete User")
  public ResponseEntity<String> handleDeleteUser(@PathVariable Long userId) {
   this.userService.handleDeleteUser(userId);
   return ResponseEntity.ok("Deleted User "+ userId);
  }
 }
