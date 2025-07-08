import React, { useState } from "react";
import api from "../../config/AxiosConfig";

export default function TeacherDashboard() {
    const [showForm, setShowForm] = useState(false);
    const [quizzes, setQuizzes] = useState([]);
    const [quizTitle, setQuizTitle] = useState("");
    const [quizDesc, setQuizDesc] = useState("");
    const [quizDuration, setQuizDuration] = useState(30);
    const [questions, setQuestions] = useState([
        {
            content: "",
            type: "MULTIPLE_CHOICE",
            level: "EASY",
            answers: [
                { content: "", correct: false },
                { content: "", correct: false }
            ]
        }
    ]);
    const [quizError, setQuizError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    // Giả lập userId giáo viên (bạn có thể lấy từ auth thực tế)
    const teacherId = 1;

    // Thêm câu hỏi mới
    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            {
                content: "",
                type: "MULTIPLE_CHOICE",
                level: "EASY",
                answers: [
                    { content: "", correct: false },
                    { content: "", correct: false }
                ]
            }
        ]);
    };

    // Xóa câu hỏi
    const handleRemoveQuestion = (idx) => {
        setQuestions(questions.filter((_, i) => i !== idx));
    };

    // Thay đổi nội dung câu hỏi
    const handleQuestionChange = (idx, field, value) => {
        const updated = [...questions];
        updated[idx][field] = value;
        setQuestions(updated);
    };

    // Thêm đáp án cho câu hỏi
    const handleAddAnswer = (qIdx) => {
        const updated = [...questions];
        updated[qIdx].answers.push({ content: "", correct: false });
        setQuestions(updated);
    };

    // Xóa đáp án
    const handleRemoveAnswer = (qIdx, aIdx) => {
        const updated = [...questions];
        updated[qIdx].answers = updated[qIdx].answers.filter((_, i) => i !== aIdx);
        setQuestions(updated);
    };

    // Thay đổi nội dung đáp án
    const handleAnswerChange = (qIdx, aIdx, value) => {
        const updated = [...questions];
        updated[qIdx].answers[aIdx].content = value;
        setQuestions(updated);
    };

    // Chọn đáp án đúng
    const handleCorrectChange = (qIdx, aIdx) => {
        const updated = [...questions];
        updated[qIdx].answers = updated[qIdx].answers.map((ans, idx) => ({
            ...ans,
            correct: idx === aIdx
        }));
        setQuestions(updated);
    };

    // Validate dữ liệu quiz
    const validateQuiz = () => {
        if (!quizTitle.trim()) return "Tên quiz không được để trống.";
        if (questions.length === 0) return "Quiz phải có ít nhất 1 câu hỏi.";
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].content.trim()) return `Câu hỏi ${i + 1} không được để trống.`;
            if (questions[i].answers.length < 2) return `Câu hỏi ${i + 1} phải có ít nhất 2 đáp án.`;
            let hasCorrect = false;
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].content.trim()) return `Đáp án ${j + 1} của câu hỏi ${i + 1} không được để trống.`;
                if (questions[i].answers[j].correct) hasCorrect = true;
            }
            if (!hasCorrect) return `Câu hỏi ${i + 1} phải có 1 đáp án đúng.`;
        }
        return null;
    };

    // Gửi quiz lên BE
    const handleCreateQuiz = async (e) => {
        e.preventDefault();
        setQuizError("");
        setSuccessMsg("");
        setErrorMsg("");
        const err = validateQuiz();
        if (err) {
            setQuizError(err);
            return;
        }
        setLoading(true);
        try {
            const body = {
                title: quizTitle,
                description: quizDesc,
                duration: quizDuration,
                createdByIdCreator: teacherId,
                questions: questions.map(q => ({
                    content: q.content,
                    type: q.type,
                    level: q.level,
                    answers: q.answers
                }))
            };
            const res = await api.post("/quizzes", body);
            setSuccessMsg("Tạo quiz thành công!");
            setQuizzes([...quizzes, { ...body, id: Date.now() }]);
            setShowForm(false);
            setQuizTitle("");
            setQuizDesc("");
            setQuizDuration(30);
            setQuestions([
                {
                    content: "",
                    type: "MULTIPLE_CHOICE",
                    level: "EASY",
                    answers: [
                        { content: "", correct: false },
                        { content: "", correct: false }
                    ]
                }
            ]);
        } catch (err) {
            setErrorMsg("Tạo quiz thất bại. Vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-pink-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-6 text-indigo-700">Dashboard Giáo viên</h1>
                <button
                    className="mb-6 px-6 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                    onClick={() => setShowForm(true)}
                >
                    + Tạo Quiz
                </button>
                {successMsg && <div className="mb-4 text-green-600 font-semibold">{successMsg}</div>}
                {errorMsg && <div className="mb-4 text-red-600 font-semibold">{errorMsg}</div>}
                {/* Form tạo quiz */}
                {showForm && (
                    <form onSubmit={handleCreateQuiz} className="mb-8 bg-gray-50 p-6 rounded shadow">
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Tên Quiz</label>
                            <input
                                type="text"
                                value={quizTitle}
                                onChange={e => setQuizTitle(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                                placeholder="Nhập tên quiz"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Mô tả</label>
                            <textarea
                                value={quizDesc}
                                onChange={e => setQuizDesc(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                                placeholder="Nhập mô tả quiz (không bắt buộc)"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Thời gian (phút)</label>
                            <input
                                type="number"
                                min={1}
                                value={quizDuration}
                                onChange={e => setQuizDuration(Number(e.target.value))}
                                className="w-32 px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Danh sách câu hỏi</label>
                            {questions.map((q, qIdx) => (
                                <div key={qIdx} className="mb-6 p-4 bg-white border rounded shadow-sm">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold">Câu hỏi {qIdx + 1}</span>
                                        {questions.length > 1 && (
                                            <button type="button" className="text-red-500" onClick={() => handleRemoveQuestion(qIdx)}>Xóa</button>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        value={q.content}
                                        onChange={e => handleQuestionChange(qIdx, "content", e.target.value)}
                                        className="w-full px-3 py-2 border rounded mb-2"
                                        placeholder="Nhập nội dung câu hỏi"
                                    />
                                    <div className="flex gap-4 mb-2">
                                        <select
                                            value={q.type}
                                            onChange={e => handleQuestionChange(qIdx, "type", e.target.value)}
                                            className="px-2 py-1 border rounded"
                                        >
                                            <option value="MULTIPLE_CHOICE">Trắc nghiệm</option>
                                            <option value="ESSAY">Tự luận</option>
                                        </select>
                                        <select
                                            value={q.level}
                                            onChange={e => handleQuestionChange(qIdx, "level", e.target.value)}
                                            className="px-2 py-1 border rounded"
                                        >
                                            <option value="EASY">Dễ</option>
                                            <option value="MEDIUM">Trung bình</option>
                                            <option value="HARD">Khó</option>
                                        </select>
                                    </div>
                                    <div>
                                        <span className="font-medium">Đáp án</span>
                                        {q.answers.map((a, aIdx) => (
                                            <div key={aIdx} className="flex items-center gap-2 mb-1">
                                                <input
                                                    type="text"
                                                    value={a.content}
                                                    onChange={e => handleAnswerChange(qIdx, aIdx, e.target.value)}
                                                    className="px-2 py-1 border rounded flex-1"
                                                    placeholder={`Đáp án ${aIdx + 1}`}
                                                />
                                                <input
                                                    type="radio"
                                                    name={`correct-${qIdx}`}
                                                    checked={a.correct}
                                                    onChange={() => handleCorrectChange(qIdx, aIdx)}
                                                />
                                                <span>Đúng</span>
                                                {q.answers.length > 2 && (
                                                    <button type="button" className="text-red-400" onClick={() => handleRemoveAnswer(qIdx, aIdx)}>Xóa</button>
                                                )}
                                            </div>
                                        ))}
                                        <button type="button" className="text-blue-500 mt-1" onClick={() => handleAddAnswer(qIdx)}>+ Thêm đáp án</button>
                                    </div>
                                </div>
                            ))}
                            <button type="button" className="text-blue-600 font-semibold" onClick={handleAddQuestion}>+ Thêm câu hỏi</button>
                        </div>
                        {quizError && <p className="text-red-500 text-sm mb-2">{quizError}</p>}
                        <div className="flex gap-3">
                            <button
                                // type="submit"
                                disabled={loading}
                                className="px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition disabled:opacity-50"
                            >
                                {loading ? "Đang lưu..." : "Lưu"}
                            </button>
                            <button
                                type="button"
                                className="px-5 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                                onClick={() => { setShowForm(false); setQuizError(""); }}
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                )}

                {/* Danh sách quiz */}
                <h2 className="text-xl font-semibold mb-3">Danh sách Quiz đã tạo</h2>
                {quizzes.length === 0 ? (
                    <p className="text-gray-500">Chưa có quiz nào.</p>
                ) : (
                    <ul className="space-y-3">
                        {quizzes.map(quiz => (
                            <li key={quiz.id} className="p-4 bg-indigo-50 rounded shadow flex flex-col">
                                <span className="font-bold text-indigo-700">{quiz.title}</span>
                                <span className="text-gray-700 text-sm">{quiz.description}</span>
                                <span className="text-gray-500 text-xs">Thời gian: {quiz.duration} phút</span>
                                <span className="text-gray-500 text-xs">Số câu hỏi: {quiz.questions.length}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
} 