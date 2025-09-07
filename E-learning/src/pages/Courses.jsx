

import React from 'react';
import Quiz1 from '../assets/images/quiz/Quiz1.jpg';
import Quiz2 from '../assets/images/quiz/Quiz2.jpg';
import Quiz3 from '../assets/images/quiz/quiz3.jpg';

const fakeCourses = [
    {
        id: 1,
        title: 'ReactJS Cơ bản',
        description: 'Học ReactJS từ cơ bản đến nâng cao, thực hành dự án thực tế.',
        teacher: 'Nguyễn Văn A',
        studentsCount: 120,
        status: 'active',
        createAt: '2024-07-01',
        image: Quiz1,
    },
    {
        id: 2,
        title: 'NodeJS & Express',
        description: 'Xây dựng backend API với NodeJS, Express và MongoDB.',
        teacher: 'Trần Thị B',
        studentsCount: 95,
        status: 'active',
        createAt: '2024-06-15',
        image: Quiz2,
    },
    {
        id: 3,
        title: 'Python cho người mới bắt đầu',
        description: 'Nắm vững Python căn bản, ứng dụng vào phân tích dữ liệu.',
        teacher: 'Lê Văn C',
        studentsCount: 80,
        status: 'inactive',
        createAt: '2024-05-20',
        image: Quiz3,
    },
];

const statusMap = {
    active: { label: 'Hoạt động', color: 'bg-green-100 text-green-700' },
    inactive: { label: 'Không hoạt động', color: 'bg-red-100 text-red-700' },
};

const Courses = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Danh sách khóa học</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {fakeCourses.map((course) => (
                    <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
                        <img
                            src={course.image}
                            alt={course.title}
                            className="h-40 w-full object-cover"
                        />
                        <div className="p-4 flex-1 flex flex-col">
                            <h2 className="font-semibold text-lg mb-1 text-blue-700">{course.title}</h2>
                            <p className="text-gray-600 text-sm mb-2 flex-1">{course.description}</p>
                            <div className="text-sm text-gray-500 mb-1">👨‍🏫 {course.teacher}</div>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-400">Ngày tạo: {new Date(course.createAt).toLocaleDateString('vi-VN')}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusMap[course.status].color}`}>{statusMap[course.status].label}</span>
                            </div>
                            <div className="mt-2 text-sm text-gray-700">👥 {course.studentsCount} học viên</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Courses;
