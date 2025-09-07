import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter } from "lucide-react";
import api from "../../config/AxiosConfig";
import QuizCard from "../../components/QuizCard";
import Sidebar from "../../components/SidebarTeacher";

const Course = () => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        handleFetchQuiz(0);
        // Nếu handleFetchQuiz không đổi, có thể bỏ qua warning này vì function không phụ thuộc props/state ngoài scope
    }, []);
    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <Sidebar />
            </div>

            {/* Main Content đổi màu nền */}
            <div className="flex-1 p-6 bg-blue-100">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold">Danh sách đề thi</h1>
                    <div className="flex items-center gap-4">
                        {/* Báo lỗi button with icon and shadow */}
                        <button
                            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                            </svg>
                            Báo lỗi
                        </button>
                        {/* Tạo đề thi button with icon and shadow */}
                        <button
                            onClick={() => navigate("/quiz/create/info")}
                            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
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
                {/* Loading state */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
                        <p className="text-lg text-gray-600 font-semibold">Đang tải danh sách đề thi...</p>
                    </div>
                )}
                {/* Error state */}
                {error && (
                    <div className="flex flex-col items-center justify-center py-16">
                        <p className="text-red-500 text-lg font-semibold">{error}</p>
                    </div>
                )}
                {/* Quiz grid */}
                {!loading && !error && quizzes.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {quizzes.map((quiz) => (
                            <QuizCard key={quiz.id} quiz={quiz} />
                        ))}
                    </div>
                )}
                {/* Empty state */}
                {!loading && !error && quizzes.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16">
                        <img src="/vite.svg" alt="empty" className="w-24 h-24 opacity-60 mb-4" />
                        <p className="text-gray-500 text-lg">Không có đề thi nào.</p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex flex-wrap justify-center items-center gap-2 mt-8 select-none">
                        <button
                            disabled={page === 0}
                            onClick={() => handleFetchQuiz(page - 1)}
                            className="px-3 py-1 rounded-full bg-white border border-gray-300 shadow-sm hover:bg-purple-100 transition disabled:opacity-50"
                        >
                            ⬅️ Trước
                        </button>
                        {/* Số trang */}
                        {Array.from({ length: totalPages }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleFetchQuiz(idx)}
                                className={`w-9 h-9 rounded-full mx-1 font-semibold border transition
                                    ${page === idx
                                        ? "bg-purple-500 text-white border-purple-500 shadow"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-purple-100"}
                                `}
                                disabled={page === idx}
                            >
                                {idx + 1}
                            </button>
                        ))}
                        <button
                            disabled={page + 1 >= totalPages}
                            onClick={() => handleFetchQuiz(page + 1)}
                            className="px-3 py-1 rounded-full bg-white border border-gray-300 shadow-sm hover:bg-purple-100 transition disabled:opacity-50"
                        >
                            Sau ➡️
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

};

export default Course;
