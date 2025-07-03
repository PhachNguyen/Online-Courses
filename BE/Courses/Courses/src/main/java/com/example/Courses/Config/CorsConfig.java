package com.example.Courses.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

// Class connect tới FE

@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfiguration() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        // Cho phép các URL nào có thể kết nối tới BE :
        corsConfiguration.setAllowedOrigins(
                Arrays.asList("http://localhost:3000", "http://localhost:4173", "http://localhost:5173")); // Chuyển
                                                                                                           // array sang
                                                                                                           // List
        // Các method nào được kết nối
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // Các phần Header được gửi lên
        corsConfiguration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept", "x-no-retry"));
        // Có gửi kèm cookies hay không
        corsConfiguration.setAllowCredentials(true);
        // Thời gian pre-flight có thể cache ( tính theo seconds)
        corsConfiguration.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource(); // Quản lý các cấu hình CORS cho
                                                                                        // từng URL
        // Config CORS cho tất cả các API
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }
}