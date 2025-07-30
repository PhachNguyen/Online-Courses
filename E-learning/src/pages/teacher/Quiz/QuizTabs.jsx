import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const tabs = [
    { label: "Thông tin cơ bản", path: "/quiz/create/info" },
    { label: "Soạn câu hỏi", path: "/quiz/create/questions" },
    { label: "Cài đặt nâng cao", path: "/quiz/create/advanced" },
    { label: "Lịch sử truy cập", path: "/quiz/create/history" },
    { label: "Thống kê", path: "/quiz/create/statistics" },
];

const QuizTabs = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="flex gap-8 py-4 bg-white px-8 border-b border-gray-200">
            {tabs.map(tab => (
                <button
                    key={tab.path}
                    onClick={() => navigate(tab.path)}
                    className={
                        "font-semibold pb-2 border-b-2 transition bg-transparent " +
                        (location.pathname === tab.path
                            ? "text-blue-600 border-blue-600"
                            : "text-gray-400 border-transparent hover:text-blue-500")
                    }
                    style={{ background: "none" }}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default QuizTabs; 