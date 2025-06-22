package com.example.Courses.Service;

import com.example.Courses.Domain.response.ResCreateUserDTO;
import com.example.Courses.Domain.User;
import com.example.Courses.Repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
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
}
