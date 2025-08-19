import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, PlusCircle, Trash2, Settings, Share2, Eye, UserRound, GraduationCap } from "lucide-react";
import api from "../../config/AxiosConfig"

const TeacherDashboard = () => {
    const navigate = useNavigate();

    const [quizzes, setQuizzes] = useState([]); //  Array Quizzes
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(3); // Số lượng mỗi record trong 1 page
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handle Fetch Quiz
    const handleFetchQuiz = async (newPage) => {
        try {
            setLoading(true);
            const res = await api.get(`/quizzes?page=${newPage}&size=${size}`);
            if (Array.isArray(res.data.data)) {

                setQuizzes(res.data.data);
                setPage(res.data.meta.page); // Trang hiện tại
                setSize(res.data.meta.pageSize);
                setTotalPages(res.data.meta.pages) // Tổng số trang
                // console.log("Data Quizzes là : ", res.data.data)
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
        <div className="min-h-screen bg-[#f5f6fa] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-6 border-r">
                <h2 className="text-2xl font-bold text-purple-600 mb-8">EduQuiz Studio</h2>
                <nav className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase">
                        <UserRound className="w-6 h-6" />
                        Cá nhân
                    </div>
                    <ul className="space-y-3 px-4 text-sm ">
                        <li className="text-gray-700 hover:text-purple-600 cursor-pointer">Khám phá đề thi</li>
                        <li className="text-gray-700 hover:text-purple-600 cursor-pointer">Thư viện của tôi</li>
                        <li className="text-gray-700 hover:text-purple-600 cursor-pointer">Truy cập gần đây</li>
                        <li className="text-gray-700 hover:text-purple-600 cursor-pointer">Đề thi yêu thích</li>
                        <li className="text-gray-700 hover:text-purple-600 cursor-pointer">Kết quả của tôi</li>
                        <li className="text-gray-700 hover:text-purple-600 cursor-pointer">BXH thi đua</li>
                    </ul>

                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase">
                        <GraduationCap className="w-6 h-6" />
                        Quản lý
                    </div>
                    <ul className="space-y-3 text-sm px-4">
                        <li className="text-purple-600 font-semibold cursor-pointer">Đề thi</li>
                        <li className="text-gray-700 hover:text-purple-600 cursor-pointer">Chuyên mục</li>
                        <li className="text-gray-700 hover:text-purple-600 cursor-pointer">Gói dịch vụ</li>
                        <li className="text-gray-700 hover:text-purple-600 cursor-pointer">Cài đặt</li>
                    </ul>

                    <div className="mt-6 text-sm font-semibold text-gray-500 uppercase">Khác</div>
                    <ul className="space-y-2 text-sm">
                        <li className="text-gray-700 hover:text-purple-600 cursor-pointer">Hướng dẫn sử dụng</li>
                        <li className="text-gray-700 hover:text-purple-600 cursor-pointer">Điều khoản & chính sách</li>
                        <li className="text-gray-700 hover:text-purple-600 cursor-pointer">Hỗ trợ khách hàng</li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold">Danh sách đề thi</h1>
                    <div className="flex items-center gap-4">
                        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">Báo lỗi</button>
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

                {/* List */}
                {/*  Đang load */}
                {loading && <p>Đang tải danh sách đề thi...</p>}
                {/*  Error k load được page  */}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quizzes.map((quiz) => (
                            <div key={quiz.id} className="bg-white rounded-lg shadow overflow-hidden">
                                {/*  Fixes */}
                                <img
                                    src={quiz.imageUrl || "https://via.placeholder.com/400x150.png?text=Quiz+Image"}
                                    alt="Quiz"
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <div className="font-semibold text-lg">{quiz.title || "Chưa có tiêu đề"}</div>
                                    <div className="text-sm text-gray-500 mb-2">
                                        {/*  Convert sang chuỗi  */}
                                        {quiz.createAt ? new Date(quiz.createAt).toLocaleDateString() : "Không rõ ngày"}
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                        <span>📝 {quiz.totalQuestions || 0}</span>
                                        <span>👨‍🎓 {quiz.createBy || 0}</span>
                                        <span>📈 {quiz.views || 0}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-600 text-sm">
                                        <div className="flex gap-3">
                                            <Eye className="w-4 h-4 cursor-pointer hover:text-blue-500" />
                                            <Settings className="w-4 h-4 cursor-pointer hover:text-blue-500" />
                                            <Share2 className="w-4 h-4 cursor-pointer hover:text-blue-500" />
                                            <PlusCircle className="w-4 h-4 cursor-pointer hover:text-blue-500" />
                                            <Trash2 className="w-4 h-4 cursor-pointer hover:text-red-500" />
                                        </div>
                                        <button
                                            onClick={() => navigate(`/quiz/${quiz.id}`)}
                                            className="bg-purple-500 hover:bg-purple-600 text-white text-sm px-3 py-1 rounded"
                                        >
                                            Vào ôn thi
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        disabled={page === 0}
                        onClick={() => {
                            // alert("Trang muốn load: " + (page - 1));
                            handleFetchQuiz(page - 1)
                        }}
                        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    >
                        ⬅️ Trước
                    </button>

                    <span>Trang {page + 1} / {totalPages}</span>

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
