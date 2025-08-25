import React, { useState, useEffect } from "react";
import Sidebar from "../../components/SidebarAdmin";
import {
    Search, Plus, Edit, Trash2, Eye, Filter, Download, Upload, User, X
} from "lucide-react";
import api from "../../config/AxiosConfig";

const StudentManagement = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(5); // Phân trang
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("add"); // add, edit, view
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        address: "",
        status: "active",
        enrollmentDate: "",
        course: ""
    });




    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const res = await api.get("/users"); // gọi API BE
            setStudents(res.data.data); // 
            // console.log(res.data.data);
            // Using mock data for now
            setTimeout(() => {
                setStudents(res.data.data);
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error("Error fetching students:", error);
            setLoading(false);
        }
    };

    const handleAddStudent = async (studentData) => {
        try {
            // TODO(stagewise): Replace with actual API call
            // const response = await axios.post(`${API_BASE_URL}/students`, studentData);

            // Mock implementation
            const newStudent = {
                id: students.length + 1,
                ...studentData,
                coursesCompleted: 0,
                totalCourses: 0,
                averageScore: 0
            };
            setStudents([...students, newStudent]);
            setShowModal(false);
            resetForm();
        } catch (error) {
            console.error("Error adding student:", error);
        }
    };

    const handleUpdateStudent = async (id, studentData) => {
        try {
            // TODO(stagewise): Replace with actual API call
            // const response = await axios.put(`${API_BASE_URL}/students/${id}`, studentData);

            // Mock implementation
            setStudents(students.map(student =>
                student.id === id ? { ...student, ...studentData } : student
            ));
            setShowModal(false);
            resetForm();
        } catch (error) {
            console.error("Error updating student:", error);
        }
    };

    const handleDeleteStudent = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa học sinh này?")) {
            try {
                // TODO(stagewise): Replace with actual API call
                await api.delete(`/users/${id}`);

                // Mock implementation
                setStudents(students.filter(student => student.id !== id));
            } catch (error) {
                console.error("Error deleting student:", error);
            }
        }
    };

    const openModal = (mode, student = null) => {
        setModalMode(mode);
        setSelectedStudent(student);
        if (student && mode !== "view") {
            setFormData({
                username: student.username,
                email: student.email,
                phone: student.phone,
                dob: student.dob,      // đổi đúng key
                address: student.address,
                status: student.status || "active",
                enrollmentDate: student.createAt || "",
                course: student.course || ""
            });
        }
        setShowModal(true);
    };

    const resetForm = () => {
        setFormData({
            username: "",
            email: "",
            phone: "",
            dob: "",
            address: "",
            status: "active",
            enrollmentDate: "",
            course: ""
        });
        setSelectedStudent(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (modalMode === "add") {
            handleAddStudent(formData);
        } else if (modalMode === "edit") {
            handleUpdateStudent(selectedStudent.id, formData);
        }
    };

    // Filter kiểm tra Student 
    const filteredStudents = students.filter(student => {
        const matchesSearch = student.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "all" || student.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    // Pagination logic
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    const getStatusBadge = (status) => {
        const statusConfig = {
            active: { bg: "bg-green-100", text: "text-green-800", label: "Hoạt động" },
            inactive: { bg: "bg-red-100", text: "text-red-800", label: "Không hoạt động" },
            suspended: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Tạm dừng" }
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
                <div className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Quản lý Học sinh</h1>
                            <p className="text-gray-600 mt-1">Quản lý thông tin và theo dõi tiến độ học tập của học sinh</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                <Download size={16} />
                                Xuất Excel
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                <Upload size={16} />
                                Nhập Excel
                            </button>
                            <button
                                onClick={() => openModal("add")}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus size={16} />
                                Thêm học sinh
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {/* Search and Filter */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                        <div className="flex items-center gap-4">
                            <div className="flex-1 relative">
                                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm theo tên hoặc email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Filter size={16} className="text-gray-500" />
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">Tất cả trạng thái</option>
                                    <option value="active">Hoạt động</option>
                                    <option value="inactive">Không hoạt động</option>
                                    <option value="suspended">Tạm dừng</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Students Table */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Học sinh
                                        </th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Liên hệ
                                        </th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Khóa học đã mua
                                        </th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tiến độ
                                        </th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Trạng thái
                                        </th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="6" className="text-center py-8">
                                                <div className="flex items-center justify-center">
                                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                                    <span className="ml-2 text-gray-600">Đang tải...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : currentStudents.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="text-center py-8 text-gray-500">
                                                Không tìm thấy học sinh nào
                                            </td>
                                        </tr>
                                    ) : (
                                        currentStudents.map((student) => (
                                            <tr key={student.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                            <User size={16} className="text-blue-600" />
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-gray-900">{student.username}</p>
                                                            <p className="text-sm text-gray-500">ID: {student.id}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">{student.email}</div>
                                                    <div className="text-sm text-gray-500">{student.phone}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">{student.course || "Chưa đăng ký khóa học nào "}</div>
                                                    <div className="text-sm text-gray-500">
                                                        Đăng ký: {student.createAt ? new Date(student.createAt).toLocaleDateString('vi-VN', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric',
                                                        })
                                                            : "Chưa đăng ký ngày "}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">
                                                        {student.coursesCompleted}/{student.totalCourses} khóa học
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Điểm TB: {student.averageScore}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {getStatusBadge(student.status)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => openModal("view", student)}
                                                            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                            title="Xem chi tiết"
                                                        >
                                                            <Eye size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => openModal("edit", student)}
                                                            className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                                                            title="Chỉnh sửa"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteStudent(student.id)}
                                                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                            title="Xóa"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="px-6 py-4 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-700">
                                        Hiển thị {indexOfFirstStudent + 1} - {Math.min(indexOfLastStudent, filteredStudents.length)} của {filteredStudents.length} kết quả
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Trước
                                        </button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`px-3 py-1 border rounded text-sm ${currentPage === page
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'border-gray-300 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Sau
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">
                                {modalMode === "add" && "Thêm học sinh mới"}
                                {modalMode === "edit" && "Chỉnh sửa thông tin học sinh"}
                                {modalMode === "view" && "Thông tin chi tiết học sinh"}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    resetForm();
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        {/* Pop up xem thông tin  */}
                        {modalMode === "view" ? ( // Nếu không phải view thì popup ra edit và add
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin cá nhân</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">Họ tên</label>
                                                <p className="text-gray-900">{selectedStudent?.username}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">Email</label>
                                                <p className="text-gray-900">{selectedStudent?.email}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">Số điện thoại</label>
                                                <p className="text-gray-900">{selectedStudent?.phone}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">Ngày sinh</label>
                                                <p className="text-gray-900">
                                                    {selectedStudent.dob}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">Địa chỉ</label>
                                                <p className="text-gray-900">{selectedStudent?.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin học tập</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">Khóa học hiện tại</label>
                                                <p className="text-gray-900">{selectedStudent?.course}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">Ngày đăng ký</label>
                                                <p className="text-gray-900">
                                                    {selectedStudent.createAt
                                                        ? new Date(selectedStudent.createAt).toLocaleString('vi-VN', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })
                                                        : "Lỗi đăng ký"}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">Tiến độ học tập</label>
                                                <p className="text-gray-900">
                                                    {selectedStudent?.coursesCompleted}/{selectedStudent?.totalCourses} khóa học hoàn thành
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">Điểm trung bình</label>
                                                <p className="text-gray-900">{selectedStudent?.averageScore}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">Trạng thái</label>
                                                <div className="mt-1">
                                                    {getStatusBadge(selectedStudent?.status)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Họ tên *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Số điện thoại
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Ngày sinh
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.dob}
                                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Địa chỉ
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Khóa học
                                        </label>
                                        <select
                                            value={formData.course}
                                            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Chọn khóa học</option>
                                            <option value="React Fundamentals">React Fundamentals</option>
                                            <option value="JavaScript Advanced">JavaScript Advanced</option>
                                            <option value="Python Basics">Python Basics</option>
                                            <option value="UI/UX Design">UI/UX Design</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Trạng thái
                                        </label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="active">Hoạt động</option>
                                            <option value="inactive">Không hoạt động</option>
                                            <option value="suspended">Tạm dừng</option>
                                        </select>
                                    </div>
                                    {modalMode === "add" && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Ngày đăng ký
                                            </label>
                                            <input
                                                type="date"
                                                value={formData.enrollmentDate}
                                                onChange={(e) => setFormData({ ...formData, enrollmentDate: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowModal(false);
                                            resetForm();
                                        }}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        {modalMode === "add" ? "Thêm học sinh" : "Cập nhật"}
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

export default StudentManagement;