import React from "react";
import { Eye, Settings, Share2, PlusCircle, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuizCard = ({ quiz }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Render ảnh quiz */}
            <div className="relative group">
                <img
                    src={
                        quiz.logo
                            ? `http://localhost:8080/storage/quiz/${quiz.logo}`
                            : "https://via.placeholder.com/400x150.png?text=Quiz+Image"
                    }
                    alt={quiz.title || "Quiz"}
                    className="w-full h-40 object-cover transition group-hover:opacity-90"
                />
            </div>

            {/* Nội dung quiz */}
            <div className="p-4">
                <div className="font-semibold text-lg">
                    {quiz.title || "Chưa có tiêu đề"}
                </div>
                <div className="text-sm text-gray-500 mb-2">
                    {quiz.createAt
                        ? new Date(quiz.createAt).toLocaleDateString()
                        : "Không rõ ngày"}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span>📝 {quiz.totalQuestions || 0}</span>
                    <span>👨‍🎓 {quiz.createBy || "Ẩn danh"}</span>
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
    );
};

export default QuizCard;
