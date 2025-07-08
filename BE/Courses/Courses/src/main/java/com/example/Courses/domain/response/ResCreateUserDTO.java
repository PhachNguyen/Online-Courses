package com.example.Courses.domain.response;
// Response User for Server: Chỉ chứa các thông tin cần trả về
public class ResCreateUserDTO {
private Long id;
//private String firstName;
//private String lastName;
    private String username;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    private String email;
private String password;
private String confirmPassword;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

//    public String getFirstName() {
//        return firstName;
//    }
//
//    public String getLastName() {
//        return lastName;
//    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

//    public void setLastName(String lastName) {
//        this.lastName = lastName;
//    }
//
//    public void setFirstName(String firstName) {
//        this.firstName = firstName;
//    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
