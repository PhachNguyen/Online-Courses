import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Code, Users, BookOpen, Award } from "lucide-react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const menuItems = [
        {
            label: "Courses",
            to: "/courses",
            dropdown: [
                { label: "Frontend Development", to: "/courses/frontend", icon: <Code className="w-4 h-4" /> },
                { label: "Backend Development", to: "/courses/backend", icon: <Code className="w-4 h-4" /> },
                { label: "Full Stack", to: "/courses/fullstack", icon: <Code className="w-4 h-4" /> },
                { label: "Data Science", to: "/courses/data-science", icon: <Code className="w-4 h-4" /> }
            ]
        },
        {
            label: "Learning Paths",
            to: "/learning-paths"
        },
        {
            label: "For Business",
            to: "/business"
        },
        {
            label: "Community",
            to: "/community"
        },
        {
            label: "Pricing",
            to: "/pricing"
        }
    ];

    return (
        <header className="w-full bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/Home" className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Code className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-gray-900">
                            Dev<span className="text-blue-600">Academy</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {menuItems.map((item) => (
                            <div key={item.label} className="relative">
                                {item.dropdown ? (
                                    <div
                                        className="relative"
                                        onMouseEnter={() => setActiveDropdown(item.label)}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                                            {item.label}
                                            <ChevronDown className="w-4 h-4" />
                                        </button>
                                        
                                        {activeDropdown === item.label && (
                                            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                                                {item.dropdown.map((dropdownItem) => (
                                                    <Link
                                                        key={dropdownItem.label}
                                                        to={dropdownItem.to}
                                                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                                                    >
                                                        {dropdownItem.icon}
                                                        {dropdownItem.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        to={item.to}
                                        className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Auth Buttons */}
                    <div className="hidden lg:flex items-center gap-4">
                        <Link
                            to="/login"
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/register"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-200">
                    <div className="px-4 py-2 space-y-1">
                        {menuItems.map((item) => (
                            <div key={item.label}>
                                <Link
                                    to={item.to}
                                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                                {item.dropdown && (
                                    <div className="ml-4 space-y-1">
                                        {item.dropdown.map((dropdownItem) => (
                                            <Link
                                                key={dropdownItem.label}
                                                to={dropdownItem.to}
                                                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {dropdownItem.icon}
                                                {dropdownItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="border-t border-gray-200 pt-4 space-y-2">
                            <Link
                                to="/login"
                                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="block px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;