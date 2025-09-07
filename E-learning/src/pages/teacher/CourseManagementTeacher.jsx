import React, { useState } from "react";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import SidebarTeacher from "../../components/SidebarTeacher";

const initialCourses = [
    {
        id: 1,
        name: "ReactJS cơ bản",
        description: "Khóa học dành cho người mới bắt đầu với ReactJS.",
        students: 30,
    },
    {
        id: 2,
        name: "Lập trình NodeJS",
        description: "Khóa học về backend với NodeJS.",
        students: 25,
    },
];

function CourseManagementTeacher() {
    const [courses, setCourses] = useState(initialCourses);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [editId, setEditId] = useState(null);

    const handleAdd = () => {
        setShowForm(true);
        setFormData({ name: "", description: "" });
        setEditId(null);
    };

    const handleEdit = (course) => {
        setShowForm(true);
        setFormData({ name: course.name, description: course.description });
        setEditId(course.id);
    };

    const handleDelete = (id) => {
        setCourses(courses.filter((c) => c.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            setCourses(
                courses.map((c) =>
                    c.id === editId ? { ...c, ...formData } : c
                )
            );
        } else {
            setCourses([
                ...courses,
                {
                    id: Date.now(),
                    ...formData,
                    students: 0,
                },
            ]);
        }
        setShowForm(false);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <SidebarTeacher />
            <div className="flex-1 p-8">
                <h1 className="text-2xl font-bold mb-6">Quản lý khóa học</h1>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded flex items-center mb-4 hover:bg-blue-700"
                    onClick={handleAdd}
                >
                    <Plus className="mr-2 w-5 h-5" /> Thêm khóa học
                </button>
                <div className="bg-white shadow rounded p-4">
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="py-2">Tên khóa học</th>
                                <th>Mô tả</th>
                                <th>Số học viên</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course) => (
                                <tr key={course.id} className="border-t">
                                    <td className="py-2 font-semibold">{course.name}</td>
                                    <td>{course.description}</td>
                                    <td>{course.students}</td>
                                    <td className="flex gap-2 py-2">
                                        {/* Nút Xem */}
                                        <button
                                            className="rounded-full bg-blue-100 hover:bg-blue-200 p-2 shadow transition duration-200 flex items-center justify-center"
                                            title="Xem"
                                        >
                                            <Eye size={16} className="text-blue-600" />

                                        </button>
                                        {/* Nút Sửa */}
                                        <button
                                            className="rounded-full bg-green-100 hover:bg-green-200 p-2 shadow transition duration-200 flex items-center justify-center"
                                            onClick={() => handleEdit(course)}
                                            title="Sửa"
                                        >
                                            <Edit size={16} className="text-green-600 " />
                                        </button>
                                        {/* Nút Xóa */}
                                        <button
                                            className="rounded-full bg-red-100 hover:bg-red-200 p-2 shadow transition duration-200 flex items-center justify-center"
                                            onClick={() => handleDelete(course.id)}
                                            title="Xóa"
                                        >
                                            <Trash2 size={16} className="text-red-600 " />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                        <form
                            className="bg-white p-6 rounded shadow w-96"
                            onSubmit={handleSubmit}
                        >
                            <h2 className="text-xl font-bold mb-4">
                                {editId ? "Sửa khóa học" : "Thêm khóa học"}
                            </h2>
                            <div className="mb-3">
                                <label className="block mb-1 font-medium">Tên khóa học</label>
                                <input
                                    type="text"
                                    className="w-full border px-3 py-2 rounded"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block mb-1 font-medium">Mô tả</label>
                                <textarea
                                    className="w-full border px-3 py-2 rounded"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 rounded"
                                    onClick={() => setShowForm(false)}
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CourseManagementTeacher;
