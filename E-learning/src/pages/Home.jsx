import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { AcademicCapIcon, BookOpenIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const subjects = [
    {
        name: 'Toán',
        desc: 'Ôn tập các đề trắc nghiệm theo chương trình THPT.',
        icon: <span className="text-4xl mb-2">🧮</span>,
        link: '/student/quizzes',
    },
    {
        name: 'Văn',
        desc: 'Ôn tập các đề trắc nghiệm theo chương trình THPT.',
        icon: <span className="text-4xl mb-2">📖</span>,
        link: '/student/quizzes',
    },
    {
        name: 'Anh Văn',
        desc: 'Ôn tập các đề trắc nghiệm theo chương trình THPT.',
        icon: <span className="text-4xl mb-2">🌐</span>,
        link: '/student/quizzes',
    },
    {
        name: 'Vật Lý',
        desc: 'Ôn tập các đề trắc nghiệm Vật Lý THPT.',
        icon: <span className="text-4xl mb-2">🔬</span>,
        link: '/student/quizzes',
    },
    {
        name: 'Hóa Học',
        desc: 'Ôn tập các đề trắc nghiệm Hóa Học THPT.',
        icon: <span className="text-4xl mb-2">⚗️</span>,
        link: '/student/quizzes',
    },
    {
        name: 'Sinh Học',
        desc: 'Ôn tập các đề trắc nghiệm Sinh Học THPT.',
        icon: <span className="text-4xl mb-2">🧬</span>,
        link: '/student/quizzes',
    },
    {
        name: 'Lịch Sử',
        desc: 'Ôn tập các đề trắc nghiệm Lịch Sử THPT.',
        icon: <span className="text-4xl mb-2">🏺</span>,
        link: '/student/quizzes',
    },
    {
        name: 'Địa Lý',
        desc: 'Ôn tập các đề trắc nghiệm Địa Lý THPT.',
        icon: <span className="text-4xl mb-2">🌏</span>,
        link: '/student/quizzes',
    },
    {
        name: 'Tin Học',
        desc: 'Ôn tập các đề trắc nghiệm Tin Học THPT.',
        icon: <span className="text-4xl mb-2">💻</span>,
        link: '/student/quizzes',
    },
    {
        name: 'GDCD',
        desc: 'Ôn tập các đề trắc nghiệm Giáo dục công dân THPT.',
        icon: <span className="text-4xl mb-2">⚖️</span>,
        link: '/student/quizzes',
    },
];

const Home = () => {
    const [startIdx, setStartIdx] = useState(0);
    const itemsPerView = 4;
    const canScrollLeft = startIdx > 0; // Kiểm tra xem có thể cuộn sang trái không
    const canScrollRight = startIdx + itemsPerView < subjects.length; // Kiểm tra xem có thể cuộn sang phải không

    const handlePrev = () => {
        if (canScrollLeft) setStartIdx(startIdx - 1); // Cuộn sang trái
    };
    const handleNext = () => {
        if (canScrollRight) setStartIdx(startIdx + 1); // Cuộn sang phải
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-white text-gray-800">
            {/* Banner thông báo nổi bật */}
            <div className="w-full bg-gradient-to-r from-pink-400 to-indigo-500 text-white py-3 px-6 text-center font-semibold mb-8 rounded-xl shadow">
                🎉 Chào mừng bạn đến với hệ thống ôn luyện trắc nghiệm! Đăng ký ngay để nhận nhiều ưu đãi!
            </div>

            <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg rounded-b-3xl">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">Ôn luyện mọi lúc, mọi nơi!</h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
                    Tham gia hệ thống trắc nghiệm trực tuyến miễn phí, dễ sử dụng, phù hợp học sinh THPT & ôn thi đại học.
                </p>
                <Link
                    to="/student/dashboard"
                    className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-indigo-50 hover:scale-105 transition text-lg"
                >
                    Bắt đầu ngay
                </Link>
            </section>

            {/* Chủ đề phổ biến */}
            <section className="py-16 w-full px-10">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-bold text-gray-800">Chủ đề phổ biến</h2>
                    <Link to="/all-subjects" className="text-indigo-600 font-medium hover:underline hover:text-pink-500 transition">Xem tất cả</Link>
                </div>
                <div className="relative">
                    <button
                        onClick={handlePrev}
                        disabled={!canScrollLeft}
                        className={`absolute -left-15 top-1/2 -translate-y-1/2 z-10 w-16 h-16 flex items-center justify-center bg-white shadow-lg rounded-full border-2 border-indigo-200 transition hover:bg-indigo-100 hover:scale-110 active:scale-95 focus:outline-none ${!canScrollLeft ? 'opacity-30 cursor-not-allowed' : ''}`}
                        aria-label="Trước"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className="flex space-x-8 overflow-hidden justify-center">
                        {subjects.slice(startIdx, startIdx + itemsPerView).map((subject, idx) => ( // Cắt các phần tử từ startIdx đến startIdx + itemsPerView
                            <div // idx : Vị trí trong mảng
                                key={startIdx + idx}
                                className="flex-shrink-0 w-96 h-80 flex flex-col items-center justify-center bg-white rounded-2xl shadow-md hover:shadow-xl transition p-10 text-center border border-gray-100"
                            >
                                {subject.icon}
                                <h3 className="text-xl font-semibold mb-2 text-indigo-700">{subject.name}</h3>
                                <p className="mb-4 text-gray-600 min-h-[48px] flex items-center justify-center">{subject.desc}</p>
                                <Link
                                    to={subject.link}
                                    className="text-indigo-600 font-medium mt-2 inline-block hover:underline hover:text-pink-500 transition"
                                >
                                    Bắt đầu học →
                                </Link>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleNext}
                        disabled={!canScrollRight}
                        className={`absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-16 h-16 flex items-center justify-center bg-white shadow-lg rounded-full border-2 border-indigo-200 transition hover:bg-indigo-100 hover:scale-110 active:scale-95 focus:outline-none ${!canScrollRight ? 'opacity-30 cursor-not-allowed' : ''}`}
                        aria-label="Sau"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </section>

            {/* Tính năng nổi bật */}
            <section className="py-16 w-full">
                <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Tính năng nổi bật</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    <div className="bg-white rounded-xl shadow p-8 text-center flex flex-col items-center">
                        <div className="text-4xl mb-3">📝</div>
                        <h3 className="font-semibold text-lg mb-2">Ngân hàng đề thi đa dạng</h3>
                        <p className="text-gray-600">Hàng ngàn đề thi thử, đề kiểm tra các môn học, cập nhật liên tục.</p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-8 text-center flex flex-col items-center">
                        <div className="text-4xl mb-3">📈</div>
                        <h3 className="font-semibold text-lg mb-2">Phân tích kết quả thông minh</h3>
                        <p className="text-gray-600">Xem lại lịch sử làm bài, phân tích điểm mạnh/yếu, đề xuất lộ trình học tập.</p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-8 text-center flex flex-col items-center">
                        <div className="text-4xl mb-3">⏰</div>
                        <h3 className="font-semibold text-lg mb-2">Thi thử trực tuyến</h3>
                        <p className="text-gray-600">Trải nghiệm thi thử như thật, bấm giờ, chấm điểm tự động.</p>
                    </div>
                </div>
            </section>

            {/* Hướng dẫn sử dụng nhanh */}
            <section className="py-12 w-full">
                <h2 className="text-2xl font-bold text-center mb-8 text-indigo-700">Bắt đầu chỉ với 3 bước</h2>
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                    <div className="flex flex-col items-center">
                        <div className="bg-indigo-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-2">1</div>
                        <div>Đăng ký tài khoản</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-indigo-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-2">2</div>
                        <div>Chọn chủ đề & đề thi</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-indigo-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-2">3</div>
                        <div>Làm bài & xem kết quả</div>
                    </div>
                </div>
            </section>

            {/* Đánh giá học viên */}
            <section className="py-12 w-full bg-white">
                <h2 className="text-2xl font-bold text-center mb-8 text-indigo-700">Học viên nói gì?</h2>
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                    <div className="bg-indigo-50 rounded-xl p-6 shadow w-full md:w-1/3 text-center">
                        <p className="italic mb-4">"Trang web rất dễ sử dụng, đề thi đa dạng và phân tích kết quả rất hữu ích!"</p>
                        <div className="font-semibold">Nguyễn Văn A</div>
                    </div>
                    <div className="bg-indigo-50 rounded-xl p-6 shadow w-full md:w-1/3 text-center">
                        <p className="italic mb-4">"Nhờ luyện đề ở đây mà mình tự tin hơn khi đi thi thật."</p>
                        <div className="font-semibold">Trần Thị B</div>
                    </div>
                </div>
            </section>

            {/* Về chúng tôi */}
            <section className="py-12 w-full bg-gradient-to-r from-indigo-50 to-pink-50">
                <h2 className="text-2xl font-bold text-center mb-8 text-indigo-700">Về chúng tôi</h2>
                <div className="max-w-3xl mx-auto text-center text-gray-700">
                    <p>
                        Hệ thống được phát triển bởi đội ngũ giáo viên và kỹ sư tâm huyết, với mong muốn mang đến trải nghiệm ôn luyện hiệu quả, hiện đại cho học sinh Việt Nam.
                    </p>
                </div>
            </section>

            {/* Đối tác/Logo trường học (placeholder) */}
            <section className="py-12 w-full">
                <h2 className="text-2xl font-bold text-center mb-8 text-indigo-700">Đối tác & Trường học</h2>
                <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                    <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">Logo 1</div>
                    <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">Logo 2</div>
                    <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">Logo 3</div>
                    <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">Logo 4</div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 px-4 max-w-4xl mx-auto flex flex-col">
                <h2 className="text-2xl font-bold mb-8 text-center">Câu hỏi thường gặp</h2>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold text-indigo-600">EduQuiz có miễn phí không?</h4>
                        <p className="text-gray-700">Hiện tại, bạn có thể sử dụng hầu hết các tính năng hoàn toàn miễn phí.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-indigo-600">Tôi có thể làm lại đề thi không?</h4>
                        <p className="text-gray-700">Bạn có thể làm lại đề thi nhiều lần để luyện tập và cải thiện kết quả.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-indigo-600">Làm sao để liên hệ hỗ trợ?</h4>
                        <p className="text-gray-700">Bạn có thể sử dụng nút chat ở góc phải màn hình hoặc gửi email cho chúng tôi.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
