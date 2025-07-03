import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-600 py-4 px-8 mt-10 text-center border-t">
            <div className="mb-2">© {new Date().getFullYear()} E-Learning. All rights reserved.</div>
            <div className="flex justify-center gap-4">
                <a href="#" className="hover:text-indigo-600">Facebook</a>
                <a href="#" className="hover:text-indigo-600">Twitter</a>
                <a href="#" className="hover:text-indigo-600">LinkedIn</a>
            </div>
        </footer>
    );
};

export default Footer; 