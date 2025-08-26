import React, { useState, useEffect } from "react";
import Sidebar from "../../components/SidebarAdmin";
import {
    Search, Plus, Edit, Trash2, Eye, Filter, Download, Upload, BookOpen, X
} from "lucide-react";
import api from "../../config/AxiosConfig";

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage] = useState(10);
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
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const res = await api.get("/courses"); // gọi API BE
            setCourses(res.data.data || res.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCourse = async (data) => {
        try {
            const res = await api.post("/courses", data);
            setCourses([...courses, res.data.data]);
            setShowModal(false);
            resetForm();
        } catch (err) {
            console.error("Error adding course:", err);
        }
    };

    const handleUpdateCourse = async (id, data) => {
        try {
            const res = await api.put(`/courses/${id}`, data);
            setCourses(courses.map(c => c.id === id ? res.data.data : c));
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
                setCourses(courses.filter(c => c.id !== id));
            } catch (err) {
                console.error("Error deleting course:", err);
            }
        }
    };

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

    // Filter + Search
    const filteredCourses = courses.filter(c => {
        const matchesSearch =
            (c.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (c.teacher || "").toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "all" || c.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    // Pagination
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

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
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Quản lý Khóa học</h1>
                        <p className="text-gray-600 mt-1">Theo dõi và quản lý các khóa học</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => openModal("add")}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <Plus size={16} /> Thêm khóa học
                        </button>
                    </div>
                </div>

                {/* Search + Filter */}
                <div className="p-6">
                    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6 flex gap-4">
                        <div className="flex-1 relative">
                            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo tên hoặc giảng viên..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter size={16} className="text-gray-500" />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">Tất cả</option>
                                <option value="active">Hoạt động</option>
                                <option value="inactive">Không hoạt động</option>
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-lg shadow-sm border">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Khóa học</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Giảng viên</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Học viên</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Ngày tạo</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {loading ? (
                                    <tr><td colSpan="6" className="py-8 text-center">Đang tải...</td></tr>
                                ) : currentCourses.length === 0 ? (
                                    <tr><td colSpan="6" className="py-8 text-center text-gray-500">Không có khóa học nào</td></tr>
                                ) : (
                                    currentCourses.map(c => (
                                        <tr key={c.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">{c.title}</td>
                                            <td className="px-6 py-4">{c.teacher}</td>
                                            <td className="px-6 py-4">{c.studentsCount}</td>
                                            <td className="px-6 py-4">
                                                {c.createAt ? new Date(c.createAt).toLocaleDateString('vi-VN') : "Chưa có"}
                                            </td>
                                            <td className="px-6 py-4">{getStatusBadge(c.status)}</td>
                                            <td className="px-6 py-4 flex gap-2">
                                                <button onClick={() => openModal("view", c)} className="p-1 text-blue-600"><Eye size={16} /></button>
                                                <button onClick={() => openModal("edit", c)} className="p-1 text-green-600"><Edit size={16} /></button>
                                                <button onClick={() => handleDeleteCourse(c.id)} className="p-1 text-red-600"><Trash2 size={16} /></button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="px-6 py-4 border-t flex justify-between">
                                <div>Hiển thị {indexOfFirstCourse + 1}-{Math.min(indexOfLastCourse, filteredCourses.length)} / {filteredCourses.length}</div>
                                <div className="flex gap-2">
                                    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Trước</button>
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button key={i} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? "font-bold" : ""}>{i + 1}</button>
                                    ))}
                                    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Sau</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Modal (Add/Edit/View) */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
                        <h2 className="text-xl font-bold mb-4">
                            {modalMode === "add" && "Thêm khóa học"}
                            {modalMode === "edit" && "Chỉnh sửa khóa học"}
                            {modalMode === "view" && "Chi tiết khóa học"}
                        </h2>

                        {modalMode === "view" ? (
                            <div>
                                <p><strong>Tên:</strong> {selectedCourse?.title}</p>
                                <p><strong>Mô tả:</strong> {selectedCourse?.description}</p>
                                <p><strong>Giảng viên:</strong> {selectedCourse?.teacher}</p>
                                <p><strong>Số học viên:</strong> {selectedCourse?.studentsCount}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                                <input
                                    type="text"
                                    placeholder="Tên khóa học"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                                <textarea
                                    placeholder="Mô tả"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Giảng viên"
                                    value={formData.teacher}
                                    onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Số học viên"
                                    value={formData.studentsCount}
                                    onChange={(e) => setFormData({ ...formData, studentsCount: e.target.value })}
                                />
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="active">Hoạt động</option>
                                    <option value="inactive">Không hoạt động</option>
                                </select>

                                <div className="flex justify-end gap-3 mt-4">
                                    <button type="button" onClick={() => setShowModal(false)}>Hủy</button>
                                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
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
