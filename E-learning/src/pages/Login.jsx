import React, { useState } from "react";
import { Link } from "react-router-dom";
import login_learning from "../assets/images/login_learning.png";
import google_icon from "../assets/images/google_icon.webp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubmit = (e) => {
        e.preventDefault();

        setEmailError("");
        setPasswordError("");

        let valid = true;

        if (!email.trim()) {
            setEmailError("Email không được để trống.");
            valid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError("Email không hợp lệ.");
            valid = false;
        }

        if (!password) {
            setPasswordError("Mật khẩu không được để trống.");
            valid = false;
        } else if (password.length < 6) {
            setPasswordError("Mật khẩu phải có ít nhất 6 ký tự.");
            valid = false;
        }

        if (!valid) return;

        console.log("Đăng nhập với", { email, password });
        // Gửi request đăng nhập ở đây...
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-200 to-pink-200">
            <div className="w-full max-w-[1200px] rounded-3xl overflow-hidden shadow-2xl flex bg-white mx-96">
                {/* Left image */}
                <div className="w-1/2 hidden md:flex items-center justify-center">
                    <img src={login_learning} alt="Login" className="w-[95%]" />
                </div>

                {/* Right form */}
                <div className="w-full md:w-1/2 flex items-center justify-center px-10">
                    <div className="w-full max-w-md space-y-6">
                        <h2 className="text-center text-4xl font-semibold text-gray-800">
                            Đăng nhập
                        </h2>

                        <button className="w-full py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded shadow hover:opacity-90">
                            <img src={google_icon} alt="Google" className="w-5 h-5" />
                            Đăng nhập bằng Google
                        </button>

                        <div className="flex items-center justify-between">
                            <hr className="flex-1 border-gray-300" />
                            <span className="mx-4 text-base text-gray-400">
                                hoặc tiếp tục với
                            </span>
                            <hr className="flex-1 border-gray-300" />
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Email */}
                            <div className="space-y-2">
                                <label className="block text-base font-medium text-gray-700 text-left">
                                    Tài khoản đăng nhập
                                </label>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => {
                                        const newEmail = e.target.value;
                                        setEmail(newEmail);
                                        if (emailError && emailRegex.test(newEmail)) {
                                            setEmailError("");
                                        }
                                    }}
                                    onFocus={() => setEmailError("")}
                                    placeholder="Nhập tài khoản hoặc email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                                />
                                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="block text-base font-medium text-gray-700 text-left">
                                    Mật khẩu
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => {
                                            const newPass = e.target.value;
                                            setPassword(newPass);
                                            if (passwordError && newPass.length >= 6) {
                                                setPasswordError("");
                                            }
                                        }}
                                        onFocus={() => setPasswordError("")}
                                        placeholder="Nhập mật khẩu của bạn"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-indigo-600 cursor-pointer text-lg"
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </span>
                                </div>
                                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                            </div>

                            <div className="flex justify-between items-center pt-1 pb-3">
                                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 form-checkbox accent-indigo-500"
                                    />
                                    Nhớ mật khẩu
                                </label>
                                <a href="#" className="text-sm text-blue-600 hover:underline">
                                    Quên mật khẩu?
                                </a>
                            </div>

                            <button
                                // type="submit"
                                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-base font-semibold rounded-md shadow hover:opacity-90 transition"
                            >
                                Đăng nhập
                            </button>

                            <div className="text-center mt-4 text-sm text-gray-600">
                                Bạn chưa có tài khoản?
                                <Link
                                    to="/register"
                                    className="ml-1 text-blue-600 font-medium hover:underline"
                                >
                                    Đăng ký
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
