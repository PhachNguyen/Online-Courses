import React, { useState } from "react";
import Sidebar from "../../components/SidebarAdmin";
import { 
    Users, 
    BookOpen, 
    GraduationCap, 
    TrendingUp, 
    Award, 
    Clock, 
    Calendar,
    Activity,
    DollarSign,
    Eye,
    MessageSquare,
    Star,
    ArrowUp,
    ArrowDown,
    MoreVertical
} from "lucide-react";

const AdminDashboard = () => {
    const [timeRange, setTimeRange] = useState('7days');

    // Mock data - TODO(stagewise): Replace with real data from API
    const stats = [
        {
            title: "Tổng học sinh",
            value: "2,847",
            change: "+12.5%",
            trend: "up",
            icon: Users,
            color: "blue"
        },
        {
            title: "Tổng khóa học",
            value: "156",
            change: "+8.2%",
            trend: "up",
            icon: BookOpen,
            color: "green"
        },
        {
            title: "Giáo viên hoạt động",
            value: "89",
            change: "+3.1%",
            trend: "up",
            icon: GraduationCap,
            color: "purple"
        },
        {
            title: "Doanh thu tháng",
            value: "₫45.2M",
            change: "-2.4%",
            trend: "down",
            icon: DollarSign,
            color: "orange"
        }
    ];

    const recentActivities = [
        {
            id: 1,
            user: "Nguyễn Văn A",
            action: "đã hoàn thành khóa học",
            course: "React Fundamentals",
            time: "2 phút trước",
            type: "completion"
        },
        {
            id: 2,
            user: "Trần Thị B",
            action: "đã đăng ký khóa học",
            course: "JavaScript Advanced",
            time: "15 phút trước",
            type: "enrollment"
        },
        {
            id: 3,
            user: "Lê Minh C",
            action: "đã tạo quiz mới",
            course: "HTML/CSS Basics",
            time: "1 giờ trước",
            type: "creation"
        },
        {
            id: 4,
            user: "Phạm Thu D",
            action: "đã bình luận trong",
            course: "Node.js Backend",
            time: "2 giờ trước",
            type: "comment"
        }
    ];

    const topCourses = [
        {
            id: 1,
            title: "React Fundamentals",
            students: 234,
            rating: 4.8,
            revenue: "₫12.5M",
            trend: "up"
        },
        {
            id: 2,
            title: "JavaScript Advanced",
            students: 189,
            rating: 4.7,
            revenue: "₫9.8M",
            trend: "up"
        },
        {
            id: 3,
            title: "Python for Beginners",
            students: 156,
            rating: 4.6,
            revenue: "₫7.2M",
            trend: "down"
        },
        {
            id: 4,
            title: "UI/UX Design",
            students: 143,
            rating: 4.9,
            revenue: "₫8.1M",
            trend: "up"
        }
    ];

    const StatCard = ({ stat }) => {
        const Icon = stat.icon;
        const colorClasses = {
            blue: "bg-blue-500 text-blue-500 bg-blue-50",
            green: "bg-green-500 text-green-500 bg-green-50",
            purple: "bg-purple-500 text-purple-500 bg-purple-50",
            orange: "bg-orange-500 text-orange-500 bg-orange-50"
        };

        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-lg ${colorClasses[stat.color].split(' ')[2]} flex items-center justify-center`}>
                        <Icon size={24} className={colorClasses[stat.color].split(' ')[1]} />
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                        {stat.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                        {stat.change}
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                    <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                            <p className="text-gray-600 mt-1">Chào mừng trở lại, Admin! Đây là tổng quan hệ thống của bạn.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <select 
                                value={timeRange} 
                                onChange={(e) => setTimeRange(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="7days">7 ngày qua</option>
                                <option value="30days">30 ngày qua</option>
                                <option value="90days">90 ngày qua</option>
                            </select>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                                Xuất báo cáo
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <StatCard key={index} stat={stat} />
                        ))}
                    </div>

                    {/* Charts and Activity Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Learning Progress Chart */}
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">Tiến độ học tập</h2>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                            
                            {/* Mock Chart Area */}
                            <div className="h-80 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <Activity size={48} className="text-blue-500 mx-auto mb-4" />
                                    <p className="text-gray-600">Biểu đồ tiến độ học tập</p>
                                    <p className="text-sm text-gray-500 mt-2">TODO(stagewise): Tích hợp Chart.js hoặc Recharts</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-6">Hoạt động gần đây</h2>
                            <div className="space-y-4">
                                {recentActivities.map((activity) => (
                                    <div key={activity.id} className="flex items-start gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                                            activity.type === 'completion' ? 'bg-green-100 text-green-600' :
                                            activity.type === 'enrollment' ? 'bg-blue-100 text-blue-600' :
                                            activity.type === 'creation' ? 'bg-purple-100 text-purple-600' :
                                            'bg-orange-100 text-orange-600'
                                        }`}>
                                            {activity.user.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-900">
                                                <span className="font-medium">{activity.user}</span>
                                                {' '}{activity.action}{' '}
                                                <span className="font-medium text-blue-600">{activity.course}</span>
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                                Xem tất cả hoạt động
                            </button>
                        </div>
                    </div>

                    {/* Top Courses and Quick Actions */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Top Courses */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-6">Khóa học hàng đầu</h2>
                            <div className="space-y-4">
                                {topCourses.map((course) => (
                                    <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">{course.title}</h3>
                                            <div className="flex items-center gap-4 mt-2">
                                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                                    <Users size={14} />
                                                    {course.students}
                                                </div>
                                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                                    <Star size={14} className="text-yellow-500" />
                                                    {course.rating}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-900">{course.revenue}</p>
                                            <div className={`flex items-center gap-1 text-sm mt-1 ${
                                                course.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                                {course.trend === 'up' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                                                {course.trend === 'up' ? '+5.2%' : '-2.1%'}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions & System Status */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="flex flex-col items-center gap-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                        <BookOpen size={24} className="text-blue-600" />
                                        <span className="text-sm font-medium text-blue-700">Tạo khóa học</span>
                                    </button>
                                    <button className="flex flex-col items-center gap-2 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                                        <Users size={24} className="text-green-600" />
                                        <span className="text-sm font-medium text-green-700">Thêm học sinh</span>
                                    </button>
                                    <button className="flex flex-col items-center gap-2 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                                        <GraduationCap size={24} className="text-purple-600" />
                                        <span className="text-sm font-medium text-purple-700">Thêm giáo viên</span>
                                    </button>
                                    <button className="flex flex-col items-center gap-2 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                                        <Award size={24} className="text-orange-600" />
                                        <span className="text-sm font-medium text-orange-700">Tạo chứng chỉ</span>
                                    </button>
                                </div>
                            </div>

                            {/* System Status */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Trạng thái hệ thống</h2>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Máy chủ</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-sm text-green-600">Hoạt động tốt</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Cơ sở dữ liệu</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-sm text-green-600">Hoạt động tốt</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Lưu trữ</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                            <span className="text-sm text-yellow-600">75% đã sử dụng</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;