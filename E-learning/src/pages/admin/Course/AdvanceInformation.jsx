import React, { useState } from "react";
import api from "../../../config/AxiosConfig";
import thumbnailIcon from "../../../assets/images/image.png";

const AdvanceInformation = () => {
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [trailerPreview, setTrailerPreview] = useState(null);
    const [description, setDescription] = useState("");
    const [lessons, setLessons] = useState(["", "", ""]);

    // upload file local preview
    const handleThumbnailUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file);
            setThumbnailPreview(URL.createObjectURL(file));
        }
    };

    const handleTrailerUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setTrailer(file);
            setTrailerPreview(URL.createObjectURL(file));
        }
    };

    const handleLessonChange = (index, value) => {
        const updatedLessons = [...lessons];
        updatedLessons[index] = value;
        setLessons(updatedLessons);
    };

    const addLesson = () => {
        setLessons([...lessons, ""]);
    };

    // ===== SAVE COURSE =====
    const handleSave = async () => {
        try {
            let thumbnailUrl = null;
            let trailerUrl = null;

            // 1. Upload thumbnail nếu có
            if (thumbnail) {
                const formData = new FormData();
                formData.append("file", thumbnail);
                formData.append("folder", "thumbnail");
                const resThumb = await api.post("/file", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                const fileName = resThumb.data.data.fileName;
                thumbnailUrl = `/uploads/thumbnail/${fileName}`;
            }

            // 2. Upload trailer nếu có
            if (trailer) {
                const formData = new FormData();
                formData.append("file", trailer);
                formData.append("folder", "trailer");
                const resTrailer = await api.post("/file", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                const fileNameTrailer = resTrailer.data.data.fileName;
                trailerUrl = `/uploads/thumbnail/${fileNameTrailer}`;
            }

            // 3. Tạo courseData gửi sang API /courses
            const courseData = {
                title: "ReactJS cơ bản", // test cứng, sau này bạn gắn state form title
                description,
                price: 199,
                duration: 30,
                logo: thumbnailUrl,
                demo_video_url: trailerUrl,
                lessons,
            };

            await api.post("/courses", courseData);
            alert("Lưu khóa học thành công!");
        } catch (err) {
            console.error(err);
            alert("Có lỗi khi lưu khóa học!");
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="flex-1 bg-gray-50 p-4">
                <div className="max-w-full bg-white rounded-2xl shadow p-3">
                    {/* Thumbnail & Trailer */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
                        {/* Course Thumbnail */}
                        <div className="border rounded-lg p-6 flex items-center gap-6 bg-white">
                            <div className="w-40 h-40 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md overflow-hidden">
                                {thumbnailPreview ? (
                                    <img
                                        src={thumbnailPreview}
                                        alt="thumbnail preview"
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <img
                                        src={thumbnailIcon}
                                        alt="thumbnail icon"
                                        className="w-12 h-12 opacity-60"
                                    />
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold mb-1">Course Thumbnail</p>
                                <p className="text-xs text-gray-500 mb-3">
                                    Upload course thumbnail (.jpg, .jpeg, .png)
                                </p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleThumbnailUpload}
                                    className="hidden"
                                    id="thumbnailInput"
                                />
                                <label
                                    htmlFor="thumbnailInput"
                                    className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-md font-medium hover:bg-orange-200"
                                >
                                    Upload Image
                                </label>
                                {thumbnail && (
                                    <p className="mt-2 text-sm text-gray-400">{thumbnail.name}</p>
                                )}
                            </div>
                        </div>

                        {/* Course Trailer */}
                        <div className="border rounded-lg p-6 flex items-start gap-6 bg-white">
                            <div className="w-40 h-40 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md overflow-hidden">
                                {trailerPreview ? (
                                    <video
                                        src={trailerPreview}
                                        controls
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-12 h-12 opacity-60"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.26a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold mb-1">Course Trailer</p>
                                <p className="text-xs text-gray-500 mb-3">
                                    Upload course trailer (.mp4, .mov, .avi)
                                </p>
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={handleTrailerUpload}
                                    className="hidden"
                                    id="trailerInput"
                                />
                                <label
                                    htmlFor="trailerInput"
                                    className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-md font-medium hover:bg-orange-200"
                                >
                                    Upload Video
                                </label>
                                {trailer && (
                                    <p className="mt-2 text-sm text-gray-400">{trailer.name}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <label className="block font-semibold text-gray-700 mb-2">
                            Mô tả khóa học
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={5}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your course description..."
                        />
                    </div>

                    {/* Lessons */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <label className="font-semibold text-gray-700">
                                What you will teach in this course
                            </label>
                            <button
                                type="button"
                                onClick={addLesson}
                                className="text-sm px-3 py-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200"
                            >
                                + Add new
                            </button>
                        </div>
                        <div className="space-y-3">
                            {lessons.map((lesson, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={lesson}
                                    onChange={(e) => handleLessonChange(index, e.target.value)}
                                    placeholder={`Lesson ${index + 1}`}
                                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Save Buttons */}
                    <div className="flex justify-end mt-8 gap-4">
                        <button
                            type="button"
                            className="px-5 py-2 rounded-lg bg-orange-100 text-orange-600 hover:bg-orange-200"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="px-5 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600"
                            onClick={handleSave}
                        >
                            Save & Preview
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvanceInformation;
