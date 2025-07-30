import React from "react";
import QuizStepper from "./QuizStepper";

const QuizAdvanced = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-white px-8 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold m-0">Cài đặt nâng cao</h2>
            </div>
            <QuizStepper />
            <div className="p-8">
                <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500 text-lg">
                    <p>Chức năng cài đặt nâng cao sẽ được bổ sung tại đây.</p>
                </div>
            </div>
        </div>
    );
};

export default QuizAdvanced; 