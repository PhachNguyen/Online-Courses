import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Eye,
    EyeOff,
    Code,
    Mail,
    Lock,
    ArrowRight,
    Github,
    Chrome,
    CheckCircle,
    Users,
    BookOpen,
    Award
} from "lucide-react";
import api from "../config/AxiosConfig";

// Utility function for setting auth data
const setAuthData = (token, user, rememberMe = false) => {
    if (rememberMe) {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify(user));
    } else {
        sessionStorage.setItem("accessToken", token);
        sessionStorage.setItem("user", JSON.stringify(user));
    }
};

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubmit = async (e) => {
        e.preventDefault();

        setEmailError("");
        setPasswordError("");

        let valid = true;

        if (!email.trim()) {
            setEmailError("Email is required");
            valid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address");
            valid = false;
        }

        if (!password) {
            setPasswordError("Password is required");
            valid = false;
        } else if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            valid = false;
        }

        if (!valid) return;

        setIsLoading(true);

        try {
            // TODO(stagewise): Replace with actual API call
            // const response = await api.post("/auth/login", {
            //     email: email,
            //     password: password
            // });

            // Mock successful login
            setTimeout(() => {
                const mockUser = { id: 1, email, role: "USER" };
                const mockToken = "mock-jwt-token";

                setAuthData(mockToken, mockUser, rememberMe);

                // Navigate based on role or default to home
                navigate("/Home");
                setIsLoading(false);
            }, 1500);

        } catch (error) {
            console.error("Login error:", error);
            if (error.response?.data?.message) {
                setPasswordError(error.response.data.message);
            } else {
                setPasswordError("Login failed. Please check your credentials.");
            }
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // TODO(stagewise): Replace with actual Google OAuth URL
        // window.location.href = "http://localhost:8080/oauth2/authorization/google";
        console.log("Google login clicked");
    };

    const stats = [
        { icon: <Users className="w-5 h-5" />, number: "25K+", label: "Active Developers" },
        { icon: <BookOpen className="w-5 h-5" />, number: "180+", label: "Expert Courses" },
        { icon: <Award className="w-5 h-5" />, number: "95%", label: "Success Rate" }
    ];

    const features = [
        "Industry-standard curriculum",
        "Real-world projects",
        "Expert mentorship",
        "Job placement assistance",
        "Lifetime access to materials",
        "Community support"
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Left Side - Branding & Features */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-12 flex-col justify-between relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />

                {/* Content */}
                <div className="relative z-10">
                    {/* Logo */}
                    <Link to="/Home" className="flex items-center gap-3 mb-12">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Code className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold">
                            Dev<span className="text-blue-400">Academy</span>
                        </span>
                    </Link>

                    {/* Main Content */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                                Master Modern
                                <span className="block text-blue-400">Development</span>
                            </h1>
                            <p className="text-xl text-gray-300 leading-relaxed">
                                Join thousands of developers advancing their careers with cutting-edge skills and real-world projects.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                    <span className="text-gray-300">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="relative z-10 grid grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="flex items-center justify-center text-blue-400 mb-2">
                                {stat.icon}
                            </div>
                            <div className="text-2xl font-bold mb-1">{stat.number}</div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center">
                        <Link to="/Home" className="inline-flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Code className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">
                                Dev<span className="text-blue-600">Academy</span>
                            </span>
                        </Link>
                    </div>

                    {/* Header */}
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Welcome back
                        </h2>
                        <p className="text-gray-600">
                            Sign in to continue your learning journey
                        </p>
                    </div>

                    {/* Social Login */}
                    <div className="space-y-3">
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Chrome className="w-5 h-5 text-red-500" />
                            <span className="font-medium text-gray-700">Continue with Google</span>
                        </button>

                        <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <Github className="w-5 h-5 text-gray-900" />
                            <span className="font-medium text-gray-700">Continue with GitHub</span>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-50 text-gray-500">Or continue with email</span>
                        </div>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        const newEmail = e.target.value;
                                        setEmail(newEmail);
                                        if (emailError && emailRegex.test(newEmail)) {
                                            setEmailError("");
                                        }
                                    }}
                                    onFocus={() => setEmailError("")}
                                    placeholder="Enter your email"
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${emailError ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                />
                            </div>
                            {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
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
                                    placeholder="Enter your password"
                                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${passwordError ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                                Sign up for free
                            </Link>
                        </p>
                    </div>

                    {/* Terms */}
                    <p className="text-xs text-gray-500 text-center">
                        By signing in, you agree to our{" "}
                        <Link to="/terms" className="text-blue-600 hover:text-blue-500">Terms of Service</Link>
                        {" "}and{" "}
                        <Link to="/privacy" className="text-blue-600 hover:text-blue-500">Privacy Policy</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}