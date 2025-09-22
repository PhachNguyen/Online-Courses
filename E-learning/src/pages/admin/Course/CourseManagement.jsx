import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/SidebarAdmin";
import {
    Search, Plus, Edit, Trash2, Eye, Filter, X
} from "lucide-react";
import api from "../../../config/AxiosConfig";
// import Quiz1 from "../../assets/images/quiz/Quiz1.jpg";

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    // Phân trang BE
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("add"); // add, edit, view
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        teacher: "",
        studentsCount: 0,
        status: "active"
    });

    useEffect(() => {
        fetchCourses(currentPage);
    }, [currentPage, filterStatus, searchTerm]);

    // Gọi API BE có phân trang
    const fetchCourses = async (page = 1) => {
        setLoading(true);
        try {
            const res = await api.get(
                `/courses?page=${page - 1}&size=${coursesPerPage}&status=${filterStatus}&search=${searchTerm}`
            );
            const { data, meta } = res.data.data;
            setCourses(data || []);
            setTotalPages(meta.pages);
            setTotalItems(meta.total);
            setCurrentPage(meta.page + 1);
        } catch (error) {
            console.error("Error fetching courses:", error);
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCourse = async (data) => {
        try {
            await api.post("/courses", data);
            fetchCourses(currentPage);
            setShowModal(false);
            resetForm();
        } catch (err) {
            console.error("Error adding course:", err);
        }
    };

    const handleUpdateCourse = async (id, data) => {
        try {
            await api.put(`/courses/${id}`, data);
            fetchCourses(currentPage);
            setShowModal(false);
            resetForm();
        } catch (err) {
            console.error("Error updating course:", err);
        }
    };

    const handleDeleteCourse = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa khóa học này?")) {
            try {
                await api.delete(`/courses/${id}`);
                fetchCourses(currentPage);
            } catch (err) {
                console.error("Error deleting course:", err);
            }
        }
    };

    // Mở modal
    const openModal = (mode, course = null) => {
        setModalMode(mode);
        setSelectedCourse(course);
        if (course && mode !== "view") {
            setFormData({
                title: course.title,
                description: course.description,
                teacher: course.teacher,
                studentsCount: course.studentsCount,
                status: course.status
            });
        }
        setShowModal(true);
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            teacher: "",
            studentsCount: 0,
            status: "active"
        });
        setSelectedCourse(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (modalMode === "add") {
            handleAddCourse(formData);
        } else if (modalMode === "edit") {
            handleUpdateCourse(selectedCourse.id, formData);
        }
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            active: { bg: "bg-green-100", text: "text-green-800", label: "Hoạt động" },
            inactive: { bg: "bg-red-100", text: "text-red-800", label: "Không hoạt động" }
        };
        const config = statusConfig[status] || statusConfig.active;
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
                {config.label}
            </span>
        );
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-white">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center shadow-sm">
                    <h1 className="text-2xl font-extrabold text-gray-700">Quản lý Khóa học</h1>
                    <button
                        onClick={() => openModal("add")}
                        className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition-all"
                    >
                        <Plus size={18} /> Thêm khóa học
                    </button>
                </div>

                {/* Search + Filter */}
                <div className="p-6 max-w-6xl mx-auto">
                    <div className="bg-white rounded-2xl shadow border p-4 mb-6 flex flex-col md:flex-row gap-4 items-center">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên hoặc giảng viên..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:flex-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400"
                        />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="all">Tất cả</option>
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Không hoạt động</option>
                        </select>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-2xl shadow border overflow-x-auto">
                        <table className="w-full min-w-[700px]">
                            <thead className="bg-blue-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-600 uppercase text-left">Khóa học</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-600 uppercase text-left">Giảng viên</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-600 uppercase text-center">Học viên</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-600 uppercase text-center">Trạng thái</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-600 uppercase text-center">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="py-12 text-center text-blue-500 animate-pulse">
                                            Đang tải...
                                        </td>
                                    </tr>
                                ) : courses.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="py-12 text-center text-gray-400">
                                            Không có khóa học nào
                                        </td>
                                    </tr>
                                ) : (
                                    courses.map((c) => (
                                        <tr key={c.id} className="hover:bg-blue-50 transition">
                                            <td className="px-6 py-4 flex items-center gap-3">
                                                {/* <img src={Quiz1} alt="Course" className="w-10 h-10 rounded shadow border" /> */}
                                                <span className="font-semibold text-gray-800">{c.title}</span>
                                            </td>
                                            <td className="px-6 py-4">{c.teacher}</td>
                                            <td className="px-6 py-4 text-center">{c.studentsCount}</td>
                                            <td className="px-6 py-4 text-center">{getStatusBadge(c.status)}</td>
                                            <td className="px-6 py-4 flex gap-2 justify-center">
                                                <button
                                                    onClick={() => openModal("view", c)}
                                                    className="p-2 rounded-full bg-blue-50 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    onClick={() => openModal("edit", c)}
                                                    className="p-2 rounded-full bg-green-50 text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCourse(c.id)}
                                                    className="p-2 rounded-full bg-red-50 text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="px-6 py-4 border-t flex justify-between items-center">
                                <div className="text-gray-500 text-sm">
                                    Trang {currentPage} / {totalPages} ({totalItems} khóa học)
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1 rounded bg-gray-100 hover:bg-blue-100 disabled:opacity-50"
                                    >
                                        Trước
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white font-bold" : "bg-gray-100 hover:bg-blue-100"
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1 rounded bg-gray-100 hover:bg-blue-100 disabled:opacity-50"
                                    >
                                        Sau
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-all"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-bold mb-6 text-blue-700">
                            {modalMode === "add" && "Thêm khóa học"}
                            {modalMode === "edit" && "Chỉnh sửa khóa học"}
                            {modalMode === "view" && "Chi tiết khóa học"}
                        </h2>

                        {modalMode === "view" && selectedCourse ? (
                            <div className="space-y-3">
                                <p><b>Tên:</b> {selectedCourse.title}</p>
                                <p><b>Mô tả:</b> {selectedCourse.description}</p>
                                <p><b>Giảng viên:</b> {selectedCourse.teacher}</p>
                                <p><b>Số học viên:</b> {selectedCourse.studentsCount}</p>
                                <p><b>Trạng thái:</b> {getStatusBadge(selectedCourse.status)}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="grid gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Tên khóa học</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Mô tả</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Giảng viên</label>
                                    <input
                                        type="text"
                                        value={formData.teacher}
                                        onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Số học viên</label>
                                    <input
                                        type="number"
                                        value={formData.studentsCount}
                                        onChange={(e) => setFormData({ ...formData, studentsCount: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Trạng thái</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400"
                                    >
                                        <option value="active">Hoạt động</option>
                                        <option value="inactive">Không hoạt động</option>
                                    </select>
                                </div>
                                <div className="flex justify-end gap-3 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow"
                                    >
                                        {modalMode === "add" ? "Thêm" : "Cập nhật"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseManagement;
