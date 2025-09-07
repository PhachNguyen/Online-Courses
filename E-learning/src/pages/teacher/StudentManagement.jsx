import React, { useState } from "react";
import SidebarTeacher from "../../components/SidebarTeacher";

const mockStudents = [
    { id: 1, name: "Nguyen Van A", email: "a@student.com", status: "active", course: "React Fundamentals" },
    { id: 2, name: "Tran Thi B", email: "b@student.com", status: "inactive", course: "JavaScript Advanced" },
    { id: 3, name: "Le Van C", email: "c@student.com", status: "active", course: "Python Basics" },
];


const TeacherStudentManagement = () => {
    const [students] = useState(mockStudents);

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <div className="w-64">
                <SidebarTeacher />
            </div>
            {/* Main Content */}
            <div className="flex-1 p-8">
                <h2 className="text-2xl font-bold mb-4">Quản lý học sinh</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">#</th>
                                <th className="py-2 px-4 border-b">Tên học sinh</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Khóa học</th>
                                <th className="py-2 px-4 border-b">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, idx) => (
                                <tr key={student.id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b text-center">{idx + 1}</td>
                                    <td className="py-2 px-4 border-b">{student.name}</td>
                                    <td className="py-2 px-4 border-b">{student.email}</td>
                                    <td className="py-2 px-4 border-b">{student.course}</td>
                                    <td className="py-2 px-4 border-b">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${student.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                            {student.status === "active" ? "Hoạt động" : "Không hoạt động"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeacherStudentManagement;
