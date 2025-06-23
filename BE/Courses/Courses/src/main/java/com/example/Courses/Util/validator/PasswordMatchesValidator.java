package com.example.Courses.Util.validator;


import com.example.Courses.Domain.request.ReqRegisterDTO;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

// Generic
public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, ReqRegisterDTO> {

    @Override
    public boolean isValid(ReqRegisterDTO dto, ConstraintValidatorContext context) {
        if (dto.getPassword() == null || dto.getConfirmPassword() == null) {
            return false;
        }
        return dto.getPassword().equals(dto.getConfirmPassword());
    }
}