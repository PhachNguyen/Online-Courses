package com.example.Courses.config;

//import lombok.Value;
import com.example.Courses.Util.SecurityUtil;
import com.nimbusds.jose.jwk.source.ImmutableSecret;
import com.nimbusds.jose.util.Base64;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

@Configuration
// Bật tính năng bảo mật ở muc method
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration {
    @Value("${phachnguyen.jwt.base64-secret}")
    private String jwtKey;

    // Encode password
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Mã hóa password
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
            CustomAuthenticationEntryPoint customAuthenticationEntryPoint,
                                                   @Qualifier("corsConfiguration") CorsConfigurationSource corsSource  ) throws Exception {
        // Tạo một array String
        String[] whileList = {
                "/",
                "/api/v1/auth/login", "/api/v1/auth/refresh", "/api/v1/auth/register",
                "/storage/**",
                "/api/v1/email/**",
                "/v3/api-docs/**",
                "/swagger-ui/**",
                "/swagger-ui.html",
                "/oauth2/**", // Login GG
                "/login/**",
                "/api/v1/quizzes"
        };
        // Gọi các phương thức của class HttpSecurity
        http
                .csrf(c -> c.disable()) // Lambda Expression , Tat csrf
                .cors(Customizer.withDefaults()) // Kích hoạt cors
                .cors(cors -> cors.configurationSource(corsSource))
                .authorizeHttpRequests(
                        // Cho phép các trang truy cập
                        authz -> authz
                                .requestMatchers(whileList).permitAll()
                                // Truy cập pthuc GET
                                // To do
                                .anyRequest().authenticated())
                .oauth2ResourceServer((oauth2) -> oauth2.jwt(Customizer.withDefaults())
                        .authenticationEntryPoint(customAuthenticationEntryPoint))

                // .exceptionHandling(
                // exceptions -> exceptions
                // .authenticationEntryPoint(customAuthenticationEntryPoint) // 401
                // .accessDeniedHandler(new BearerTokenAccessDeniedHandler())) // 403

                .formLogin(f -> f.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

    // Mã hóa JWT
    @Bean
    public JwtEncoder jwtEncoder() {
        return new NimbusJwtEncoder(new ImmutableSecret<>(getSecretKey()));

    }

    private SecretKey getSecretKey() {
        byte[] keyBytes = Base64.from(jwtKey).decode(); // Giai mã key
        return new SecretKeySpec(keyBytes, 0, keyBytes.length,
                SecurityUtil.JWT_ALGORITHM.getName());
    }

    // Giải mã JWT
    @Bean
    public JwtDecoder jwtDecoder() {
        NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withSecretKey(
                getSecretKey()).macAlgorithm(SecurityUtil.JWT_ALGORITHM).build();
        return token -> {
            try {
                return jwtDecoder.decode(token);
            } catch (Exception e) {
                System.out.println(">>> JWT error: " + e.getMessage());
                throw e;
            }
        };
    }
}
