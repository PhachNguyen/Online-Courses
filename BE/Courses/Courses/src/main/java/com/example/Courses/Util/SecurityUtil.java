package com.example.Courses.Util;

import com.example.Courses.Domain.request.ReqRegisterDTO;
import com.example.Courses.Domain.response.ResLoginDTO;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.util.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

// Create Token
@Service
public class SecurityUtil {
    // private final JwtEncoder jwtEncoder = new JwtEncoder(); // Tạo trực tiếp
    // trong class
    // Sử dụng DI
    private final JwtEncoder jwtEncoder;

    public SecurityUtil(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }

    // Sử dụng thuật toán HS512
    public static final MacAlgorithm JWT_ALGORITHM = MacAlgorithm.HS512;
    @Value("${phachnguyen.jwt.base64-secret}")
    private String jwtKey;
    @Value("${phachnguyen.jwt.access-token-validity-in-seconds}")
    private long accessTokenExpiration;
    @Value("${phachnguyen.jwt.refresh-token-validity-in-seconds}")
    private long refreshTokenExpiration;
<<<<<<< HEAD

    // Tạo accessToken
    public String createAccessToken(String email, ResLoginDTO resLoginDTO) {
=======
    // Tạo accessToken : PayLoad
    public  String createAccessToken(String email, ResLoginDTO resLoginDTO) {
>>>>>>> 89a71a8d34528a572ef5b7574a6698d6d06340b1
        ResLoginDTO.UserInsideToken userToken = new ResLoginDTO.UserInsideToken();
        userToken.setEmail(resLoginDTO.getUserLogin().getEmail());
        userToken.setId(resLoginDTO.getUserLogin().getId());
        userToken.setUsername(resLoginDTO.getUserLogin().getUsername());
        Instant now = Instant.now(); // Set up tg tạo token
        // Instant expiresAt = now.plusSeconds(accessTokenExpiration);// Dùng cho
        // seconds
        // Chrono cung cấp các đơn vị tiêu chuẩn sử dụng trong Java Date Time
        Instant validity = now.plus(this.accessTokenExpiration, ChronoUnit.SECONDS);

        // hardcode permission (for testing)
        List<String> listAuthority = new ArrayList<String>();

        listAuthority.add("ROLE_USER_CREATE");
        listAuthority.add("ROLE_USER_UPDATE");

        // Tạo Header
        JwsHeader jwsHeader = JwsHeader.with(JWT_ALGORITHM).build();

        // Xây dựng Payload
        // @formatter:off
//         Các data trong body thì sẽ là Claim
        JwtClaimsSet claims = JwtClaimsSet.builder()
                //                Token được phát hành khi nào?
                .issuedAt(now)
//                Được cấp(issuer) từ ai
                .issuer("phachnguyen")
//          Khi nào hết hạn
                .expiresAt(validity)
//                Ai là người dùng
                .subject(email)
//               Thêm một custom claim tên là "user" chứa đối tượng userToken
                .claim("user", userToken)
                .claim("permission", listAuthority)
                .build();
        return this.jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, claims)).getTokenValue();
    }

//     Refresh token
    public String createRefreshToken(String email, ResLoginDTO dto) {
        Instant now = Instant.now();
        Instant validity = now.plus(this.refreshTokenExpiration, ChronoUnit.SECONDS);

        ResLoginDTO.UserInsideToken userToken = new ResLoginDTO.UserInsideToken();
        userToken.setId(dto.getUserLogin().getId());
        userToken.setEmail(dto.getUserLogin().getEmail());
        userToken.setUsername(dto.getUserLogin().getUsername());

        // @formatter:off
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(validity)
                .subject(email)
                .claim("user", userToken)
                .build();

        JwsHeader jwsHeader = JwsHeader.with(JWT_ALGORITHM).build();
        return this.jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, claims)).getTokenValue();

    }

    // Tạo Khóa
    private SecretKey getSecretKey() {
        byte[] keyBytes = Base64.from(jwtKey).decode();
        return new SecretKeySpec(keyBytes, 0, keyBytes.length,
                JWT_ALGORITHM.getName());
    }
    /**
     * Get the login of the current user.
     *
     * @return the login of the current user.
     */
    public static Optional<String> getCurrentUserLogin() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return Optional.ofNullable(extractPrincipal(securityContext.getAuthentication()));
    }

    private static String extractPrincipal(Authentication authentication) {
        if (authentication == null) {
            return null;
//            UserDetails: Lấy thông tin người dùng
        } else if (authentication.getPrincipal() instanceof UserDetails springSecurityUser) {
            return springSecurityUser.getUsername();
        } else if (authentication.getPrincipal() instanceof Jwt jwt) {
            return jwt.getSubject();
        } else if (authentication.getPrincipal() instanceof String s) {
            return s;
        }
        return null;
    }

    /**
     * Get the JWT of the current user.
     *
     * @return the JWT of the current user.
     */
    public static Optional<String> getCurrentUserJWT() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return Optional.ofNullable(securityContext.getAuthentication())
                .filter(authentication -> authentication.getCredentials() instanceof String)
                .map(authentication -> (String) authentication.getCredentials());
    }

    /**
     * Check if a user is authenticated.
     *
     * @return true if the user is authenticated, false otherwise.
     */
    // public static boolean isAuthenticated() {
    //     Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    //     return authentication != null && getAuthorities(authentication).noneMatch(AuthoritiesConstants.ANONYMOUS::equals);
    // }

    /**
     * Checks if the current user has any of the authorities.
     *
     * @param authorities the authorities to check.
     * @return true if the current user has any of the authorities, false otherwise.
     */
    // public static boolean hasCurrentUserAnyOfAuthorities(String... authorities) {
    //     Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    //     return (
    //         authentication != null && getAuthorities(authentication).anyMatch(authority -> Arrays.asList(authorities).contains(authority))
    //     );
    // }

    /**
     * Checks if the current user has none of the authorities.
     *
     * @param authorities the authorities to check.
     * @return true if the current user has none of the authorities, false otherwise.
     */
    // public static boolean hasCurrentUserNoneOfAuthorities(String... authorities) {
    //     return !hasCurrentUserAnyOfAuthorities(authorities);
    // }

    /**
     * Checks if the current user has a specific authority.
     *
     * @param authority the authority to check.
     * @return true if the current user has the authority, false otherwise.
     */
    // public static boolean hasCurrentUserThisAuthority(String authority) {
    //     return hasCurrentUserAnyOfAuthorities(authority);
    // }

    // private static Stream<String> getAuthorities(Authentication authentication) {
    //     return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority);
    // }

}
