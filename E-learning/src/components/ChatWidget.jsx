import React, { useState } from 'react';

const ChatWidget = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            {/* Nút chat nổi */}
            <button
                onClick={() => setOpen((v) => !v)}
                className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center text-3xl hover:scale-110 transition"
                aria-label="Chat với admin"
            >
                💬
            </button>
            {/* Khung chat */}
            {open && (
                <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-fade-in">
                    <div className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-4 py-3 font-bold flex justify-between items-center">
                        Chat với Admin
                        <button onClick={() => setOpen(false)} className="text-white text-xl font-bold">×</button>
                    </div>
                    <div className="flex-1 p-4 text-gray-700 text-sm" style={{ minHeight: '120px' }}>
                        <div className="text-gray-400 text-center">Chức năng chat sẽ sớm ra mắt!</div>
                    </div>
                    <div className="p-2 border-t bg-gray-50">
                        <input
                            type="text"
                            className="w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring"
                            placeholder="Nhập tin nhắn... (chưa hoạt động)"
                            disabled
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatWidget;
