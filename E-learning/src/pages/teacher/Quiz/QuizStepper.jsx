import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const steps = [
    { label: "Thông tin cơ bản", path: "/quiz/create/info" },
    { label: "Soạn câu hỏi", path: "/quiz/create/questions" },
    { label: "Cài đặt nâng cao", path: "/quiz/create/advanced" },
    { label: "Lịch sử truy cập", path: "/quiz/create/history" },
    { label: "Thống kê", path: "/quiz/create/statistics" },
];

const QuizStepper = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentStep = steps.findIndex(step => step.path === location.pathname);

    return (
        <div className="flex items-center justify-center py-6 bg-white px-8 border-b border-gray-200">
            {steps.map((step, idx) => (
                <React.Fragment key={step.path}>
                    <button
                        onClick={() => navigate(step.path)}
                        className={
                            "flex flex-col items-center focus:outline-none " +
                            (idx === currentStep
                                ? "text-blue-600 font-bold"
                                : idx < currentStep
                                    ? "text-green-600"
                                    : "text-gray-400")
                        }
                        disabled={false}
                    >
                        <div
                            className={
                                "w-8 h-8 flex items-center justify-center rounded-full border-2 mb-1 " +
                                (idx === currentStep
                                    ? "border-blue-600 bg-blue-50"
                                    : idx < currentStep
                                        ? "border-green-600 bg-green-50"
                                        : "border-gray-300 bg-gray-100")
                            }
                        >
                            {idx < currentStep ? (
                                <span className="text-green-600 font-bold">&#10003;</span>
                            ) : (
                                idx + 1
                            )}
                        </div>
                        <span className="text-xs text-center w-20 leading-tight">{step.label}</span>
                    </button>
                    {idx < steps.length - 1 && (
                        <div
                            className={
                                "flex-1 h-0.5 mx-2 " +
                                (idx < currentStep
                                    ? "bg-green-500"
                                    : idx === currentStep
                                        ? "bg-blue-500"
                                        : "bg-gray-300")
                            }
                            style={{ minWidth: 32 }}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default QuizStepper; 