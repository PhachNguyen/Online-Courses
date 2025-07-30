import React, { useState } from 'react';

const QuizSidebar = ({
    currentSection,
    onSectionChange,
    onAddSection,
    onAddQuestion,
    onAddQuestionByText,
    questions = []
}) => {
    const [sections] = useState([
        { id: 1, name: "Phần 1", questions: [] },
        { id: 2, name: "Phần 2", questions: [] },
        { id: 3, name: "Phần 3", questions: [] }
    ]);

    return (
        <div className="w-80 bg-white rounded-lg shadow p-6">
            {/* Exam Sections */}
            <div className="mb-6">
                <h3 className="font-semibold mb-3">Danh sách phần thi</h3>
                <div className="space-y-2">
                    {sections.map((section) => (
                        <div key={section.id} className="flex items-center gap-2">
                            <button
                                onClick={() => onSectionChange(section.name)}
                                className={`px-3 py-1 rounded-full text-sm transition ${currentSection === section.name
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {section.name}
                            </button>
                            <button className="text-gray-500 hover:text-gray-700">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    onClick={onAddSection}
                    className="text-blue-500 text-sm font-medium mt-2 hover:text-blue-700"
                >
                    Thêm mới
                </button>
            </div>

            {/* Question Categories */}
            <div>
                <h3 className="font-semibold mb-3">Danh mục câu hỏi</h3>
                <div className="flex gap-2 mb-3">
                    <button
                        onClick={onAddQuestion}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
                    >
                        + Thêm câu hỏi
                    </button>
                    <button
                        onClick={onAddQuestionByText}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
                    >
                        Thêm bằng văn bản
                    </button>
                </div>

                {questions.length === 0 ? (
                    <div className="text-gray-500 text-sm text-center py-4">
                        Không tìm thấy câu hỏi nào!
                    </div>
                ) : (
                    <div className="space-y-2">
                        {questions.map((question, index) => (
                            <div key={index} className="p-2 bg-gray-50 rounded border">
                                <div className="text-sm font-medium">Câu hỏi {index + 1}</div>
                                <div className="text-xs text-gray-500 truncate">
                                    {question.content || 'Chưa có nội dung'}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizSidebar; 