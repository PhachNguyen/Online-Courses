package com.example.Courses.Service;

import com.example.Courses.Domain.response.ResCreateUserDTO;
import com.example.Courses.Domain.model.User;
import com.example.Courses.Repository.UserRepository;
import com.example.Courses.Util.constant.LoginType;
import com.example.Courses.Util.constant.RoleUser;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Create Access Token :

//     Post new User
    public User handleSaveUser(User user){
        User usercurrent = this.userRepository.save(user);
        return usercurrent;
//        System.out.println("Vừa thêm một user thành công " + user);
    }

//    Convert User sang ResCreateUserDTO
    public ResCreateUserDTO convertUserToDTO(User user){
    ResCreateUserDTO userDTO = new ResCreateUserDTO();
    userDTO.setEmail(user.getEmail());
    userDTO.setPassword(user.getPassword());

    userDTO.setId(user.getId());
    userDTO.setUsername(user.getUsername());
    return userDTO;
    }
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
    return res;
}

}
