import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, BookOpen } from "lucide-react";
import api from "../../config/AxiosConfig";
import Sidebar from "../../components/SidebarTeacher";

const Course = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [page, setPage] = useState(1); // 1-based
    const [size] = useState(6);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFetchCourse = async (pageNumber = 1) => {
        try {
            setLoading(true);
            const res = await api.get(`/courses?page=${pageNumber - 1}&size=${size}`);
            const data = res.data?.data?.data || [];
            const meta = res.data?.data?.meta || {};
            setCourses(data);
            setPage((meta.page || 0) + 1);
            setTotalPages(meta.pages || 0);
            setTotalItems(meta.total || 0);
        } catch (e) {
            console.error("Fetch courses error:", e);
            setError("Không tải được danh sách khóa học.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleFetchCourse(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <Sidebar />
            </div>

            {/* Main content */}
            <div className="flex-1 p-6 bg-gradient-to-br from-blue-50 to-white">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-extrabold text-gray-700 flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                        Khóa học của tôi
                    </h1>
                    <button
                        onClick={() => navigate("/quiz/create/info")}
                        className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl shadow hover:from-purple-600 hover:to-indigo-600 transition-all"
                    >
                        + Tạo đề thi
                    </button>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Tìm kiếm khóa học..."
                        className="flex-1 border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
                    />
                    <button className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm">
                        <Filter className="w-4 h-4" /> Bộ lọc
                    </button>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
                        <p className="text-lg text-gray-600 font-semibold">
                            Đang tải danh sách khóa học...
                        </p>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="flex flex-col items-center justify-center py-16">
                        <p className="text-red-500 text-lg font-semibold">{error}</p>
                    </div>
                )}

                {/* Courses grid */}
                {!loading && !error && courses.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
                            >
                                <img
                                    src={course.thumbnailUrl || "/vite.svg"}
                                    alt={course.title}
                                    className="h-40 w-full object-cover"
                                />
                                <div className="p-4 space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                                        {course.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 line-clamp-2">
                                        {course.description}
                                    </p>
                                    <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                                        <span>👨‍🏫 {course.teacher || "Chưa có"}</span>
                                        <span>👥 {course.studentsCount || 0} HV</span>
                                    </div>
                                    <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty */}
                {!loading && !error && courses.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16">
                        <img
                            src="/vite.svg"
                            alt="empty"
                            className="w-24 h-24 opacity-60 mb-4"
                        />
                        <p className="text-gray-500 text-lg">Không có khóa học nào.</p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-6 mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 border-t">
                        <div className="text-gray-600 text-sm">
                            Trang {page} / {totalPages} ({totalItems + 1} khóa học)
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                disabled={page === 1}
                                onClick={() => handleFetchCourse(page - 1)}
                                className="px-3 py-1 rounded bg-gray-100 hover:bg-purple-100 disabled:opacity-50"
                            >
                                Trước
                            </button>
                            {Array.from({ length: totalPages }, (_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleFetchCourse(idx + 1)}
                                    className={`px-3 py-1 rounded ${page === idx + 1
                                        ? "bg-purple-500 text-white font-bold"
                                        : "bg-gray-100 hover:bg-purple-100"
                                        }`}
                                >
                                    {idx + 1}
                                </button>
                            ))}
                            <button
                                disabled={page === totalPages}
                                onClick={() => handleFetchCourse(page + 1)}
                                className="px-3 py-1 rounded bg-gray-100 hover:bg-purple-100 disabled:opacity-50"
                            >
                                Sau
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Course;
