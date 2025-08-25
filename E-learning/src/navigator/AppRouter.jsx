//  Router  chứa toàn bộ cấu trúc chính của ứng dụng .
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import QuizInfo from "../pages/teacher/Quiz/QuizInfo";
import QuizQuestions from "../pages/teacher/Quiz/QuizQuestions";
import QuizAdvanced from "../pages/teacher/Quiz/QuizAdvanced";
import QuizHistory from "../pages/teacher/Quiz/QuizHistory";
import QuizStatistics from "../pages/teacher/Quiz/QuizStatistics";
import QuizStart from "../pages/QuizDetail";
import AdminDashboard from "../pages/admin/AdminDashboard";
import StudentManagement from "../pages/admin/StudentManagement";

function Layout() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <>
            {!isAdminRoute && <Header />}
            <Routes>
                <Route path="/Home" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboardTeacher" element={<TeacherDashboard />} />
                <Route path="/quiz/create/info" element={<QuizInfo />} />
                <Route path="/quiz/create/questions" element={<QuizQuestions />} />
                <Route path="/quiz/create/advanced" element={<QuizAdvanced />} />
                <Route path="/quiz/create/history" element={<QuizHistory />} />
                <Route path="/quiz/create/statistics" element={<QuizStatistics />} />
                <Route path="/quiz/:id" element={<QuizStart />} />

                {/*  Admin */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/students" element={<StudentManagement />} />
            </Routes>
            {!isAdminRoute && <Footer />}
        </>
    );
}

export default function AppRouter() {
    return <Layout />;
}