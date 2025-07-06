import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/Logo_header.png";

const menuItems = [
    { label: "Tính năng", to: "#" },
    { label: "Khám phá đề thi", to: "#" },
    { label: "Tổ chức thi", to: "#" },
    { label: "Luyện thi THPT Quốc Gia", to: "#" },
    { label: "Bảng giá", to: "#" },
    { label: "Tin tức", to: "#" },
    { label: "Liên hệ", to: "#" },
];

const Header = () => {
    return (
        <header className="w-full bg-white shadow-sm border-b">
            <div className="flex items-center justify-between px-12 py-6">
                {/* Logo + Brand */}
                <Link to="/Home" className="flex items-center gap-7 min-w-[240px]">
                    <img src={logo} alt="Logo" className="w-34 h-32 object-contain rounded-xl shadow-lg" />
                    <span
                        className="text-5xl font-extrabold tracking-wide select-none"
                        style={{
                            background: "linear-gradient(90deg, #4F46E5 0%, #7C3AED 50%, #D946EF 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text"
                        }}
                    >
                        PNQuiz
                    </span>
                </Link>
                {/* Menu */}
                <nav className="flex-1 flex justify-center gap-12">
                    {menuItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.to}
                            className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition px-2"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
                {/* Đăng nhập */}
                <Link
                    to="/login"
                    style={{
                        background: "linear-gradient(90deg, #4F46E5 0%, #7C3AED 50%, #D946EF 100%)",
                        color: "#fff",
                        borderRadius: "9999px",
                        padding: "12px 32px",
                        fontWeight: "bold",
                        fontSize: "1.125rem",
                        boxShadow: "0 4px 24px 0 rgba(80,0,200,0.10)",
                        display: "inline-block"
                    }}
                >
                    Đăng nhập
                </Link>
            </div>
        </header>
    );
};

export default Header;
