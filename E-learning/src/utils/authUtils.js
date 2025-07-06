// Utility functions for authentication

export const getStoredToken = () => {
    // Kiểm tra token trong localStorage trước, sau đó sessionStorage
    let token = localStorage.getItem("accessToken");
    if (!token) {
        token = sessionStorage.getItem("accessToken");
    }
    return token;
};

export const getStoredUser = () => {
    // Kiểm tra user trong localStorage trước, sau đó sessionStorage
    let user = localStorage.getItem("user");
    if (!user) {
        user = sessionStorage.getItem("user");
    }
    return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
    return !!getStoredToken();
};

export const clearAuthData = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
};

export const setAuthData = (token, user, rememberMe = false) => {
    if (rememberMe) {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify(user));
    } else {
        sessionStorage.setItem("accessToken", token);
        sessionStorage.setItem("user", JSON.stringify(user));
    }
}; 