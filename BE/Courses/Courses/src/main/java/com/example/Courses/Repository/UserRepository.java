package com.example.Courses.Repository;

import com.example.Courses.Domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Nơi chứa các interface đại diện cho lớp truy vấn dữ liệu, giao tiếp với DB
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User save(User user);


}
