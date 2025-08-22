import React from "react";

const ResultPopup = ({ score, total, onRetry, onExit }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="max-w-lg w-full border rounded-xl shadow bg-white p-6 text-center">
                <h2 className="text-2xl font-bold mb-4">🎉 Kết quả bài thi</h2>

                <p className="text-lg mb-2">
                    Số câu đúng:{" "}
                    <span className="font-bold text-green-600">{score}</span> / {total}
                </p>

                <p className="text-lg mb-4">
                    Điểm số:{" "}
                    <span className="font-bold text-blue-600">
                        {((score / total) * 100).toFixed(2)}%
                    </span>
                </p>

                <div className="flex gap-4 justify-center mt-4">
                    <button
                        onClick={onRetry}
                        className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                    >
                        🔄 Làm lại
                    </button>
                    <button
                        onClick={onExit}
                        className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                    >
                        ⬅️ Thoát
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultPopup;
