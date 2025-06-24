package com.example.Courses.Config;

//import lombok.Value;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
// Bật tính năng bảo mật ở muc method
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration {
@Value("${phachnguyen.jwt.base64-secret}")
    private  String jwtKey;
// Encode password
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Mã hóa password
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, CustomAuthenticationEntryPoint customAuthenticationEntryPoint) throws Exception {
//         Tạo một array String
        String[] whileList = {
                "/",
                "/api/v1/auth/login", "/api/v1/auth/refresh", "/api/v1/auth/register",
                "/storage/**",
                "/api/v1/email/**",
                "/v3/api-docs/**",
                "/swagger-ui/**",
                "/swagger-ui.html"
        };
//         Gọi các phương thức của class HttpSecurity
        http
                .csrf(c->c.disable()) // Lambda Expression , Tat csrf
                .cors(Customizer.withDefaults()) // Cho phép gọi từ FE khác
                .authorizeHttpRequests(
                        // Cho phép các trang truy cập
                    authz-> authz
                            .requestMatchers(whileList).permitAll()
//                             Truy cập pthuc GET
//                            To do
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer((oauth2)-> oauth2.jwt(Customizer.withDefaults())
                        .authenticationEntryPoint(customAuthenticationEntryPoint))

                            // .exceptionHandling(
                            // exceptions -> exceptions
                            // .authenticationEntryPoint(customAuthenticationEntryPoint) // 401
                            // .accessDeniedHandler(new BearerTokenAccessDeniedHandler())) // 403

                            .formLogin(f -> f.disable())
                            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}
