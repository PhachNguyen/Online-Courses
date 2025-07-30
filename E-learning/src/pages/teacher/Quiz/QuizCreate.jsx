// src/pages/teacher/CreateQuiz.jsx
import React, { useState } from "react";

const sampleImages = [
    "https://via.placeholder.com/80x60?text=Sample+1",
    "https://via.placeholder.com/80x60?text=Sample+2",
    "https://via.placeholder.com/80x60?text=Sample+3"
];

const CreateQuiz = () => {
    const [quizName, setQuizName] = useState("");
    const [level, setLevel] = useState([]);
    const [school, setSchool] = useState([]);
    const [shareScope, setShareScope] = useState("private");
    const [usePassword, setUsePassword] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);

    // Upload ảnh
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

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-white px-8 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold m-0">Tạo đề thi mới</h2>
            </div>

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

            {/* Main content */}
            <div className="flex gap-6 px-8 py-8">
                {/* Ảnh đề thi */}
                <div className="flex-1 bg-white rounded-lg shadow p-6 min-w-[250px]">
                    <div className="font-semibold mb-4 text-lg">Ảnh đề thi</div>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                        {selectedImage ? (
                            <img src={selectedImage} alt="Quiz" className="w-20 h-16 object-cover rounded mb-2" />
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
                    <div className="text-sm text-gray-500 mb-2">Tải ảnh lên hoặc chọn ảnh đề thi</div>
                    <div className="flex gap-2">
                        {uploadedImage && (
                            <img
                                src={uploadedImage}
                                alt="Uploaded"
                                className={`w-10 h-8 object-cover rounded cursor-pointer border-2 ${selectedImage === uploadedImage ? "border-blue-500" : "border-gray-200"}`}
                                onClick={() => setSelectedImage(uploadedImage)}
                            />
                        )}
                        {sampleImages.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`sample${idx}`}
                                className={`w-10 h-8 object-cover rounded cursor-pointer border-2 ${selectedImage === img ? "border-blue-500" : "border-gray-200"}`}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>
                </div>

                {/* Thông tin cơ bản */}
                <div className="flex-2 bg-white rounded-lg shadow p-6 w-full max-w-xl">
                    <div className="font-bold mb-6 text-2xl">Thông tin cơ bản</div>
                    {/* Tên đề thi */}
                    <div className="mb-5">
                        <label className="block font-medium mb-1">
                            Tên đề thi <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={quizName}
                            onChange={e => setQuizName(e.target.value)}
                            placeholder="Nhập tên đề thi"
                            className="w-full p-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                        />
                        {!quizName && (
                            <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <span className="text-base">⚠️</span> Trường này là bắt buộc.
                            </div>
                        )}
                    </div>
                    {/* Trình độ & Trường học */}
                    <div className="flex gap-4 mb-5">
                        <div className="flex-1">
                            <label className="block font-medium mb-1">
                                Trình độ <span className="text-red-500">*</span>
                            </label>
                            <select
                                multiple
                                value={level}
                                onChange={e => setLevel(Array.from(e.target.selectedOptions, option => option.value))}
                                className="w-full p-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                            >
                                <option value="Đại học">Đại học</option>
                                <option value="Cao đẳng">Cao đẳng</option>
                                <option value="THPT">THPT</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block font-medium mb-1">
                                Trường học <span className="text-red-500">*</span>
                            </label>
                            <select
                                multiple
                                value={school}
                                onChange={e => setSchool(Array.from(e.target.selectedOptions, option => option.value))}
                                className="w-full p-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                            >
                                <option value="Đại học Điện lực">Đại học Điện lực</option>
                                <option value="Đại học Bách Khoa">Đại học Bách Khoa</option>
                            </select>
                        </div>
                    </div>
                    {/* Thêm các trường khác nếu cần */}
                </div>

                {/* Cấu hình truy cập */}
                <div className="flex-1.5 bg-white rounded-lg shadow p-6 min-w-[300px]">
                    <div className="font-semibold mb-4 text-lg">Cấu hình truy cập</div>
                    <div className="bg-blue-50 text-blue-700 p-2 rounded mb-4 text-sm">
                        Cấu hình này chỉ áp dụng khi truy cập ôn thi
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">
                            Phạm vi chia sẻ <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={shareScope}
                            onChange={e => setShareScope(e.target.value)}
                            className="w-full p-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                        >
                            <option value="private">Riêng tư</option>
                            <option value="public">Công khai</option>
                        </select>
                        <div className="text-xs text-gray-500 mt-1">
                            Chỉ mình bạn và thành viên được chia sẻ có thể truy cập đề thi
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                checked={usePassword}
                                onChange={e => setUsePassword(e.target.checked)}
                                className="mr-2"
                            />
                            Sử dụng mật khẩu
                        </label>
                    </div>
                    {/* Thêm các trường chia sẻ qua lớp, email... nếu cần */}
                </div>
            </div>

            {/* Nút hành động */}
            <div className="flex justify-end gap-4 px-8 pb-8">
                <button
                    className="bg-red-500 hover:bg-red-600 text-white rounded px-6 py-2 font-semibold transition"
                    type="button"
                >
                    Trở về
                </button>
                <button
                    className="bg-purple-500 hover:bg-purple-600 text-white rounded px-6 py-2 font-semibold transition"
                    type="button"
                >
                    Tạo đề thi
                </button>
            </div>
        </div>
    );
};

export default CreateQuiz;
