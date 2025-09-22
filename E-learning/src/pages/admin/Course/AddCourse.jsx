import React, { useState } from "react";
import SidebarAdmin from "../../../components/SidebarAdmin";
import api from "../../../config/AxiosConfig";
import AdvanceInformation from "./AdvanceInformation";

const AddCourse = () => {
    const [step, setStep] = useState(1);
    //  Form data state: Lưu trữ dữ liệu 
    const [formData, setFormData] = useState({
        title: "",
        // category: "",
        description: "",
        price: 0,
        // topic: "",
        // level: "",
        duration: 0,
    });
    //  Define steps
    const steps = [
        { id: 1, label: "Thông tin cơ bản" },
        { id: 2, label: "Thông tin nâng cao" },
        { id: 3, label: "Chương trình giảng dạy" },
        { id: 4, label: "Khóa học" },
    ];

    const handleNext = () => {
        if (step < steps.length) setStep(step + 1);
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); // Không load lại trang
        try {
            // Gửi dữ liệu formData lên server hoặc xử lý theo yêu cầu
            const res = await api.post("/courses", formData);
            console.log("Course data:", res.data.data);
            alert("Course created successfully!");
        } catch (error) {
            console.error("Error submitting course:", error);
        }
        console.log("Form Data", formData);
    };

    const handlePrev = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("Course data:", formData);
    //     alert("Course saved!");
    // };

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <SidebarAdmin />
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-50 p-6">
                <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-8">
                    <h1 className="text-2xl font-bold mb-8 text-gray-800">
                        Tạo mới khóa học
                    </h1>

                    {/* Stepper */}
                    <div className="flex items-center justify-between mb-8 border-b pb-4">
                        {steps.map((s) => (
                            <div
                                key={s.id}
                                className={`flex-1 text-center text-sm font-medium ${step === s.id ? "text-blue-600" : "text-gray-500"
                                    }`}
                            >
                                <div
                                    className={`inline-block px-3 py-1 rounded-full text-xs mb-1 ${step === s.id
                                        ? "bg-blue-100 text-blue-600"
                                        : "bg-gray-100 text-gray-500"
                                        }`}
                                >
                                    {s.id}/{steps.length}
                                </div>
                                <p>{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Form Content */}
                    {step === 1 && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                                Thông tin cơ bản
                            </h2>

                            {/* Title */}
                            <div>
                                <label className="block text-gray-600 mb-1">Tên khóa học</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Your course title"
                                    maxLength={80}
                                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            {/* Category */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* <div>
                                    <label className="block text-gray-600 mb-1">
                                        Danh mục khóa học
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
                                    >
                                        <option value="">Select...</option>
                                        <option value="it">IT</option>
                                        <option value="business">Business</option>
                                    </select>
                                </div> */}
                                <div>
                                    <label className="block text-gray-600 mb-1">Course Level</label>
                                    <select
                                        name="level"
                                        value={formData.level}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
                                    >
                                        {/* <option value="">Select...</option> */}
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>
                            {/* Duration & Price */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Duration */}
                                <div>
                                    <label className="block text-gray-600 mb-1">Thời gian học (giờ)</label>
                                    <input
                                        type="number"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        placeholder="e.g., 30"
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
                                        min="1"
                                    />
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block text-gray-600 mb-1">Giá khóa học (VNĐ)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price || ""}
                                        onChange={handleChange}
                                        placeholder="e.g., 199000"
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
                                        min="0"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-gray-600 mb-1">Mô tả</label>
                                <textarea
                                    name="description"
                                    value={formData.description || ""}
                                    onChange={handleChange}
                                    placeholder="Write a detailed course description..."
                                    maxLength={500}
                                    rows={5}
                                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between mt-6">
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        className="px-5 py-2 rounded-lg bg-orange-100 text-orange-600 hover:bg-orange-200"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            await handleSubmit(new Event("submit")); // Gọi API
                                            handleNext(); // Chuyển step
                                        }}
                                        className="px-5 py-2 rounded-lg bg-orange-500 text-black font-semibold hover:bg-orange-600"
                                    >
                                        Save & Next
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                    {step === 2 && (
                        <AdvanceInformation
                            formData={formData}
                            setFormData={setFormData}
                            handlePrev={handlePrev}
                            handleNext={handleNext}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddCourse;
