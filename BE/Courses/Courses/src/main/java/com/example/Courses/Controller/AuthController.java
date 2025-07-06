package com.example.Courses.Controller;

import com.example.Courses.Domain.model.User;
import com.example.Courses.Domain.request.ReqLoginDTO;
import com.example.Courses.Domain.request.ReqRegisterDTO;
import com.example.Courses.Domain.response.ResCreateUserDTO;
import com.example.Courses.Domain.response.ResLoginDTO;
import com.example.Courses.Service.UserService;
import com.example.Courses.Util.SecurityUtil;
import com.example.Courses.Util.annotation.ApiMessage;
import com.example.Courses.Util.constant.LoginType;
import com.example.Courses.Util.constant.RoleUser;
import com.example.Courses.Util.error.IdInvalidExecption;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final SecurityUtil securityUtil;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(
            AuthenticationManagerBuilder authenticationManagerBuilder,
            SecurityUtil securityUtil,
            UserService userService,
            PasswordEncoder passwordEncoder) {
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.securityUtil = securityUtil;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @Value("${phachnguyen.jwt.refresh-token-validity-in-seconds}")
    private long refreshTokenExpiration;

    // Register
    @PostMapping("/register")
    @ApiMessage("Register a new user")
    public ResponseEntity<ResCreateUserDTO> register(@Valid @RequestBody User postManUser) throws IdInvalidExecption {
        boolean isEmailExist = this.userService.isEmailExist(postManUser.getEmail());
        if (isEmailExist) {
            throw new IdInvalidExecption(
                    "Email " + postManUser.getEmail() + "đã tồn tại, vui lòng sử dụng email khác.");
        }

        String hashPassword = this.passwordEncoder.encode(postManUser.getPassword());
        postManUser.setPassword(hashPassword);
        postManUser.setLoginType(LoginType.LOCAL);
        postManUser.setRoleUser(RoleUser.STUDENT);
        User ericUser = this.userService.handleCreateUser(postManUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(this.userService.convertToResCreateUserDTO(ericUser));
    }

    // Login + JWT:
    @PostMapping("/login")
    @ApiMessage("Login User")
    public ResponseEntity<ResLoginDTO> login(@Valid @RequestBody ReqLoginDTO loginDto) {
        Authentication authentication = null;
        ResLoginDTO resLoginDTO = new ResLoginDTO();

        try {
            // 1. Xác thực người dùng, Cần viết hàm loadByUsername ở UserDetailsCustom trước
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

            authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
            if (authentication == null) {
                System.out.println("Authentication Failed");
            }
            // 2. Set context
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // 3. Lấy user từ DB
            User currentUser = this.userService.getUserByEmail(loginDto.getEmail());
            ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin(
                    currentUser.getId(),
                    currentUser.getEmail(),
                    currentUser.getUsername(),
                    currentUser.getRoleUser()
            );
            resLoginDTO.setUserLogin(userLogin);

        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Email hoặc mật khẩu không chính xác");
        }

        // 4. Sinh access token
        String access_token = this.securityUtil.createAccessToken(authentication.getName(), resLoginDTO);
        resLoginDTO.setAccessToken(access_token);

        // 5. Sinh refresh token
        String refresh_token = this.securityUtil.createRefreshToken(loginDto.getEmail(), resLoginDTO);

        // 6. Set cookie
        ResponseCookie resCookies = ResponseCookie
                .from("refresh_token", refresh_token)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(refreshTokenExpiration)
                .build();

        // 7. Trả kết quả
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, resCookies.toString())
                .body(resLoginDTO);
    }


}

