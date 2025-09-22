import React from "react";
import { FaEye, FaShareAlt } from "react-icons/fa";

const CourseCard = ({ course, onView, onShare }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 relative">
            <h2 className="font-bold text-lg">{course.name}</h2>
            <p className="text-gray-600">{course.description}</p>
            <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-500">Số lượng: {course.quantity}</span>
            </div>
            <div className="absolute top-2 right-2 flex gap-2">
                <button
                    title="Xem chi tiết"
                    onClick={() => onView(course.id)}
                    className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition"
                >
                    <FaEye className="text-blue-600" />
                </button>
                <button
                    title="Chia sẻ"
                    onClick={() => onShare(course.id)}
                    className="p-2 bg-green-100 rounded-full hover:bg-green-200 transition"
                >
                    <FaShareAlt className="text-green-600" />
                </button>
            </div>
        </div>
    );
};

export default CourseCard;