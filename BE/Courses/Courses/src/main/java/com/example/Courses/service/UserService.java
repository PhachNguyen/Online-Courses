package com.example.Courses.service;

import com.example.Courses.domain.model.Quiz;
import com.example.Courses.domain.response.ResCreateUserDTO;
import com.example.Courses.domain.model.User;
import com.example.Courses.domain.response.ResultPaginationDTO;
import com.example.Courses.repository.UserRepository;
import com.example.Courses.Util.constant.LoginType;
import com.example.Courses.Util.constant.RoleUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Create Access Token :

//    Convert User sang ResCreateUserDTO
//    public ResCreateUserDTO convertUserToDTO(User user){
//    ResCreateUserDTO userDTO = new ResCreateUserDTO();
//    userDTO.setEmail(user.getEmail());
//    userDTO.setPassword(user.getPassword());
//
//    userDTO.setId(user.getId());
//    userDTO.setUsername(user.getUsername());
//    return userDTO;
//    }
    // Check email is Exist
    public boolean isEmailExist(String email) {
        return this.userRepository.existsByEmail(email);
    }
    // Find by email
    public User getUserByEmail(String email) {
        // ném ra execption nếu k tìm thấy user
        return this.userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy email"));
    }
// Get user by ID
    public User getUserById(Long id) {
        return this.userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));
    }
    // Create User
public User handleCreateUser(User user) {
    return this.userRepository.save(user);
}

// Login by Google
    public User processOAuthLogin(String email, String name) {
        return userRepository.findByEmail(email).orElseGet(() ->{
            User user = new User();
            user.setEmail(email);
            user.setUsername(name);
            user.setPassword("GOOGLE_USER");
            user.setLoginType(LoginType.GOOGLE);
            user.setRoleUser(RoleUser.STUDENT);

       return      userRepository.save(user);
        });
    }
// Convert ResUserDTO
public ResCreateUserDTO convertToResCreateUserDTO(User user) {
    ResCreateUserDTO res = new ResCreateUserDTO();

    res.setId(user.getId());
    res.setEmail(user.getEmail());
  res.setUsername(user.getUsername());
  res.setCreateAt(user.getCreateAt());

    return res;
}
// Fetch Paginigation
   public ResultPaginationDTO getAllUsers(Pageable pageable, Specification<User> specification) {
        Page<User> users = userRepository.findAll(specification, pageable);
        ResultPaginationDTO rs = new ResultPaginationDTO();
        ResultPaginationDTO.Meta mt = new ResultPaginationDTO.Meta();
        mt.setPage(pageable.getPageNumber());
        mt.setPageSize(pageable.getPageSize());
        mt.setPages(users.getTotalPages());
        mt.setTotal(users.getTotalElements());
        rs.setMeta(mt);
        rs.setData(users.getContent());
        return rs;
   }

public List<User> hanldeFetchUser() {
     return   this.userRepository.findAll();
}
// Hàm update
    public User handleUpdateUser(Long id,User user) {
        User currentUser = this.userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tồn tại user với ID "+ id) );
        currentUser.setUsername(user.getUsername());
return currentUser;
    }

//     Hàm Delete
    public void handleDeleteUser(Long id) {
        if(this.userRepository.existsById(id)) {
            this.userRepository.deleteById(id);
        }else {
            throw new RuntimeException("Không tồn tại User với id " + id);
        }
    }

}
