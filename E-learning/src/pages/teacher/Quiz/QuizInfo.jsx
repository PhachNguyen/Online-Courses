import React, { useState } from "react";
import Select from "react-select";
import Quiz1 from "../../../assets/images/quiz/Quiz1.jpg";
import Quiz2 from "../../../assets/images/quiz/Quiz2.jpg";
import Quiz3 from "../../../assets/images/quiz/quiz3.jpg";
import api from "../../../config/AxiosConfig";

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
    { value: "Điện", label: "Điện" },
];

const subjectOptions = [
    { value: "Toán", label: "Toán" },
    { value: "Lý", label: "Lý" },
];

const skillOptions = [
    { value: "Tư duy", label: "Tư duy" },
    { value: "Giải quyết vấn đề", label: "Giải quyết vấn đề" },
];

const topicOptions = [
    { value: "Chủ đề 1", label: "Chủ đề 1" },
    { value: "Chủ đề 2", label: "Chủ đề 2" },
];

const QuizInfo = () => {
    const [quizName, setQuizName] = useState("");
    const [level, setLevel] = useState([]);
    const [school, setSchool] = useState([]);
    const [major, setMajor] = useState(null);
    const [subject, setSubject] = useState(null);
    const [skill, setSkill] = useState(null);
    const [topic, setTopic] = useState(null);
    const [description, setDescription] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    // const [shareScope, setShareScope] = useState("private");
    const [isPublic, setIsPublic] = useState(false);
    const [usePassword, setUsePassword] = useState(false);
    const [classShare, setClassShare] = useState("");
    const [emailShare, setEmailShare] = useState("");
    const [touched, setTouched] = useState({
        quizName: false,
        level: false,
        school: false,
    });
    const isQuizNameError = touched.quizName && !quizName;
    const isLevelError = touched.level && (!level || level.length === 0);
    const isSchoolError = touched.school && (!school || school.length === 0);

    // API tạo quiz 
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setUploadedImage(ev.target.result);
                setSelectedImage(ev.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreateQuiz = async () => {
        setTouched({ quizName: true, level: true, school: true });
        if (!quizName || !level.length || !school.length) return;
        const data = {
            title: quizName,
            level: level.map(l => l.value),
            school: school.map(s => s.value),
            major: major?.value || null,
            subject: subject?.value || null,
            skill: skill?.value || null,
            topic: topic?.value || null,
            description,
            isPublic,
            // todo
            image: selectedImage, // Có thể là base64 hoặc url, tuỳ BE xử lý
            //  shareScope,
            usePassword,
            classShare,
            emailShare,
        };
        try {

            const res = await api.post("/quizzes", data);
            alert("Tạo đề thi thành công!");
        } catch (e) {
            console.log(e.response.data);
            alert("Có lỗi xảy ra khi tạo đề thi!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 relative">

            {/* Tabs */}
            <div className="bg-white px-8 border-b border-gray-200">
                <div className="flex gap-8 py-4">
                    <div className="font-semibold text-blue-600 border-b-2 border-blue-600 pb-2">Thông tin cơ bản</div>
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
                            <img src={selectedImage} alt="Quiz" className="w-full h-full object-cover" />
                        ) : (
                            <>
                                <span className="text-3xl mb-2">📄</span>
                                <span className="text-gray-500">Tải lên</span>
                            </>
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                    <div className="text-sm text-gray-500 mb-2">Tải ảnh lên hoặc chọn ảnh đề thi</div>
                    <div className="flex gap-2 mb-1">
                        {uploadedImage && (
                            <img
                                src={uploadedImage}
                                alt="Uploaded"
                                className={`w-14 h-10 object-cover rounded cursor-pointer border-2 ${selectedImage === uploadedImage ? "border-blue-500" : "border-gray-200"}`}
                                onClick={() => setSelectedImage(uploadedImage)}
                            />
                        )}
                        {sampleImages.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`sample${idx}`}
                                className={`w-14 h-10 object-cover rounded cursor-pointer border-2 ${selectedImage === img ? "border-blue-500" : "border-gray-200"}`}
                                onClick={() => setSelectedImage(img)}
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
                        <label className={`block font-medium mb-1 ${isQuizNameError ? "text-red-400" : ""}`}>
                            Tên đề thi <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={quizName}
                            onChange={e => setQuizName(e.target.value)}
                            onBlur={() => setTouched(t => ({ ...t, quizName: true }))}
                            placeholder="Nhập tên đề thi"
                            className={`w-full p-2 rounded border ${isQuizNameError ? "border-red-300 bg-red-50" : "border-gray-300"} focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none`}
                        />
                        {isQuizNameError && (
                            <div className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                Trường này là bắt buộc.
                            </div>
                        )}
                    </div>
                    {/* Trình độ & Trường học */}
                    <div className="flex gap-4 mb-5">
                        <div className="flex-1">
                            <label className={`block font-medium mb-1 ${isLevelError ? "text-red-400" : ""}`}>
                                Trình độ <span className="text-red-500">*</span>
                            </label>
                            <Select
                                isMulti
                                options={levelOptions}
                                value={level}
                                onChange={selected => setLevel(selected)}
                                onBlur={() => setTouched(t => ({ ...t, level: true }))}
                                classNamePrefix={isLevelError ? "react-select-error" : "react-select"}
                            />
                            {isLevelError && (
                                <div className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                    Trường này là bắt buộc.
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <label className={`block font-medium mb-1 ${isSchoolError ? "text-red-400" : ""}`}>
                                Trường học <span className="text-red-500">*</span>
                            </label>
                            <Select
                                isMulti
                                options={schoolOptions}
                                value={school}
                                onChange={selected => setSchool(selected)}
                                onBlur={() => setTouched(t => ({ ...t, school: true }))}
                                classNamePrefix={isSchoolError ? "react-select-error" : "react-select"}
                            />
                            {isSchoolError && (
                                <div className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                    Trường này là bắt buộc.
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Chuyên ngành, Môn học, Kỹ năng, Chủ đề */}
                    <div className="flex gap-4 mb-5">
                        <div className="flex-1">
                            <label className="block font-medium mb-1">Chuyên ngành</label>
                            <Select
                                options={majorOptions}
                                value={major}
                                onChange={setMajor}
                                classNamePrefix="react-select"
                                isClearable
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block font-medium mb-1">Môn học</label>
                            <Select
                                options={subjectOptions}
                                value={subject}
                                onChange={setSubject}
                                classNamePrefix="react-select"
                                isClearable
                            />
                        </div>
                    </div>
                    {/* <div className="flex gap-4 mb-5">
                        <div className="flex-1">
                            <label className="block font-medium mb-1">Kỹ năng</label>
                            <Select
                                options={skillOptions}
                                value={skill}
                                onChange={setSkill}
                                classNamePrefix="react-select"
                                isClearable
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block font-medium mb-1">Chủ đề</label>
                            <Select
                                options={topicOptions}
                                value={topic}
                                onChange={setTopic}
                                classNamePrefix="react-select"
                                isClearable
                            />
                        </div>
                    </div> */}
                    {/* Mô tả */}
                    <div>
                        <label className="block font-medium mb-1">Mô tả</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Mô tả bổ sung"
                            className="w-full p-2 rounded border border-gray-300"
                            rows={8}
                        />
                    </div>
                </div>

                {/* Cấu hình truy cập */}
                <div className="col-span-12 md:col-span-4 bg-white rounded-lg shadow p-6">
                    <div className="font-bold mb-4 text-xl">Cấu hình truy cập</div>
                    <div className="bg-blue-100 border border-blue-500 text-blue-800 text-sm rounded px-3 py-2 mb-4">
                        ⚠️ Cấu hình này chỉ áp dụng khi truy cập ôn thi
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Phạm vi chia sẻ <span className="text-red-500">*</span></label>
                        <select
                            className="w-full p-2 rounded border border-gray-300"
                            value={isPublic}
                            onChange={e => setIsPublic(e.target.value === "true")}
                        >
                            <option value="false">Riêng tư</option>
                            <option value="true">Công khai</option>
                        </select>
                        <p className="text-sm text-gray-500 mt-1">
                            Chỉ mình bạn và thành viên được chia sẻ có thể truy cập đề thi
                        </p>
                    </div>
                    <div className="mb-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={usePassword}
                                onChange={e => setUsePassword(e.target.checked)}
                            />
                            <span>Sử dụng mật khẩu</span>
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Chia sẻ cho lớp học</label>
                        <select
                            className="w-full p-2 rounded border border-gray-300"
                            value={classShare}
                            onChange={e => setClassShare(e.target.value)}
                            disabled
                        >
                            <option value="">Chọn lớp học tập</option>
                        </select>
                        <p className="text-sm text-gray-500 mt-1">
                            Những thành viên trong lớp học có thể truy cập đề thi
                        </p>
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Chia sẻ qua mail</label>
                        <input
                            type="text"
                            placeholder="Nhập email"
                            className="w-full p-2 rounded border border-gray-300"
                            value={emailShare}
                            onChange={e => setEmailShare(e.target.value)}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            Những thành viên được chia sẻ qua email có thể truy cập đề thi
                        </p>
                    </div>
                </div>
            </div>
            {/* Fixed : Cố định theo trình duyệt  */}
            <div className=" absolute bottom-10 right-20  ">
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
