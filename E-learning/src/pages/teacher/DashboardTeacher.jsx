
import React from "react";
import SidebarTeacher from "../../components/SidebarTeacher";
import { BarChart3, Users, FileText, BookOpen } from "lucide-react";

const stats = [
    {
        label: "Tổng số đề thi",
        value: 12,
        icon: <FileText className="w-8 h-8 text-blue-500" />,
        bg: "bg-blue-50",
    },
    {
        label: "Tổng số học sinh",
        value: 120,
        icon: <Users className="w-8 h-8 text-green-500" />,
        bg: "bg-green-50",
    },
    {
        label: "Lượt làm bài",
        value: 350,
        icon: <BarChart3 className="w-8 h-8 text-purple-500" />,
        bg: "bg-purple-50",
    },
    {
        label: "Khóa học",
        value: 5,
        icon: <BookOpen className="w-8 h-8 text-yellow-500" />,
        bg: "bg-yellow-50",
    },
];

const DashboardTeacher = () => {
    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <div className="w-64">
                <SidebarTeacher />
            </div>
            {/* Main Content */}
            <div className="flex-1 p-8">
                <h1 className="text-3xl font-bold mb-2 text-blue-700">Bảng điều khiển giáo viên</h1>
                <p className="text-gray-600 mb-8 text-lg">
                    Chào mừng bạn trở lại! Quản lý đề thi, học sinh, thống kê và nhiều hơn nữa.
                </p>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className={`rounded-2xl shadow-md p-6 flex items-center gap-4 ${stat.bg} border border-gray-100 hover:shadow-xl transition`}
                        >
                            <div className="flex-shrink-0">{stat.icon}</div>
                            <div>
                                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                                <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-semibold mb-2 text-blue-600">Quản lý đề thi</h2>
                            <p className="text-gray-500 mb-4">
                                Xem, tạo mới và chỉnh sửa các đề thi của bạn một cách dễ dàng.
                            </p>
                        </div>
                        <a
                            href="/dashboardTeacher/quizzes"
                            className="inline-block mt-2 px-5 py-2 bg-blue-500 text-white rounded-lg font-semibold shadow hover:bg-blue-600 transition"
                        >
                            Quản lý đề thi
                        </a>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-semibold mb-2 text-green-600">Quản lý học sinh</h2>
                            <p className="text-gray-500 mb-4">
                                Xem danh sách học sinh, điểm số và tiến độ học tập.
                            </p>
                        </div>
                        <a
                            href="/dashboardTeacher/students"
                            className="inline-block mt-2 px-5 py-2 bg-green-500 text-white rounded-lg font-semibold shadow hover:bg-green-600 transition"
                        >
                            Quản lý học sinh
                        </a>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-xl font-semibold mb-4 text-purple-600">Hoạt động gần đây</h2>
                    <ul className="divide-y divide-gray-100">
                        <li className="py-3 flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
                            <span className="text-gray-700">Bạn đã tạo đề thi "Toán 12 HK2".</span>
                            <span className="ml-auto text-xs text-gray-400">2 giờ trước</span>
                        </li>
                        <li className="py-3 flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                            <span className="text-gray-700">Học sinh Nguyễn Văn A vừa hoàn thành đề thi "Lý 10".</span>
                            <span className="ml-auto text-xs text-gray-400">5 giờ trước</span>
                        </li>
                        <li className="py-3 flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
                            <span className="text-gray-700">Bạn đã cập nhật đề thi "Hóa 11".</span>
                            <span className="ml-auto text-xs text-gray-400">1 ngày trước</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardTeacher;
