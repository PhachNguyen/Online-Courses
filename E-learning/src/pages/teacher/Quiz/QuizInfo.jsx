import React, { useState } from "react";
import Select from "react-select";
import Quiz1 from "../../../assets/images/quiz/Quiz1.jpg";
import Quiz2 from "../../../assets/images/quiz/Quiz2.jpg";
import Quiz3 from "../../../assets/images/quiz/quiz3.jpg";
import api from "../../../config/AxiosConfig";
import { useNavigate } from "react-router-dom";

const sampleImages = [Quiz1, Quiz2, Quiz3];

const levelOptions = [
    { value: "Đại học", label: "Đại học" },
    { value: "Cao học", label: "Cao học" },
    { value: "Trung học phổ thông", label: "Trung học phổ thông" },
];

const schoolOptions = [
    { value: "Đại học Điện lực", label: "Đại học Điện lực" },
    { value: "Đại học Bách Khoa", label: "Đại học Bách Khoa" },
];

const majorOptions = [
    { value: "CNTT", label: "Công nghệ thông tin" },
    { value: "DIEN", label: "Điện" },
    { value: "KINH_TE", label: "Kinh tế" },
];

const subjectOptions = [
    { value: "TOAN", label: "Toán" },
    { value: "LY", label: "Lý" },
    { value: "HOA", label: "Hóa" },
];

const QuizInfo = () => {
    const navigate = useNavigate();
    const [quizName, setQuizName] = useState("");
    const [level, setLevel] = useState([]);
    const [school, setSchool] = useState([]);
    const [major, setMajor] = useState(null);
    const [subject, setSubject] = useState(null);
    const [description, setDescription] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedSample, setSelectedSample] = useState(null);
    const [duration, setDuration] = useState(60); // mặc định 60 phút
    const [isPublic, setIsPublic] = useState(false);
    const [usePassword, setUsePassword] = useState(false);

    const [touched, setTouched] = useState({
        quizName: false,
        level: false,
        school: false,
        subject: false,
        major: false,
    });

    // Validate errors
    const isQuizNameError = touched.quizName && !quizName;
    const isLevelError = touched.level && (!level || level.length === 0);
    const isSchoolError = touched.school && (!school || school.length === 0);
    const isMajorError = touched.major && !major;
    const isSubjectError = touched.subject && !subject;

    // Upload file ngay khi chọn
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "quiz");

        try {
            const res = await api.post("/file", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const fileName = res.data.data.fileName;
            const fileUrl = `http://localhost:8080/storage/quiz/${fileName}`;

            setSelectedImage(fileUrl);
            setImageUrl(fileUrl);
            setSelectedSample(null);
        } catch (err) {
            console.error("Upload error:", err);
        }
    };

    // Chọn sample (chỉ preview, upload khi bấm Tạo quiz)
    const handleSelectSample = (sampleUrl) => {
        setSelectedImage(sampleUrl);
        setSelectedSample(sampleUrl);
        setImageUrl(null);
    };

    // Tạo quiz
    const handleCreateQuiz = async () => {
        setTouched({
            quizName: true,
            level: true,
            school: true,
            subject: true,
            major: true,
        });

        if (
            !quizName ||
            !level.length ||
            !school.length ||
            !subject ||
            !major ||
            duration <= 0
        )
            return;

        let finalImageUrl = imageUrl;
        if (!finalImageUrl && selectedSample) {
            try {
                const response = await fetch(selectedSample);
                const blob = await response.blob();
                const file = new File([blob], "sample.jpg", { type: blob.type });

                const formData = new FormData();
                formData.append("file", file);
                formData.append("folder", "quiz");

                const res = await api.post("/file", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                const fileName = res.data.data.fileName;
                finalImageUrl = `http://localhost:8080/storage/quiz/${fileName}`;
            } catch (err) {
                console.error("Upload sample error:", err);
            }
        }

        // Chuyển array thành string
        const levelStr = level.map((l) => l.value).join(", ");
        const universityStr = school.map((s) => s.value).join(", ");

        const data = {
            title: quizName,
            level: levelStr,            // String
            university: universityStr,  // String
            majorName: major?.value || null,
            subject: subject?.value || null,
            duration,
            description,
            isPublic,
            usePassword,
            imageUrl: finalImageUrl,
        };

        try {
            const res = await api.post("/quizzes", data);
            const quizId = res.data.id;
            alert("Tạo đề thi thành công!");
            navigate(`/quiz/create/questions?quizId=${quizId}`);
        } catch (e) {
            console.log(e.response?.data);
            alert("Có lỗi xảy ra khi tạo đề thi!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 relative">
            {/* Tabs */}
            <div className="bg-white px-8 border-b border-gray-200">
                <div className="flex gap-8 py-4">
                    <div className="font-semibold text-blue-600 border-b-2 border-blue-600 pb-2">
                        Thông tin cơ bản
                    </div>
                    <div className="text-gray-400">Soạn câu hỏi</div>
                    <div className="text-gray-400">Cài đặt nâng cao</div>
                    <div className="text-gray-400">Lịch sử truy cập</div>
                    <div className="text-gray-400">Thống kê</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 px-8 py-8">
                {/* Ảnh đề thi */}
                <div className="col-span-12 md:col-span-3 bg-white rounded-lg shadow p-4">
                    <div className="font-semibold mb-4 text-lg">Ảnh đề thi</div>
                    <label className="flex items-center justify-center w-full h-40 border border-dashed border-gray-300 rounded-lg mb-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition overflow-hidden">
                        {selectedImage ? (
                            <img
                                src={selectedImage}
                                alt="Quiz"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <>
                                <span className="text-3xl mb-2">📄</span>
                                <span className="text-gray-500">Tải lên</span>
                            </>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                    </label>
                    <div className="text-sm text-gray-500 mb-2">
                        Tải ảnh lên hoặc chọn ảnh đề thi
                    </div>
                    <div className="flex gap-2 mb-1">
                        {sampleImages.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`sample${idx}`}
                                className={`w-14 h-10 object-cover rounded cursor-pointer border-2 ${selectedImage === img ? "border-blue-500" : "border-gray-200"
                                    }`}
                                onClick={() => handleSelectSample(img)}
                            />
                        ))}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Chọn ảnh đại diện</div>
                </div>

                {/* Thông tin cơ bản */}
                <div className="col-span-12 md:col-span-5 bg-white rounded-lg shadow p-6">
                    <div className="font-bold mb-6 text-2xl">Thông tin cơ bản</div>
                    {/* Tên đề thi */}
                    <div className="mb-5">
                        <label
                            className={`block font-medium mb-1 ${isQuizNameError ? "text-red-400" : ""
                                }`}
                        >
                            Tên đề thi <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={quizName}
                            onChange={(e) => setQuizName(e.target.value)}
                            onBlur={() => setTouched((t) => ({ ...t, quizName: true }))}
                            placeholder="Nhập tên đề thi"
                            className={`w-full p-2 rounded border ${isQuizNameError
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-300"
                                } focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none`}
                        />
                        {isQuizNameError && (
                            <div className="text-red-400 text-xs mt-1">
                                Trường này là bắt buộc.
                            </div>
                        )}
                    </div>

                    {/* Level & School */}
                    <div className="flex gap-4 mb-5">
                        <div className="flex-1">
                            <label className="block font-medium mb-1">
                                Trình độ <span className="text-red-500">*</span>
                            </label>
                            <Select
                                isMulti
                                options={levelOptions}
                                value={level}
                                onChange={setLevel}
                            />
                            {isLevelError && (
                                <div className="text-red-400 text-xs mt-1">
                                    Trường này là bắt buộc.
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="block font-medium mb-1">
                                Trường học <span className="text-red-500">*</span>
                            </label>
                            <Select
                                isMulti
                                options={schoolOptions}
                                value={school}
                                onChange={setSchool}
                            />
                            {isSchoolError && (
                                <div className="text-red-400 text-xs mt-1">
                                    Trường này là bắt buộc.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Major & Subject */}
                    <div className="flex gap-4 mb-5">
                        <div className="flex-1">
                            <label
                                className={`block font-medium mb-1 ${isMajorError ? "text-red-400" : ""
                                    }`}
                            >
                                Ngành học <span className="text-red-500">*</span>
                            </label>
                            <Select
                                options={majorOptions}
                                value={major}
                                onChange={setMajor}
                                isClearable
                            />
                            {isMajorError && (
                                <div className="text-red-400 text-xs mt-1">
                                    Trường này là bắt buộc.
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <label
                                className={`block font-medium mb-1 ${isSubjectError ? "text-red-400" : ""
                                    }`}
                            >
                                Môn học <span className="text-red-500">*</span>
                            </label>
                            <Select
                                options={subjectOptions}
                                value={subject}
                                onChange={setSubject}
                                isClearable
                            />
                            {isSubjectError && (
                                <div className="text-red-400 text-xs mt-1">
                                    Trường này là bắt buộc.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mô tả */}
                    <div>
                        <label className="block font-medium mb-1">Mô tả</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Mô tả bổ sung"
                            className="w-full p-2 rounded border border-gray-300"
                            rows={6}
                        />
                    </div>
                </div>

                {/* Cấu hình truy cập */}
                <div className="col-span-12 md:col-span-4 bg-white rounded-lg shadow p-6">
                    <div className="font-bold mb-4 text-xl">Cấu hình truy cập</div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">
                            Phạm vi chia sẻ <span className="text-red-500">*</span>
                        </label>
                        <select
                            className="w-full p-2 rounded border border-gray-300"
                            value={isPublic}
                            onChange={(e) => setIsPublic(e.target.value === "true")}
                        >
                            <option value="false">Riêng tư</option>
                            <option value="true">Công khai</option>
                        </select>
                    </div>

                    {/* Duration */}
                    <div className="mb-5">
                        <label className="block font-medium mb-1">
                            Thời gian làm bài (phút) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="range"
                            min={5}
                            max={180}
                            step={5}
                            value={duration}
                            onChange={(e) => setDuration(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="text-sm text-gray-600 mt-1">{duration} phút</div>
                    </div>

                    <div className="mb-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={usePassword}
                                onChange={(e) => setUsePassword(e.target.checked)}
                            />
                            <span>Sử dụng mật khẩu</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Button */}
            <div className="absolute bottom-10 right-20">
                <button
                    className="bg-purple-500 hover:bg-purple-600 text-white rounded px-6 py-3 font-semibold shadow transition"
                    onClick={handleCreateQuiz}
                >
                    Tạo đề thi
                </button>
            </div>
        </div>
    );
};

export default QuizInfo;
