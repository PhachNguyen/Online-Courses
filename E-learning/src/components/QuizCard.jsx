import React from "react";
import { Eye, Settings, Share2, PlusCircle, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuizCard = ({ quiz }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-200 group">
            {/* Render ảnh quiz */}
            <div className="relative">
                <img
                    src={
                        quiz.logo
                            ? `http://localhost:8080/storage/quiz/${quiz.logo}`
                            : "https://via.placeholder.com/400x150.png?text=Quiz+Image"
                    }
                    alt={quiz.title || "Quiz"}
                    className="w-full h-40 object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-200"
                />
            </div>

            {/* Nội dung quiz */}
            <div className="p-5">
                <div className="font-bold text-lg mb-1 truncate text-purple-700 group-hover:text-purple-900 transition">
                    {quiz.title || "Chưa có tiêu đề"}
                </div>
                <div className="text-xs text-gray-400 mb-2">
                    {quiz.createAt
                        ? new Date(quiz.createAt).toLocaleDateString()
                        : "Không rõ ngày"}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span title="Số câu hỏi">📝 {quiz.totalQuestions || 0}</span>
                    <span title="Người tạo">👨‍🎓 {quiz.createBy || "Ẩn danh"}</span>
                    <span title="Lượt xem">📈 {quiz.views || 0}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600 text-sm mt-2">
                    <div className="flex gap-3">
                        <Eye className="w-4 h-4 cursor-pointer hover:text-blue-500" title="Xem" />
                        <Settings className="w-4 h-4 cursor-pointer hover:text-blue-500" title="Cài đặt" />
                        <Share2 className="w-4 h-4 cursor-pointer hover:text-blue-500" title="Chia sẻ" />
                        <PlusCircle className="w-4 h-4 cursor-pointer hover:text-blue-500" title="Thêm" />
                        <Trash2 className="w-4 h-4 cursor-pointer hover:text-red-500" title="Xóa" />
                    </div>
                    <button
                        onClick={() => navigate(`/quiz/${quiz.id}`)}
                        className="bg-purple-500 hover:bg-purple-600 text-white text-xs px-4 py-1.5 rounded-full font-semibold shadow-sm transition"
                    >
                        Vào ôn thi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizCard;
