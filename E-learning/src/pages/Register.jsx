import React, { useState } from "react";
import login_learning from "../assets/images/login_learning.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function RegisterPage() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agree, setAgree] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!fullName.trim()) {
            newErrors.fullName = "Họ và tên không được để trống.";
        }

        if (!email) {
            newErrors.email = "Email không được để trống.";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Email không hợp lệ.";
        }

        if (!password) {
            newErrors.password = "Mật khẩu không được để trống.";
        } else if (password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu.";
        } else if (confirmPassword !== password) {
            newErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
        }

        if (!agree) {
            newErrors.agree = "Bạn cần đồng ý với điều khoản.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Đăng ký thành công với:", { fullName, email, password });

        }
    };

    return (
        <div className="justify-center items-center m-6 h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex bg-white mx-96">
            <div className="w-1/2 hidden md:flex items-center justify-center">
                <img src={login_learning} alt="Login" className="w-[95%] h-auto object-contain" />
            </div>

            <div className="w-1/2 flex items-center justify-center bg-white px-10">
                <div className="w-full max-w-md space-y-6">
                    <h2 className="text-4xl text-center font-semibold text-gray-800 pt-6">Đăng ký</h2>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Họ và tên */}
                        <div className="space-y-2">
                            <label className="block text-base font-medium text-gray-700 text-left">Họ và tên</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                onFocus={() => setErrors(prev => ({ ...prev, fullName: "" }))}
                                placeholder="Nhập họ và tên của bạn"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            />
                            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="block text-base font-medium text-gray-700 text-left">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setErrors(prev => ({ ...prev, email: "" }))}
                                placeholder="Nhập email của bạn"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        {/* Mật khẩu */}
                        <div className="space-y-2">
                            <label className="block text-base font-medium text-gray-700 text-left">Mật khẩu</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setErrors(prev => ({ ...prev, password: "" }))}
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
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        {/* Xác nhận mật khẩu */}
                        <div className="space-y-2">
                            <label className="block text-base font-medium text-gray-700 text-left">Xác nhận mật khẩu</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onFocus={() => setErrors(prev => ({ ...prev, confirmPassword: "" }))}
                                placeholder="Nhập lại mật khẩu"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                        </div>

                        {/* Đồng ý điều khoản */}
                        <div>
                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={agree}
                                    onChange={(e) => {
                                        setAgree(e.target.checked);
                                        setErrors(prev => ({ ...prev, agree: "" }));
                                    }}
                                    className="w-4 h-4 form-checkbox accent-indigo-500"
                                />
                                Tôi đồng ý với các điều khoản và điều kiện
                            </label>
                            {errors.agree && <p className="text-red-500 text-sm mt-1">{errors.agree}</p>}
                        </div>

                        {/* Nút đăng ký */}
                        <button
                            // type="submit"
                            className="w-full py-3 text-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-md shadow hover:opacity-90 transition"
                        >
                            Đăng ký
                        </button>

                        <div className="text-center mt-4 text-sm text-gray-600 pb-5">
                            Bạn đã có tài khoản?
                            <a href="/login" className="ml-1 text-blue-600 font-medium hover:underline ">
                                Đăng nhập
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
