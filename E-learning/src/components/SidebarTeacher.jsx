


import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Home,
    FileText,
    BarChart3,
    LogOut,
    BookOpen,
    Users,
    Bell,
    Plus
} from "lucide-react";

const SidebarTeacher = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Xác định item active dựa trên URL hiện tại
    const getActiveItem = () => {
        const path = location.pathname;
        if (path === "/dashboardTeacher") return "dashboard";
        if (path.startsWith("/dashboardTeacher/quizzes")) return "quizzes";
        if (path.startsWith("/dashboardTeacher/statistics")) return "statistics";
        if (path.startsWith("/dashboardTeacher/notifications")) return "notifications";
        return "dashboard";
    };

    const [activeItem, setActiveItem] = useState(getActiveItem());

    const handleItemClick = (itemKey, path) => {
        setActiveItem(itemKey);
        if (path) {
            navigate(path);
        }
    };

    const menuItems = [
        {
            key: "dashboard",
            label: "Dashboard",
            icon: Home,
            path: "/dashboardTeacher"
        },
        {
            key: "quizzes",
            label: "Quản lý đề thi",
            icon: FileText,
            path: "/dashboardTeacher/quizzes"
        },
        {
            key: "students",
            label: "Quản lý học sinh",
            icon: Users,
            path: "/dashboardTeacher/students"
        },
        {
            key: "course",
            label: "Quản lý khóa học",
            icon: Users,
            path: "/dashboardTeacher/course"
        },
        {
            key: "statistics",
            label: "Thống kê",
            icon: BarChart3,
            path: "/dashboardTeacher/statistics"
        },
        {
            key: "notifications",
            label: "Thông báo",
            icon: Bell,
            path: "/dashboardTeacher/notifications",
            badge: "2"
        }
    ];

    const MenuItem = ({ item }) => {
        const Icon = item.icon;
        const isActive = activeItem === item.key;
        return (
            <button
                onClick={() => handleItemClick(item.key, item.path)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
            >
                <div className="flex items-center gap-3">
                    <Icon size={20} className={`${isActive ? "text-white" : "text-gray-500 group-hover:text-blue-500"} transition-colors`} />
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {item.badge}
                        </span>
                    )}
                </div>
            </button>
        );
    };

    return (
        <aside className="h-full min-h-screen bg-white border-r flex flex-col items-center py-6 shadow-md w-64">
            {/* Logo & Brand */}
            <div className="flex flex-col items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-2">
                    <BookOpen className="text-white" size={28} />
                </div>
                <h1 className="text-xl font-bold text-gray-800">E-Learning</h1>
                <p className="text-sm text-gray-500">Teacher Panel</p>
            </div>

            {/* Quick Actions */}
            <div className="w-full px-4 mb-6">
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => navigate("/dashboardTeacher/quizzes/add")}
                        className="flex flex-col items-center gap-1 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors group"
                    >
                        <Plus size={16} className="text-green-600 group-hover:text-green-700" />
                        <span className="text-xs text-green-700 font-medium">Đề thi</span>
                    </button>
                    <button
                        onClick={() => navigate("/dashboardTeacher/students")}
                        className="flex flex-col items-center gap-1 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group"
                    >
                        <Users size={16} className="text-blue-600 group-hover:text-blue-700" />
                        <span className="text-xs text-blue-700 font-medium">Học sinh</span>
                    </button>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 w-full px-4 space-y-2">
                {menuItems.map((item) => (
                    <MenuItem key={item.key} item={item} />
                ))}
            </nav>

            {/* User Profile & Logout */}
            <div className="w-full px-4 mt-6">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">T</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">Teacher User</p>
                        <p className="text-xs text-gray-500">teacher@elearning.com</p>
                    </div>
                    <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <LogOut size={16} className="text-gray-500" />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default SidebarTeacher;
