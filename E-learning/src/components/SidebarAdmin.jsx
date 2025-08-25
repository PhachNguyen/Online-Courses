import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Home,
    BookOpen,
    Users,
    GraduationCap,
    Settings,
    BarChart3,
    Calendar,
    FileText,
    Award,
    Bell,
    ChevronDown,
    ChevronRight,
    Plus,
    UserPlus,
    BookPlus,
    Shield,
    LogOut
} from "lucide-react";

const SidebarAdmin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [expandedMenus, setExpandedMenus] = useState({
        students: true // Mở sẵn menu học sinh
    });

    // Xác định item active dựa trên URL hiện tại
    const getActiveItem = () => {
        const path = location.pathname;
        if (path === '/adminDashBroad') return 'dashboard';
        if (path === '/admin/students') return 'all-students';
        if (path === '/admin/teachers') return 'all-teachers';
        if (path === '/admin/courses') return 'all-courses';
        return 'dashboard';
    };

    const [activeItem, setActiveItem] = useState(getActiveItem());

    const toggleMenu = (menuKey) => {
        setExpandedMenus(prev => ({
            ...prev,
            [menuKey]: !prev[menuKey]
        }));
    };

    const handleItemClick = (itemKey, path) => {
        setActiveItem(itemKey);
        if (path) {
            navigate(path);
        }
    };

    const menuItems = [
        {
            key: 'dashboard',
            label: 'Dashboard',
            icon: Home,
            path: '/admin/dashboard'
        },
        {
            key: 'courses',
            label: 'Quản lý Khóa học',
            icon: BookOpen,
            hasSubmenu: true,
            submenu: [
                { key: 'all-courses', label: 'Tất cả khóa học', icon: BookOpen, path: '/admin/courses' },
                { key: 'add-course', label: 'Thêm khóa học', icon: BookPlus, path: '/admin/courses/add' },
                { key: 'course-categories', label: 'Danh mục', icon: FileText, path: '/admin/courses/categories' },
                { key: 'course-analytics', label: 'Thống kê khóa học', icon: BarChart3, path: '/admin/courses/analytics' }
            ]
        },
        {
            key: 'teachers',
            label: 'Quản lý Giáo viên',
            icon: GraduationCap,
            hasSubmenu: true,
            submenu: [
                { key: 'all-teachers', label: 'Tất cả giáo viên', icon: Users, path: '/admin/teachers' },
                //      { key: 'add-teacher', label: 'Thêm giáo viên', icon: UserPlus, path: '/admin/teachers/add' },
                { key: 'teacher-performance', label: 'Đánh giá giáo viên', icon: Award, path: '/admin/teachers/performance' },
                { key: 'teacher-schedule', label: 'Lịch giảng dạy', icon: Calendar, path: '/admin/teachers/schedule' }
            ]
        },
        {
            key: 'students',
            label: 'Quản lý Học sinh',
            icon: Users,
            hasSubmenu: true,
            submenu: [
                { key: 'all-students', label: 'Tất cả học sinh', icon: Users, path: '/admin/students' },
                { key: 'student-progress', label: 'Tiến độ học tập', icon: BarChart3, path: '/admin/students/progress' },
                { key: 'student-grades', label: 'Điểm số', icon: Award, path: '/admin/students/grades' },
                //      { key: 'student-attendance', label: 'Điểm danh', icon: Calendar, path: '/admin/students/attendance' }
            ]
        },
        {
            key: 'analytics',
            label: 'Báo cáo & Thống kê',
            icon: BarChart3,
            path: '/admin/analytics'
        },
        {
            key: 'notifications',
            label: 'Thông báo',
            icon: Bell,
            path: '/admin/notifications',
            badge: '3'
        },
        {
            key: 'settings',
            label: 'Cài đặt hệ thống',
            icon: Settings,
            hasSubmenu: true,
            submenu: [
                { key: 'general-settings', label: 'Cài đặt chung', icon: Settings, path: '/admin/settings/general' },
                { key: 'permissions', label: 'Phân quyền', icon: Shield, path: '/admin/settings/permissions' },
                { key: 'system-logs', label: 'Nhật ký hệ thống', icon: FileText, path: '/admin/settings/logs' }
            ]
        }
    ];

    const MenuItem = ({ item, level = 0 }) => {
        const Icon = item.icon;
        const isActive = activeItem === item.key;
        const isExpanded = expandedMenus[item.key];

        return (
            <div className={`${level > 0 ? 'ml-4' : ''}`}>
                <button
                    onClick={() => {
                        if (item.hasSubmenu) {
                            toggleMenu(item.key);
                        } else if (item.onClick) {
                            item.onClick();
                        } else {
                            handleItemClick(item.key, item.path);
                        }
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                        } ${level > 0 ? 'text-sm' : ''}`}
                >
                    <div className="flex items-center gap-3">
                        <Icon
                            size={level > 0 ? 16 : 20}
                            className={`${isActive ? 'text-white' : 'text-gray-500 group-hover:text-blue-500'} transition-colors`}
                        />
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                {item.badge}
                            </span>
                        )}
                    </div>

                    {item.hasSubmenu && (
                        <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                            <ChevronDown size={16} className={isActive ? 'text-white' : 'text-gray-400'} />
                        </div>
                    )}
                </button>

                {item.hasSubmenu && isExpanded && (
                    <div className="mt-2 space-y-1 animate-in slide-in-from-top-1 duration-200">
                        {item.submenu.map((subItem) => (
                            <MenuItem
                                key={subItem.key}
                                item={{
                                    ...subItem,
                                    onClick: () => handleItemClick(subItem.key, subItem.path)
                                }}
                                level={1}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <aside className="w-72 bg-white text-gray-700 h-screen border-r border-gray-200 shadow-sm flex flex-col">
            {/* Logo & Brand */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <GraduationCap className="text-white" size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">E-Learning</h1>
                        <p className="text-sm text-gray-500">Admin Panel</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-b border-gray-200">
                <div className="grid grid-cols-3 gap-2">
                    <button
                        onClick={() => navigate('/admin/courses/add')}
                        className="flex flex-col items-center gap-1 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors group"
                    >
                        <BookPlus size={16} className="text-green-600 group-hover:text-green-700" />
                        <span className="text-xs text-green-700 font-medium">Khóa học</span>
                    </button>
                    <button
                        onClick={() => navigate('/admin/teachers/add')}
                        className="flex flex-col items-center gap-1 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group"
                    >
                        <UserPlus size={16} className="text-blue-600 group-hover:text-blue-700" />
                        <span className="text-xs text-blue-700 font-medium">Giáo viên</span>
                    </button>
                    <button
                        onClick={() => navigate('/admin/students')}
                        className="flex flex-col items-center gap-1 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors group"
                    >
                        <Plus size={16} className="text-purple-600 group-hover:text-purple-700" />
                        <span className="text-xs text-purple-700 font-medium">Học sinh</span>
                    </button>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => (
                    <MenuItem key={item.key} item={item} />
                ))}
            </nav>

            {/* User Profile & Logout */}
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">A</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">Admin User</p>
                        <p className="text-xs text-gray-500">admin@elearning.com</p>
                    </div>
                    <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <LogOut size={16} className="text-gray-500" />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default SidebarAdmin;