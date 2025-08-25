package com.example.Courses.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.format.datetime.standard.DateTimeFormatterRegistrar;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.time.format.DateTimeFormatter;

@Configuration
public class DateTimeFormatConfiguration  implements WebMvcConfigurer {
    @Override
    public void addFormatters(FormatterRegistry registry){
        DateTimeFormatterRegistrar registrar = new DateTimeFormatterRegistrar();
        registrar.setUseIsoFormat(true); // Convert theo ISO
        registrar.registerFormatters(registry);
    }

}
