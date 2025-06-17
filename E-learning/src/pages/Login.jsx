import React from "react";
import login_learning from "../assets/images/login_learning.png";
import google_icon from "../assets/images/google_icon.webp";
export default function LoginPage() {
    return (
        //  Phủ toàn màn hình 
        // overflow-hidden : Ẩn nội  dung bị tràn ra ngoài 
        <div className="m-6 h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex bg-white">

            {/*  Image  */}
            <div className="w-1/2 h-full p-11 ">
                <div className="relative w-[80%] ">
                    <img
                        src={login_learning}
                        alt="Image Login"
                        className="w-full  "
                    />
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-1/2 flex items-center justify-center bg-white px-10">
                <div className="w-full max-w-md space-y-6 ">
                    <h2 className="text-4xl font-semibold text-gray-800">Đăng nhập</h2>

                    <button className="w-full py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white  rounded shadow hover:opacity-90">
                        <img
                            src={google_icon}
                            alt="Google"
                            className="w-5 h-5"
                        />
                        Đăng nhập bằng Google
                    </button>

                    <div className="flex items-center justify-between">
                        <hr className="flex-1 border-gray-300" />
                        <span className="text-base text-gray-400 mx-4">hoặc tiếp tục với</span>
                        <hr className="flex-1 border-gray-300" />
                    </div>

                    <form className="space-y-6">
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="block text-base font-medium text-gray-700 text-left">
                                Tài khoản đăng nhập
                            </label>
                            <input
                                type="email"
                                placeholder="Nhập tài khoản hoặc email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                                required
                            />
                            {/* <p className="text-sm text-red-500 mt-1">Trường này là bắt buộc.</p> */}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="block text-base font-medium text-gray-700 text-left">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Nhập mật khẩu của bạn"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                                    required
                                />
                                <span className="absolute right-3 top-2.5 text-indigo-600 cursor-pointer text-lg">
                                    👁️
                                </span>
                            </div>
                            {/* <p className="text-sm text-red-500 mt-1">Trường này là bắt buộc.</p> */}
                        </div>
                        {/*  Tạo div cha */}
                        <div className="flex justify-between items-center  pt-1 pb-3">
                            {/* Nhớ mật khẩu */}
                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer ">
                                <input type="checkbox" className="w-4 h-4 form-checkbox accent-indigo-500" />
                                Nhớ mật khẩu
                            </label>

                            {/* Quên mật khẩu */}
                            <a href="#" className="text-sm text-blue-600 hover:underline">
                                Quên mật khẩu?
                            </a>
                        </div>


                        {/* Nút đăng nhập */}
                        <button

                            className="w-full py-3 bg-gradient-to-r text-xl from-indigo-500 to-pink-500 text-white text-base font-semibold rounded-md shadow hover:opacity-90 transition"
                        >
                            Đăng nhập
                        </button>
                        {/* Đăng ký */}
                        <div className="text-center mt-4 text-sm text-gray-600">
                            Bạn chưa có tài khoản?
                            <a href="#" className="ml-1 text-blue-600 font-medium hover:underline">
                                Đăng ký
                            </a>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}
