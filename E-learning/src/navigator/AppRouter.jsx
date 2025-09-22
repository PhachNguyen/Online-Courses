//  Router  chứa toàn bộ cấu trúc chính của ứng dụng .
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import TeacherDashboard from "../pages/teacher/DashboardTeacher";
import Courses from "../pages/Courses";
import QuizInfo from "../pages/teacher/Quiz/QuizInfo";
import QuizQuestions from "../pages/teacher/Quiz/QuizQuestions";
import QuizAdvanced from "../pages/teacher/Quiz/QuizAdvanced";
import QuizHistory from "../pages/teacher/Quiz/QuizHistory";
import QuizStatistics from "../pages/teacher/Quiz/QuizStatistics";
import QuizStart from "../pages/QuizDetail";
import AdminDashboard from "../pages/admin/AdminDashboard";
import StudentManagement from "../pages/admin/StudentManagement";
import TeacherStudentManagement from "../pages/teacher/StudentManagement";
import CourseManagement from "../pages/admin/Course/CourseManagement";
import Course from "../pages/teacher/Course";
import C from "../pages/teacher/CourseManagementTeacher";
// Admin 
import AddCourse from "../pages/admin/Course/AddCourse";
function Layout() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';

    return (
        <>
            {!(isAdminRoute || isLoginPage || isRegisterPage) && <Header />}
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
                <Route path="/dashboardTeacher/quizzes" element={<Course />} />
                <Route path="/dashboardTeacher/students" element={<TeacherStudentManagement />} />
                {/*  Admin */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/students" element={<StudentManagement />} />
                <Route path="/admin/courses" element={<CourseManagement />} />
                <Route path="/admin/courses/add" element={<AddCourse />} />
                <Route path="/courses" element={<Courses />} />
                {/* Teacher */}
                <Route path="/dashboardTeacher/course" element={<C />} />
            </Routes>
            {!(isAdminRoute || isLoginPage || isRegisterPage) && <Footer />}
        </>
    );
}

export default function AppRouter() {
    return <Layout />;
}