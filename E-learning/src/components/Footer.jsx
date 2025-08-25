import React from "react";
import { Link } from "react-router-dom";
import { Code, Github, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        courses: [
            { label: "Frontend Development", to: "/courses/frontend" },
            { label: "Backend Development", to: "/courses/backend" },
            { label: "Full Stack Development", to: "/courses/fullstack" },
            { label: "Data Science", to: "/courses/data-science" },
            { label: "Mobile Development", to: "/courses/mobile" }
        ],
        company: [
            { label: "About Us", to: "/about" },
            { label: "Careers", to: "/careers" },
            { label: "Blog", to: "/blog" },
            { label: "Press", to: "/press" },
            { label: "Contact", to: "/contact" }
        ],
        support: [
            { label: "Help Center", to: "/help" },
            { label: "Community", to: "/community" },
            { label: "Student Success", to: "/student-success" },
            { label: "System Status", to: "/status" },
            { label: "Bug Reports", to: "/bugs" }
        ],
        legal: [
            { label: "Privacy Policy", to: "/privacy" },
            { label: "Terms of Service", to: "/terms" },
            { label: "Cookie Policy", to: "/cookies" },
            { label: "GDPR", to: "/gdpr" }
        ]
    };

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link to="/Home" className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Code className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-2xl font-bold">
                                Dev<span className="text-blue-400">Academy</span>
                            </span>
                        </Link>
                        
                        <p className="text-gray-300 leading-relaxed max-w-md">
                            Master modern development skills with industry experts. 
                            Build real projects, get job-ready, and advance your tech career.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-gray-300">
                                <Mail className="w-4 h-4" />
                                <span>hello@devacademy.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-300">
                                <Phone className="w-4 h-4" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-300">
                                <MapPin className="w-4 h-4" />
                                <span>San Francisco, CA</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            <a
                                href="#"
                                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-colors"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-colors"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-colors"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Courses */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white">Courses</h3>
                        <ul className="space-y-3">
                            {footerLinks.courses.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white">Support</h3>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white">Legal</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter Signup */}
                <div className="py-8 border-t border-gray-800">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                                Stay updated with new courses
                            </h3>
                            <p className="text-gray-300">
                                Get notified about new courses, updates, and exclusive offers.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-gray-400 text-sm">
                            © {currentYear} DevAcademy. All rights reserved.
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                            <span>Made with ❤️ for developers</span>
                            <div className="flex items-center gap-4">
                                <span>🌍 English</span>
                                <span>💰 USD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;