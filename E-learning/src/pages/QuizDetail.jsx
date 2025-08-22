import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../config/AxiosConfig";
import ResultPopup from "../components/ResultPopup";
import { Timer, Layers } from "lucide-react";

const QuizStart = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(null);
    const [autoNext, setAutoNext] = useState(0);

    const [sections, setSections] = useState([]);
    const [activeSection, setActiveSection] = useState(null);

    // Kết quả
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    // Fetch quiz
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const res = await api.get(`/quizzes/${id}`);
                const data = res.data.data;
                setQuiz(data);
                setQuestions(data.questions || []);

                // sections theo level
                const uniqueSections = [...new Set((data.questions || []).map((q) => q.level))];
                setSections(uniqueSections);
                setActiveSection(uniqueSections[0]); // mặc định section đầu tiên

                const duration = data.duration && data.duration > 0 ? data.duration : 10;
                setTimeLeft(duration * 60);
            } catch (err) {
                console.error("Lỗi fetch quiz:", err);
            }
        };
        fetchQuiz();
    }, [id]);

    // Countdown
    useEffect(() => {
        if (timeLeft === null) return;
        if (timeLeft === 0) {
            handleSubmit();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (t) => {
        const h = Math.floor(t / 3600);
        const m = Math.floor((t % 3600) / 60);
        const s = t % 60;
        return `${h}:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
    };

    // Auto next
    useEffect(() => {
        if (!autoNext) return;
        const timer = setTimeout(() => {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        }, autoNext);
        return () => clearTimeout(timer);
    }, [currentIndex, autoNext, questions.length]);

    // Chọn đáp án
    const handleAnswerSelect = (questionId, answerId) => {
        setSelectedAnswers({ ...selectedAnswers, [questionId]: answerId });
    };

    // Nộp bài
    const handleSubmit = () => {
        let correct = 0;
        questions.forEach((q) => {
            const selected = selectedAnswers[q.id];
            const correctAns = q.answers.find((a) => a.correct);
            if (selected && correctAns && selected === correctAns.id) {
                correct++;
            }
        });
        setScore(correct);
        setShowResult(true);
    };

    if (!quiz) return <p className="p-6 text-center"> Đang tải quiz...</p>;

    // Lọc câu hỏi theo section
    const filteredQuestions = questions.filter((q) => q.level === activeSection);

    return (
        <div className="p-6 grid grid-cols-4 gap-6 bg-gray-100 min-h-screen relative">
            {/* Sidebar trái */}
            <div className="col-span-1 space-y-6 border-8">
                <div className="border rounded-xl p-5 shadow bg-white">
                    <h2 className="font-bold text-xl text-gray-800">{quiz.title}</h2>
                    <p className="text-sm text-gray-600 italic">{quiz.description}</p>
                    <hr className="my-3" />

                    {/* Timer */}
                    <div className="flex items-center">
                        <Timer className="w-5 h-5" />
                        <span className="text-start px-2">Thời gian:</span>
                        <span className="px-4 py-1 rounded-full bg-red-100 text-red-600 font-mono font-bold">
                            {timeLeft !== null ? formatTime(timeLeft) : "--:--"}
                        </span>
                    </div>

                    {/* Auto next */}
                    <div className="mt-4">
                        <label className="text-sm font-medium"> Tự động chuyển câu</label>
                        <select
                            className="border rounded p-2 w-full mt-1 text-sm"
                            value={autoNext}
                            onChange={(e) => setAutoNext(Number(e.target.value))}
                        >
                            <option value={0}>Tắt</option>
                            <option value={2000}>2s</option>
                            <option value={5000}>5s</option>
                            <option value={10000}>10s</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="mt-5 flex flex-col gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
                        >
                            Trở về
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                        >
                            Nộp bài
                        </button>
                    </div>
                </div>

                {/* Danh sách phần thi */}
                <div className="border rounded-xl p-5 shadow bg-white">
                    <h3 className="font-semibold mb-3 text-gray-700 flex items-center gap-2">
                        <Layers className="w-4 h-4" /> Các phần thi
                    </h3>
                    <ul className="space-y-2">
                        {sections.map((sec, idx) => {
                            const count = questions.filter((q) => q.level === sec).length;
                            return (
                                <li
                                    key={idx}
                                    onClick={() => {
                                        setActiveSection(sec);
                                        const qIndex = questions.findIndex((q) => q.level === sec);
                                        if (qIndex !== -1) setCurrentIndex(qIndex);
                                    }}
                                    className={`px-3 py-2 rounded-md cursor-pointer flex justify-between ${activeSection === sec
                                        ? "bg-blue-100 font-semibold"
                                        : "bg-gray-100 hover:bg-gray-200"
                                        }`}
                                >
                                    <span>{sec}</span>
                                    <span className="text-xs text-gray-500">{count} câu</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {/* Trung tâm */}
            <div className="col-span-2">
                <div className="border rounded-xl p-6 shadow bg-white">
                    <h2 className="font-bold mb-3 text-lg text-gray-800">
                        Câu {currentIndex + 1} / {questions.length}
                    </h2>
                    <p className="mb-5 text-gray-700 font-medium">
                        {questions[currentIndex]?.content}
                    </p>

                    <div className="space-y-3">
                        {questions[currentIndex]?.answers.map((a) => (
                            <label
                                key={a.id}
                                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${selectedAnswers[questions[currentIndex].id] === a.id
                                    ? "bg-blue-50 border-blue-400"
                                    : "hover:bg-gray-50"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name={`q-${questions[currentIndex].id}`}
                                    value={a.id}
                                    checked={selectedAnswers[questions[currentIndex].id] === a.id}
                                    onChange={() =>
                                        handleAnswerSelect(questions[currentIndex].id, a.id)
                                    }
                                    className="accent-blue-500"
                                />
                                {a.content}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sidebar phải */}
            <div className="col-span-1">
                <div className="border rounded-xl p-5 shadow bg-white">
                    <h3 className="font-semibold mb-3 text-gray-700">Mục lục câu hỏi</h3>
                    <div className="grid grid-cols-5 gap-2">
                        {filteredQuestions.map((q, idx) => {
                            const globalIndex = questions.findIndex((qq) => qq.id === q.id);
                            return (
                                <button
                                    key={q.id}
                                    onClick={() => setCurrentIndex(globalIndex)}
                                    className={`w-10 h-10 flex items-center justify-center rounded-full border transition font-medium ${globalIndex === currentIndex
                                        ? "bg-blue-500 text-white"
                                        : selectedAnswers[q.id]
                                            ? "bg-green-400 text-white"
                                            : "bg-gray-100 hover:bg-gray-200"
                                        }`}
                                >
                                    {idx + 1}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Popup kết quả */}
            {showResult && (
                <ResultPopup
                    score={score}
                    total={questions.length}
                    onRetry={() => window.location.reload()}
                    onExit={() => navigate(-1)}
                />
            )}
        </div>
    );
};

export default QuizStart;
