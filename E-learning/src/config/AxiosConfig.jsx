import axios from "axios";

// Utility functions for authentication
const getStoredToken = () => {
    let token = localStorage.getItem("accessToken");
    if (!token) {
        token = sessionStorage.getItem("accessToken");
    }
    return token;
};

const clearAuthData = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
};

// Tạo token 
const api = axios.create({
    baseURL: "http://localhost:8080/api/v1", // URL BE
    withCredentials: true, // Để gửi và nhận cookie refreshToken
});
//  Interceptors : Bộ chặn, dùng để trung gian giữa các req và res
//  Request :
api.interceptors.request.use((config) => { // Tạo interceptors cho mỗi Req
    const token = getStoredToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Gắn token vào Header HTTP
        console.log("Nhận token :", token);
    }
    else {
        console.warn(" Không tìm thấy token ")
    }
    return config;
});

//  Response
api.interceptors.response.use(undefined, async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            const res = await axios.get("http://localhost:8080/api/v1/auth/refresh", { // Gán refresh vào res
                withCredentials: true,
            });
            const newToken = res.data.accessToken;
            // Lưu token mới vào cùng nơi với token cũ
            if (localStorage.getItem("accessToken")) {
                localStorage.setItem("accessToken", newToken);
            } else {
                sessionStorage.setItem("accessToken", newToken);
            }
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
        } catch (error) {
            clearAuthData();
            //    window.location.href = "/login"; // Chuyển về login nếu refresh cũng fail
        }
    }

    return Promise.reject(error);
}
);
// Hàm đăng xuất 
async function logout() {
    try {
        await api.post("/auth/logout"); // gọi BE xóa refreshToken nếu có
    } catch (err) {
        console.warn("Không gọi được logout từ backend:", err);
    } finally {
        clearAuthData();
        window.location.href = "/login";
    }
}

export default api;
