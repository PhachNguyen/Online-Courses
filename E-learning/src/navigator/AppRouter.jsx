//  Router  chứa toàn bộ cấu trúc chính của ứng dụng .
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";

export default function AppRouter() {

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

        </Routes>
    );
}