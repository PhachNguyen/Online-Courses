//  Router  chứa toàn bộ cấu trúc chính của ứng dụng .
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import TeacherDashboard from "../pages/teacher/TeacherDashboard";

export default function AppRouter() {

    return (
        <>
            <Header />
            <Routes>
                <Route path="/Home" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboardTeacher" element={<TeacherDashboard />} />
            </Routes>
            <Footer />
        </>
    );
}