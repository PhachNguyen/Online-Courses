import React from "react";
import { UserRound, GraduationCap } from "lucide-react";

const Sidebar = () => {
    return (
        <aside className="w-64 bg-white shadow-md p-6 border-r">
            <h2 className="text-2xl font-bold text-purple-600 mb-8">EduQuiz Studio</h2>
            <nav className="space-y-4">
                {/* Cá nhân */}
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase">
                    <UserRound className="w-6 h-6" />
                    Cá nhân
                </div>
                <ul className="space-y-3 px-4 text-sm ">
                    <li className="text-gray-700 hover:text-purple-600 cursor-pointer">Khám phá đề thi</li>
                    <li className="text-gray-700 hover:text-purple-600 cursor-pointer">Thư viện của tôi</li>
                    <li className="text-gray-700 hover:text-purple-600 cursor-pointer">Truy cập gần đây</li>
                    <li className="text-gray-700 hover:text-purple-600 cursor-pointer">Đề thi yêu thích</li>
                    <li className="text-gray-700 hover:text-purple-600 cursor-pointer">Kết quả của tôi</li>
                    <li className="text-gray-700 hover:text-purple-600 cursor-pointer">BXH thi đua</li>
                </ul>

                {/* Quản lý */}
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase">
                    <GraduationCap className="w-6 h-6" />
                    Quản lý
                </div>
                <ul className="space-y-3 text-sm px-4">
                    <li className="text-purple-600 font-semibold cursor-pointer">Đề thi</li>
                    <li className="text-gray-700 hover:text-purple-600 cursor-pointer">Chuyên mục</li>
                    <li className="text-gray-700 hover:text-purple-600 cursor-pointer">Gói dịch vụ</li>
                    <li className="text-gray-700 hover:text-purple-600 cursor-pointer">Cài đặt</li>
                </ul>

                {/* Khác */}
                <div className="mt-6 text-sm font-semibold text-gray-500 uppercase">Khác</div>
                <ul className="space-y-2 text-sm">
                    <li className="text-gray-700 hover:text-purple-600 cursor-pointer">Hướng dẫn sử dụng</li>
                    <li className="text-gray-700 hover:text-purple-600 cursor-pointer">Điều khoản & chính sách</li>
                    <li className="text-gray-700 hover:text-purple-600 cursor-pointer">Hỗ trợ khách hàng</li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
