package com.example.Courses.Repository;

import com.example.Courses.Domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// Nơi chứa các interface đại diện cho lớp truy vấn dữ liệu, giao tiếp với DB
//JpaSpecificationExecutor : Tạo truy vấn động Khi bạn cần filter (lọc) dữ liệu theo nhiều điều kiện tùy chọn, ví dụ:
//  + Tìm kiếm người dùng theo tên, email, role, ngày tạo...
//  + Không biết trước sẽ lọc theo field nào → phải tạo query động
@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    boolean existsByEmail(String email);


}
