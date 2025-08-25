import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    Play, 
    Users, 
    BookOpen, 
    Award, 
    Star, 
    ArrowRight, 
    CheckCircle, 
    Clock, 
    TrendingUp,
    Code,
    Database,
    Globe,
    Smartphone,
    Server,
    Layers,
    ChevronRight,
    Building,
    Briefcase,
    Target
} from 'lucide-react';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    // Stats animation
    const [stats, setStats] = useState({ students: 0, courses: 0, companies: 0, jobs: 0 });
    
    useEffect(() => {
        const targets = { students: 12500, courses: 180, companies: 450, jobs: 2800 };
        const duration = 2000;
        
        Object.keys(targets).forEach(key => {
            let start = 0;
            const end = targets[key];
            const increment = end / (duration / 16);
            
            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    start = end;
                    clearInterval(timer);
                }
                setStats(prev => ({ ...prev, [key]: Math.floor(start) }));
            }, 16);
        });
    }, []);

    const courses = [
        {
            id: 1,
            title: 'React.js Complete Course',
            description: 'Master modern React development with hooks, context, and advanced patterns',
            icon: <Code className="w-8 h-8" />,
            students: '8,945',
            lessons: 156,
            duration: '42 hours',
            level: 'Intermediate',
            price: '$89',
            originalPrice: '$149',
            rating: 4.9,
            instructor: 'John Smith',
            category: 'Frontend',
            tags: ['React', 'JavaScript', 'Hooks'],
            color: 'bg-blue-500'
        },
        {
            id: 2,
            title: 'Node.js & Express Backend',
            description: 'Build scalable backend applications with Node.js, Express, and MongoDB',
            icon: <Server className="w-8 h-8" />,
            students: '6,234',
            lessons: 128,
            duration: '38 hours',
            level: 'Advanced',
            price: '$99',
            originalPrice: '$169',
            rating: 4.8,
            instructor: 'Sarah Johnson',
            category: 'Backend',
            tags: ['Node.js', 'Express', 'MongoDB'],
            color: 'bg-green-500'
        },
        {
            id: 3,
            title: 'Full Stack JavaScript',
            description: 'Complete full-stack development with MERN stack and deployment',
            icon: <Layers className="w-8 h-8" />,
            students: '12,567',
            lessons: 200,
            duration: '65 hours',
            level: 'Expert',
            price: '$129',
            originalPrice: '$199',
            rating: 4.9,
            instructor: 'Mike Chen',
            category: 'Full Stack',
            tags: ['MERN', 'React', 'Node.js'],
            color: 'bg-purple-500'
        },
        {
            id: 4,
            title: 'Python for Data Science',
            description: 'Data analysis, machine learning, and visualization with Python',
            icon: <Database className="w-8 h-8" />,
            students: '5,678',
            lessons: 142,
            duration: '45 hours',
            level: 'Intermediate',
            price: '$79',
            originalPrice: '$139',
            rating: 4.7,
            instructor: 'Dr. Lisa Wang',
            category: 'Data Science',
            tags: ['Python', 'Pandas', 'ML'],
            color: 'bg-orange-500'
        }
    ];

    const features = [
        {
            icon: <Code className="w-6 h-6" />,
            title: 'Industry-Standard Projects',
            description: 'Build real-world applications that employers actually want to see'
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: 'Expert Instructors',
            description: 'Learn from senior developers working at top tech companies'
        },
        {
            icon: <Award className="w-6 h-6" />,
            title: 'Career Support',
            description: 'Job placement assistance and portfolio reviews included'
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: 'Flexible Learning',
            description: 'Self-paced courses that fit your schedule and learning style'
        }
    ];

    const testimonials = [
        {
            name: 'Alex Rodriguez',
            role: 'Frontend Developer',
            company: 'Google',
            content: 'The React course helped me land my dream job at Google. The projects were challenging and practical.',
            avatar: '👨‍💻',
            rating: 5,
            salary: '$120k/year'
        },
        {
            name: 'Emily Chen',
            role: 'Full Stack Developer',
            company: 'Stripe',
            content: 'Excellent course structure and real-world projects. I went from beginner to employed in 6 months.',
            avatar: '👩‍💻',
            rating: 5,
            salary: '$95k/year'
        },
        {
            name: 'David Kim',
            role: 'Backend Engineer',
            company: 'Netflix',
            content: 'The Node.js course covered everything I needed. Great instructor support and community.',
            avatar: '👨‍💼',
            rating: 5,
            salary: '$110k/year'
        }
    ];

    const companies = [
        { name: 'Google', logo: '🔍' },
        { name: 'Microsoft', logo: '🏢' },
        { name: 'Netflix', logo: '📺' },
        { name: 'Spotify', logo: '🎵' },
        { name: 'Uber', logo: '🚗' },
        { name: 'Airbnb', logo: '🏠' }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                                <TrendingUp className="w-4 h-4 mr-2" />
                                Join 12,500+ developers advancing their careers
                            </div>
                            
                            <div className="space-y-6">
                                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                                    Master
                                    <span className="block text-blue-400">Modern</span>
                                    Development
                                </h1>
                                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                                    Learn cutting-edge technologies from industry experts. Build real projects, 
                                    get job-ready skills, and advance your tech career.
                                </p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/courses"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                                >
                                    Browse Courses
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                                <button className="inline-flex items-center justify-center px-8 py-4 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                                    <Play className="mr-2 w-5 h-5" />
                                    Watch Demo
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-400">{stats.students.toLocaleString()}</div>
                                    <div className="text-sm text-gray-400">Students</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-400">{stats.courses}</div>
                                    <div className="text-sm text-gray-400">Courses</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-400">{stats.companies}</div>
                                    <div className="text-sm text-gray-400">Companies</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-orange-400">{stats.jobs}</div>
                                    <div className="text-sm text-gray-400">Job Placements</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-gray-800 rounded-lg p-6 shadow-2xl border border-gray-700">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <pre className="text-green-400 text-sm overflow-hidden">
{`import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="app">
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default App;`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Courses */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Popular Courses
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Master the most in-demand skills in tech
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {courses.map((course, index) => (
                            <div key={course.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group h-full flex flex-col">
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 ${course.color} rounded-lg flex items-center justify-center text-white`}>
                                            {course.icon}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-sm font-medium">{course.rating}</span>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                {course.category}
                                            </span>
                                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                                {course.level}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-1 mb-4 min-h-[2rem]">
                                        {course.tags.map((tag, idx) => (
                                            <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                <span>{course.students}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{course.duration}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mb-6 mt-auto">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                                            <span className="text-sm text-gray-500 line-through">{course.originalPrice}</span>
                                        </div>
                                    </div>

                                    <Link
                                        to={`/course/${course.id}`}
                                        className="block w-full text-center py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors group-hover:bg-blue-600 mt-auto"
                                    >
                                        Enroll Now
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Why Choose Our Platform?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We provide everything you need to succeed in your tech career
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Stories */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Our graduates are working at top tech companies worldwide
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                
                                <blockquote className="text-gray-300 mb-6">
                                    "{testimonial.content}"
                                </blockquote>
                                
                                <div className="flex items-center gap-3">
                                    <div className="text-2xl">{testimonial.avatar}</div>
                                    <div>
                                        <div className="font-bold">{testimonial.name}</div>
                                        <div className="text-sm text-gray-400">{testimonial.role} at {testimonial.company}</div>
                                        <div className="text-sm text-green-400">{testimonial.salary}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Companies */}
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-8 text-gray-300">Our graduates work at</h3>
                        <div className="flex flex-wrap justify-center items-center gap-8">
                            {companies.map((company, index) => (
                                <div key={index} className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
                                    <span className="text-2xl">{company.logo}</span>
                                    <span className="font-semibold text-gray-300">{company.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        Ready to Start Your Tech Career?
                    </h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                        Join thousands of developers who have transformed their careers with our courses
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/register"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                        >
                            Get Started Free
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link
                            to="/courses"
                            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                        >
                            Browse All Courses
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;