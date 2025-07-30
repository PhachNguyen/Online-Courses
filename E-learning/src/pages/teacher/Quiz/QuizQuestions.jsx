import React, { useState, useEffect } from "react";
import QuizStepper from "./QuizStepper";
import RichTextEditor from "../../../components/RichTextEditor";
import QuizSidebar from "../../../components/QuizSidebar";

function validateQuestion({ questionType, questionContent, answers }) {
    if (!questionContent.trim()) return "Vui lòng nhập nội dung câu hỏi.";
    if (questionType === "MULTIPLE_CHOICE" && answers.filter(a => a.content.trim()).length < 2)
        return "Cần ít nhất 2 đáp án cho câu hỏi trắc nghiệm.";
    if (questionType === "MULTIPLE_CHOICE" && !answers.some(a => a.isCorrect))
        return "Chọn đáp án đúng cho câu hỏi trắc nghiệm.";
    if (questionType === "FILL_IN_THE_BLANK" && !answers[0]?.content.trim())
        return "Nhập đáp án đúng cho câu hỏi điền vào chỗ trống.";
    if (questionType === "TRUE_FALSE" && answers.length === 0)
        return "Chọn đáp án đúng cho câu hỏi đúng/sai.";
    return null;
}

const QUESTION_TYPE_OPTIONS = [
    { value: "MULTIPLE_CHOICE", label: "Trắc nghiệm nhiều lựa chọn" },
    { value: "TRUE_FALSE", label: "Đúng/Sai" },
    { value: "FILL_IN_THE_BLANK", label: "Điền vào chỗ trống" }
];

export default function QuizQuestions() {
    const [questionType, setQuestionType] = useState("MULTIPLE_CHOICE");
    const [questionContent, setQuestionContent] = useState("");
    const [learningTopic, setLearningTopic] = useState("");
    const [answers, setAnswers] = useState([{ id: 1, content: "", isCorrect: true }]);
    const [explanation, setExplanation] = useState("");
    const [blankExplanation, setBlankExplanation] = useState("");
    const [currentSection, setCurrentSection] = useState("Phần 1");
    const [sections, setSections] = useState(["Phần 1"]);
    const [questions, setQuestions] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleAddSection() {
        const nextNumber = sections.length + 1;
        const newSection = `Phần ${nextNumber}`;
        setSections([...sections, newSection]);
    }

    function handleAddQuestion() {
        resetForm();
        setIsEditing(true);
    }

    function resetForm() {
        setQuestionType("MULTIPLE_CHOICE");
        setQuestionContent("");
        setLearningTopic("");
        setAnswers([{ id: 1, content: "", isCorrect: true }]);
        setExplanation("");
        setBlankExplanation("");
        setIsEditing(false);
        setEditIndex(null);
        setError("");
        setSuccess("");
    }

    function handleSaveQuestion() {
        setError("");
        setSuccess("");
        const err = validateQuestion({ questionType, questionContent, answers });
        if (err) {
            setError(err);
            return;
        }
        const newQuestion = {
            id: editIndex !== null ? questions[editIndex].id : questions.length + 1,
            type: questionType,
            content: questionContent,
            learningTopic,
            answers,
            section: currentSection,
            explanation: questionType === "FILL_IN_THE_BLANK" ? blankExplanation : explanation
        };
        let updatedQuestions;
        if (editIndex !== null) {
            updatedQuestions = [...questions];
            updatedQuestions[editIndex] = newQuestion;
            setSuccess("Cập nhật câu hỏi thành công!");
        } else {
            updatedQuestions = [...questions, newQuestion];
            setSuccess("Thêm câu hỏi thành công!");
        }
        setQuestions(updatedQuestions);
        resetForm();
    }

    function handleEditQuestion(idx) {
        const q = questions[idx];
        setQuestionType(q.type);
        setQuestionContent(q.content);
        setLearningTopic(q.learningTopic);
        setAnswers(q.answers);
        setExplanation(q.explanation || "");
        setBlankExplanation(q.explanation || "");
        setIsEditing(true);
        setEditIndex(idx);
        setCurrentSection(q.section);
        setError("");
        setSuccess("");
    }

    function handleDeleteQuestion(idx) {
        if (!window.confirm("Bạn chắc chắn muốn xóa câu hỏi này?")) return;
        setQuestions(questions.filter((_, i) => i !== idx));
        resetForm();
    }

    return (
        <div className="flex gap-8">
            <div className="w-1/4">
                <h2 className="text-xl font-bold mb-4">Danh sách phần thi</h2>
                <div className="space-y-2">
                    {sections.map(section => (
                        <div
                            key={section}
                            onClick={() => setCurrentSection(section)}
                            className={`flex items-center justify-between cursor-pointer px-4 py-2 rounded-lg transition 
                                ${currentSection === section ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-gray-100 text-gray-700"}`}
                        >
                            <span>{section}</span>
                            <span className="text-sm text-gray-500">
                                ({questions.filter(q => q.section === section).length} câu hỏi)
                            </span>
                        </div>
                    ))}
                    <button
                        className="text-blue-500 hover:text-blue-700 text-sm font-medium mt-2"
                        onClick={handleAddSection}
                    >
                        + Thêm phần thi
                    </button>
                </div>

                <h3 className="mt-6 font-semibold">Câu hỏi trong phần: {currentSection}</h3>
                <ul className="space-y-2 mt-2">
                    {questions.filter(q => q.section === currentSection).map((q, idx) => (
                        <li key={q.id} className="flex justify-between items-center border p-2 rounded-lg">
                            <span className="truncate max-w-[150px]">{q.content.slice(0, 30)}...</span>
                            <div className="flex gap-2">
                                <button onClick={() => handleEditQuestion(questions.findIndex(qq => qq.id === q.id))} className="text-blue-500 hover:underline">Sửa</button>
                                <button onClick={() => handleDeleteQuestion(questions.findIndex(qq => qq.id === q.id))} className="text-red-500 hover:underline">Xóa</button>
                            </div>
                        </li>
                    ))}
                </ul>

                <button onClick={handleAddQuestion} className="mt-4 block text-sm text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg">
                    + Thêm câu hỏi
                </button>
            </div>

            {/* Main form area */}
            <div className="flex-1 p-4 bg-white rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-4">Soạn câu hỏi</h3>

                {error && <div className="text-red-500 mb-2">{error}</div>}
                {success && <div className="text-green-500 mb-2">{success}</div>}

                <label className="block font-medium mb-1">Loại câu hỏi</label>
                <select
                    value={questionType}
                    onChange={e => setQuestionType(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                >
                    {QUESTION_TYPE_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>

                <label className="block font-medium mb-1">Nội dung câu hỏi</label>
                <RichTextEditor value={questionContent} onChange={setQuestionContent} />

                <label className="block font-medium mt-4 mb-1">Chủ đề học tập</label>
                <input
                    type="text"
                    value={learningTopic}
                    onChange={e => setLearningTopic(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="VD: Đại số, Hóa học,..."
                />

                <div className="mt-4">
                    <label className="block font-medium mb-2">Câu trả lời</label>
                    {questionType === "MULTIPLE_CHOICE" && (
                        <>
                            {answers.map((answer, index) => (
                                <div key={answer.id} className="flex items-center gap-2 mb-2">
                                    <input
                                        type="radio"
                                        name="correct"
                                        checked={answer.isCorrect}
                                        onChange={() => setAnswers(answers.map(a => ({ ...a, isCorrect: a.id === answer.id })))}
                                    />
                                    <input
                                        type="text"
                                        value={answer.content}
                                        onChange={e => setAnswers(answers.map(a => a.id === answer.id ? { ...a, content: e.target.value } : a))}
                                        className="flex-1 p-2 border rounded"
                                        placeholder={`Đáp án ${index + 1}`}
                                    />
                                    {answers.length > 1 && (
                                        <button onClick={() => setAnswers(answers.filter(a => a.id !== answer.id))} className="text-red-500">X</button>
                                    )}
                                </div>
                            ))}
                            <button onClick={() => setAnswers([...answers, { id: answers.length + 1, content: "", isCorrect: false }])} className="text-blue-500 mt-2">+ Thêm đáp án</button>
                        </>
                    )}

                    {questionType === "TRUE_FALSE" && (
                        <div className="flex gap-4">
                            {[{ label: "Đúng", value: true }, { label: "Sai", value: false }].map(opt => (
                                <label key={opt.label} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="truefalse"
                                        checked={answers[0]?.isCorrect === opt.value}
                                        onChange={() => setAnswers([{ id: 1, content: opt.label, isCorrect: opt.value }])}
                                    />
                                    {opt.label}
                                </label>
                            ))}
                        </div>
                    )}

                    {questionType === "FILL_IN_THE_BLANK" && (
                        <input
                            type="text"
                            value={answers[0]?.content || ""}
                            onChange={e => setAnswers([{ id: 1, content: e.target.value, isCorrect: true }])}
                            className="w-full p-2 border rounded"
                            placeholder="Đáp án đúng"
                        />
                    )}
                </div>

                <div className="mt-4">
                    <label className="block font-medium mb-1">Giải thích đáp án (nếu có)</label>
                    <RichTextEditor value={questionType === "FILL_IN_THE_BLANK" ? blankExplanation : explanation} onChange={questionType === "FILL_IN_THE_BLANK" ? setBlankExplanation : setExplanation} />
                </div>

                <div className="mt-6 flex gap-4">
                    <button onClick={handleSaveQuestion} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        {editIndex !== null ? "Cập nhật" : "Lưu"}
                    </button>
                    <button onClick={resetForm} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
                        Đặt lại
                    </button>
                </div>
            </div>
        </div>
    );
}
