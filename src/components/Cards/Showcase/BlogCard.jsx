'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaClock, FaArrowRight, FaBookOpen, FaTag } from 'react-icons/fa';

const blogPosts = [
    {
        id: 1,
        title: 'Mastering Next.js 16 SSR & Turbopack Performance',
        category: 'Next.js',
        readTime: '6 min read',
        date: 'July 20, 2026',
        description: 'Explore how Server-Side Rendering (SSR) in Next.js 16 improves SEO, speeds up initial page load, and delivers blazing-fast web experiences.',
        tags: ['Next.js', 'SSR', 'Turbopack', 'Performance'],
        image: 'https://via.placeholder.com/600x400/0f172a/38bdf8?text=Next.js+16+SSR',
        readUrl: '#'
    },
    {
        id: 2,
        title: 'Building Resilient Axios Interceptors for JWT Auth',
        category: 'Backend',
        readTime: '5 min read',
        date: 'July 15, 2026',
        description: 'Learn how to handle automatic token refresh, secure HTTP requests, and global error handling using custom Axios interceptors.',
        tags: ['Axios', 'JWT', 'Node.js', 'Security'],
        image: 'https://via.placeholder.com/600x400/0f172a/38bdf8?text=Axios+Interceptors',
        readUrl: '#'
    },
    {
        id: 3,
        title: 'State Management & Custom React Hooks Architecture',
        category: 'React',
        readTime: '7 min read',
        date: 'July 10, 2026',
        description: 'A practical guide to structuring clean React frontend applications with custom hooks, Context API, and modular state isolation.',
        tags: ['React', 'Hooks', 'State Management', 'Clean Code'],
        image: 'https://via.placeholder.com/600x400/0f172a/38bdf8?text=Custom+React+Hooks',
        readUrl: '#'
    },
    {
        id: 4,
        title: 'Designing Scalable MERN Stack Apps from Scratch',
        category: 'Performance',
        readTime: '8 min read',
        date: 'July 05, 2026',
        description: 'Best practices for organizing MongoDB schemas, Express middleware, RESTful API endpoints, and responsive React component layouts.',
        tags: ['MERN Stack', 'MongoDB', 'Express', 'Node.js'],
        image: 'https://via.placeholder.com/600x400/0f172a/38bdf8?text=MERN+Architecture',
        readUrl: '#'
    }
];

const categories = ['All', 'Next.js', 'React', 'Backend', 'Performance'];

const BlogCard = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBlogs = blogPosts.filter((post) => {
        const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesSearch;
    });

    return (
        <section className="w-full min-h-screen bg-[#070d19] text-white py-12 md:py-16 px-4 md:px-8 md:pr-32 lg:pr-36 xl:pr-40 flex flex-col items-center relative overflow-hidden">
            {/* Background glowing blurred blobs */}
            <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header section with back to home button */}
            <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 mb-10 border-b border-slate-800/80 pb-6 text-center md:text-left relative z-10">
                <div className="flex flex-col items-center md:items-start">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        Tech Insights & Articles
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-md">
                        Blog & Articles
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm md:text-base max-w-xl mx-auto md:mx-0">
                        Tutorials, insights, and architectural deep dives on MERN Stack, Next.js SSR, and Web Performance.
                    </p>
                </div>

                <Link 
                    href="/" 
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900/80 hover:bg-slate-800 text-cyan-300 hover:text-white font-semibold rounded-full border border-slate-700/80 hover:border-cyan-400 shadow-md transition-all duration-200 text-sm cursor-pointer backdrop-blur-md self-center md:self-auto"
                >
                    ← Back to Home
                </Link>
            </div>

            {/* Controls: Category Filter & Search Bar */}
            <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 mb-10 relative z-10">
                {/* Category Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                    {categories.map((cat, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
                                activeCategory === cat
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                    <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search articles or topics..."
                        className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                </div>
            </div>

            {/* Blog Posts Grid */}
            {filteredBlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-7xl relative z-10">
                    {filteredBlogs.map((post) => (
                        <div
                            key={post.id}
                            className="group relative bg-[#0d1527]/80 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-md hover:border-cyan-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col justify-between"
                        >
                            <div>
                                {/* Post Image */}
                                <div className="relative overflow-hidden rounded-xl mb-5 border border-white/5">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-52 object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 left-3 bg-cyan-950/80 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-[10px] font-bold px-3 py-1 rounded-full">
                                        {post.category}
                                    </div>
                                    <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-slate-300 text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                                        <FaClock className="text-[9px] text-cyan-400" /> {post.readTime}
                                    </div>
                                </div>

                                <div className="text-[11px] text-slate-400 font-medium mb-2">{post.date}</div>

                                <h2 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors mb-3 leading-snug">
                                    {post.title}
                                </h2>

                                <p className="text-slate-300 text-xs leading-relaxed mb-6">
                                    {post.description}
                                </p>
                            </div>

                            <div>
                                {/* Tags */}
                                <div className="flex flex-wrap gap-1.5 mb-5">
                                    {post.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="text-[10px] px-2.5 py-0.5 rounded-md bg-cyan-950/50 text-cyan-200 border border-cyan-500/20"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Read Article Button */}
                                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                    <a
                                        href={post.readUrl}
                                        className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-1 transition-all"
                                    >
                                        Read Article <FaArrowRight className="text-[10px]" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 text-slate-400 text-sm">
                    No articles found matching your search criteria.
                </div>
            )}
        </section>
    );
};

export default BlogCard;
