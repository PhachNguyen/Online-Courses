
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Eye,
    EyeOff,
    Code,
    Mail,
    Lock,
    User,
    ArrowRight,
    Chrome,
    Github,
    CheckCircle
} from "lucide-react";
import api from "../config/AxiosConfig";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validate = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Name is required";
        if (!email.trim()) newErrors.email = "Email is required";
        else if (!emailRegex.test(email)) newErrors.email = "Please enter a valid email address";
        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
        else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;
        setIsLoading(true);
        try {
            // TODO: Replace with actual API call
            // await api.post("/auth/register", { name, email, password });
            setTimeout(() => {
                navigate("/login");
                setIsLoading(false);
            }, 1500);
        } catch (error) {
            setErrors({ api: error.response?.data?.message || "Registration failed. Please try again." });
            setIsLoading(false);
        }
    };

    const handleGoogleRegister = () => {
        // TODO: Replace with actual Google OAuth URL
        console.log("Google register clicked");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Left Side - Branding & Features */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-12 flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
                <div className="relative z-10">
                    <Link to="/Home" className="flex items-center gap-3 mb-12">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Code className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold">
                            Dev<span className="text-blue-400">Academy</span>
                        </span>
                    </Link>
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                                Start Your
                                <span className="block text-blue-400">Learning Journey</span>
                            </h1>
                            <p className="text-xl text-gray-300 leading-relaxed">
                                Unlock your potential with expert-led courses and a vibrant developer community.
                            </p>
                        </div>
                        <div className="space-y-4">
                            {["Free resources for beginners", "Mentorship from industry experts", "Project-based learning", "Career support", "Community events", "Lifetime access"].map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                    <span className="text-gray-300">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Right Side - Register Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
                <div className="w-full max-w-xl bg-white/90 rounded-2xl shadow-2xl p-8 md:p-12 lg:p-16 xl:p-20 max-h-[95vh] overflow-auto border border-blue-100 backdrop-blur-md">
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
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 mt-8">
                            Create your account
                        </h2>
                        <p className="text-lg text-gray-600">
                            Join us and start your learning adventure
                        </p>
                    </div>
                    {/* Social Register */}
                    <div className="space-y-3">
                        <button
                            onClick={handleGoogleRegister}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Chrome className="w-5 h-5 text-red-500" />
                            <span className="font-medium text-gray-700">Sign up with Google</span>
                        </button>
                        <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <Github className="w-5 h-5 text-gray-900" />
                            <span className="font-medium text-gray-700">Sign up with GitHub</span>
                        </button>
                    </div>
                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-50 text-gray-500">Or sign up with email</span>
                        </div>
                    </div>
                    {/* Register Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition ${errors.name ? 'border-red-300' : 'border-gray-300'}`}
                                />
                            </div>
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>
                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className={`w-full pl-10 pr-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-1  text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-0"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>
                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your password"
                                    className={`w-full pl-10 pr-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-1 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                        </div>
                        {/* API Error */}
                        {errors.api && <p className="text-sm text-red-600 text-center">{errors.api}</p>}
                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Signing up...
                                </>
                            ) : (
                                <>
                                    Sign up
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                    {/* Sign In Link */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                                Sign in
                            </Link>
                        </p>
                    </div>
                    {/* Terms */}
                    <p className="text-xs text-gray-500 text-center">
                        By signing up, you agree to our{' '}
                        <Link to="/terms" className="text-blue-600 hover:text-blue-500">Terms of Service</Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="text-blue-600 hover:text-blue-500">Privacy Policy</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
