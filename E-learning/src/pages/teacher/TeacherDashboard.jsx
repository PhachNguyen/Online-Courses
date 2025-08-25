import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter } from "lucide-react";
import api from "../../config/AxiosConfig";
import QuizCard from "../../components/QuizCard";
import Sidebar from "../../components/SidebarTeacher";

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);
    const [page, setPage] = useState(0);
    const [size] = useState(6);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch quiz list
    const handleFetchQuiz = async (newPage) => {
        try {
            setLoading(true);
            const res = await api.get(`/quizzes?page=${newPage}&size=${size}`);

            // 🔥 Kiểm tra lại cấu trúc response
            const quizData = res.data?.data?.data || [];
            const meta = res.data?.data?.meta || {};

            if (Array.isArray(quizData)) {
                setQuizzes(quizData);
                setPage(meta.page || 0);
                setTotalPages(meta.pages || 0);
            } else {
                setQuizzes([]);
            }
        } catch (e) {
            console.error("Fetch quizzes error:", e);
            setError("Không tải được danh sách quiz.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleFetchQuiz(0);
    }, []);
    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <Sidebar />
            </div>

            {/* Main Content có gradient */}
            <div className="flex-1 p-6 bg-gradient-to-r from-purple-200 to-pink-200">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold">Danh sách đề thi</h1>
                    <div className="flex items-center gap-4">
                        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
                            Báo lỗi
                        </button>
                        <button
                            onClick={() => navigate("/quiz/create/info")}
                            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
                        >
                            Tạo đề thi
                        </button>
                    </div>
                </div>

                {/* Search & Filter */}
                <div className="flex gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Nhập từ khóa tìm kiếm..."
                        className="border border-gray-300 p-2 rounded w-full max-w-md"
                    />
                    <button className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 rounded px-4 py-2 flex items-center gap-2">
                        <Filter className="w-4 h-4" /> Bộ lọc
                    </button>
                </div>

                {/* Danh sách quiz */}
                {loading && <p>Đang tải danh sách đề thi...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && quizzes.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quizzes.map((quiz) => (
                            <QuizCard key={quiz.id} quiz={quiz} />
                        ))}
                    </div>
                )}
                {!loading && !error && quizzes.length === 0 && (
                    <p className="text-gray-500">Không có đề thi nào.</p>
                )}

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        disabled={page === 0}
                        onClick={() => handleFetchQuiz(page - 1)}
                        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    >
                        ⬅️ Trước
                    </button>

                    <span>
                        Trang {page + 1} / {totalPages}
                    </span>

                    <button
                        disabled={page + 1 >= totalPages}
                        onClick={() => handleFetchQuiz(page + 1)}
                        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    >
                        Sau ➡️
                    </button>
                </div>
            </div>
        </div>
    );

};

export default TeacherDashboard;
