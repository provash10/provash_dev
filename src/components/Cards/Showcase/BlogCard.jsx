'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaSearch, FaClock, FaArrowRight, FaTag, FaPlus, FaTimes, FaPenNib, FaCheckCircle, FaLayerGroup } from 'react-icons/fa';

const initialFallbackPosts = [
    {
        id: '1',
        title: 'Mastering Next.js 16 SSR & Turbopack Performance',
        slug: 'mastering-nextjs-16-ssr-turbopack-performance',
        category: 'Next.js',
        readTime: '6 min read',
        date: 'July 20, 2026',
        description: 'Explore how Server-Side Rendering (SSR) in Next.js 16 improves SEO, speeds up initial page load, and delivers blazing-fast web experiences.',
        content: 'Server-Side Rendering in Next.js provides dynamic HTML rendering at request time. Combined with Turbopack, development builds and production outputs achieve ultra-fast bundle compilation and instantaneous hydration across all modern browsers.',
        tags: ['Next.js', 'SSR', 'Turbopack', 'Performance'],
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000'
    },
    {
        id: '2',
        title: 'Building Resilient Axios Interceptors for JWT Auth',
        slug: 'building-resilient-axios-interceptors-for-jwt-auth',
        category: 'Backend',
        readTime: '5 min read',
        date: 'July 15, 2026',
        description: 'Learn how to handle automatic token refresh, secure HTTP requests, and global error handling using custom Axios interceptors.',
        content: 'Axios interceptors allow capturing requests and responses before they are handled by then or catch. Using a refresh token rotation queue guarantees users remain securely logged in without interrupted active sessions.',
        tags: ['Axios', 'JWT', 'Node.js', 'Security'],
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000'
    },
    {
        id: '3',
        title: 'State Management & Custom React Hooks Architecture',
        slug: 'state-management-custom-react-hooks-architecture',
        category: 'React',
        readTime: '7 min read',
        date: 'July 10, 2026',
        description: 'A practical guide to structuring clean React frontend applications with custom hooks, Context API, and modular state isolation.',
        content: 'Extracting stateful business logic into reusable custom hooks isolates presentation components from side-effects. This pattern improves code readability, testability, and maintainability across large-scale frontend applications.',
        tags: ['React', 'Hooks', 'State Management', 'Clean Code'],
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000'
    },
    {
        id: '4',
        title: 'Designing Scalable MERN Stack Apps from Scratch',
        slug: 'designing-scalable-mern-stack-apps-from-scratch',
        category: 'Performance',
        readTime: '8 min read',
        date: 'July 05, 2026',
        description: 'Best practices for organizing MongoDB schemas, Express middleware, RESTful API endpoints, and responsive React component layouts.',
        content: 'A robust MERN architecture enforces separation of concerns through modular folders: controllers handle HTTP status codes, services process business logic, and schemas validate inputs cleanly.',
        tags: ['MERN Stack', 'MongoDB', 'Express', 'Node.js'],
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000'
    }
];

const BlogCard = () => {
    const [blogs, setBlogs] = useState(initialFallbackPosts);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [readingBlog, setReadingBlog] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // article creation form state
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        customCategory: '',
        description: '',
        content: '',
        tags: '',
        image: ''
    });

    // fetch live blogs and category list from backend
    const loadData = async () => {
        try {
            // fetch categories
            const catRes = await fetch('http://localhost:5000/api/v1/blogs/categories');
            const catData = await catRes.json();
            if (catData.success && catData.data && Array.isArray(catData.data.categories)) {
                setCategories(catData.data.categories);
            }

            // fetch blogs
            const blogRes = await fetch('http://localhost:5000/api/v1/blogs');
            const blogData = await blogRes.json();
            if (blogData.success && Array.isArray(blogData.data) && blogData.data.length > 0) {
                setBlogs(blogData.data);
            }
        } catch (_err) {
            // console.log("offline blog fetch fallback notice", _err)
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // handle form submission to backend api
    const handleCreateBlog = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setIsSubmitting(true);

        const targetCategory = formData.category === '__custom__'
            ? formData.customCategory.trim()
            : (formData.category || (categories[0] ? categories[0].name : 'General'));

        if (!formData.title.trim()) {
            setErrorMessage('Please provide an article title');
            setIsSubmitting(false);
            return;
        }

        if (!targetCategory) {
            setErrorMessage('Please select or specify a category');
            setIsSubmitting(false);
            return;
        }

        if (!formData.description.trim()) {
            setErrorMessage('Please provide a short summary description');
            setIsSubmitting(false);
            return;
        }

        const tagList = formData.tags
            ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
            : [targetCategory];

        const payload = {
            title: formData.title.trim(),
            category: targetCategory,
            description: formData.description.trim(),
            content: formData.content.trim(),
            tags: tagList,
            image: formData.image.trim() || undefined
        };

        try {
            const res = await fetch('http://localhost:5000/api/v1/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (data.success && data.data) {
                setSubmitSuccess(true);
                // add newly created blog to state
                setBlogs((prev) => [data.data, ...prev]);
                // refresh categories from backend
                loadData();
                setTimeout(() => {
                    setSubmitSuccess(false);
                    setIsCreateModalOpen(false);
                    setFormData({
                        title: '',
                        category: '',
                        customCategory: '',
                        description: '',
                        content: '',
                        tags: '',
                        image: ''
                    });
                }, 1200);
            } else {
                setErrorMessage(data.message || 'Failed to create article');
            }
        } catch (_err) {
            setErrorMessage('Network error while saving article');
        } finally {
            setIsSubmitting(false);
        }
    };

    // filter articles based on category and search query
    const filteredBlogs = blogs.filter((post) => {
        const matchesCategory = activeCategory === 'All' || post.category.toLowerCase() === activeCategory.toLowerCase();
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (Array.isArray(post.tags) && post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));

        return matchesCategory && matchesSearch;
    });

    // open create modal with preselected category
    const handleOpenCreateModal = () => {
        setFormData({
            title: '',
            category: activeCategory !== 'All' ? activeCategory : (categories[0] ? categories[0].name : 'React'),
            customCategory: '',
            description: '',
            content: '',
            tags: '',
            image: ''
        });
        setErrorMessage('');
        setSubmitSuccess(false);
        setIsCreateModalOpen(true);
    };

    return (
        <section className="w-full min-h-screen bg-[#070d19] text-white py-12 md:py-16 px-4 md:px-8 md:pr-32 lg:pr-36 xl:pr-40 flex flex-col items-center relative overflow-hidden">
            {/* background glowing blurred blobs */}
            <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* header section with back button and write blog button */}
            <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 mb-10 border-b border-slate-800/80 pb-6 text-center md:text-left relative z-10">
                <div className="flex flex-col items-center md:items-start">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        Tech Insights & Knowledge Hub
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-md">
                        Blog & Articles
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm md:text-base max-w-xl mx-auto md:mx-0">
                        Explore tutorials by category, or contribute your own technical articles directly to the developer community.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleOpenCreateModal}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 text-sm cursor-pointer"
                    >
                        <FaPenNib className="text-xs" />
                        Write Article
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900/80 hover:bg-slate-800 text-cyan-300 hover:text-white font-semibold rounded-full border border-slate-700/80 hover:border-cyan-400 shadow-md transition-all duration-200 text-sm cursor-pointer backdrop-blur-md"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>

            {/* category list and search toolbar */}
            <div className="w-full max-w-7xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10 relative z-10">
                {/* category pills with post count badges */}
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        onClick={() => setActiveCategory('All')}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                            activeCategory === 'All'
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25 border border-cyan-400/30'
                                : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40'
                        }`}
                    >
                        <FaLayerGroup className="text-[10px]" />
                        <span>All Topics</span>
                        <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-cyan-300 font-bold border border-cyan-500/20">
                            {blogs.length}
                        </span>
                    </button>

                    {categories.map((cat, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveCategory(cat.name)}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                activeCategory.toLowerCase() === cat.name.toLowerCase()
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25 border border-cyan-400/30'
                                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40'
                            }`}
                        >
                            <span>{cat.name}</span>
                            <span className="ml-0.5 text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-cyan-300 font-bold border border-cyan-500/20">
                                {cat.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* search input */}
                <div className="relative w-full lg:w-72">
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

            {/* active category indicator and quick publish trigger */}
            <div className="w-full max-w-7xl flex items-center justify-between text-xs text-slate-400 mb-6 px-1 relative z-10">
                <p>
                    Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'} in{' '}
                    <span className="text-cyan-400 font-semibold">{activeCategory === 'All' ? 'All Categories' : activeCategory}</span>
                </p>
                {activeCategory !== 'All' && (
                    <button
                        onClick={handleOpenCreateModal}
                        className="text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer"
                    >
                        + Write article in {activeCategory}
                    </button>
                )}
            </div>

            {/* blog posts grid */}
            {filteredBlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-7xl relative z-10">
                    {filteredBlogs.map((post) => (
                        <div
                            key={post.id}
                            className="group relative bg-[#0d1527]/80 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-md hover:border-cyan-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col justify-between"
                        >
                            <div>
                                {/* post image */}
                                <div className="relative overflow-hidden rounded-xl mb-5 border border-white/5">
                                    <img
                                        src={post.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000'}
                                        alt={post.title}
                                        className="w-full h-52 object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <button
                                        onClick={() => setActiveCategory(post.category)}
                                        className="absolute top-3 left-3 bg-cyan-950/80 hover:bg-cyan-900 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-[10px] font-bold px-3 py-1 rounded-full cursor-pointer transition-colors"
                                    >
                                        {post.category}
                                    </button>
                                    <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-slate-300 text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                                        <FaClock className="text-[9px] text-cyan-400" /> {post.readTime || '5 min read'}
                                    </div>
                                </div>

                                <div className="text-[11px] text-slate-400 font-medium mb-2">
                                    {post.createdAt
                                        ? new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                        : (post.date || 'Recent')}
                                </div>

                                <h2 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors mb-3 leading-snug">
                                    {post.title}
                                </h2>

                                <p className="text-slate-300 text-xs leading-relaxed mb-6">
                                    {post.description}
                                </p>
                            </div>

                            <div>
                                {/* tags */}
                                <div className="flex flex-wrap gap-1.5 mb-5">
                                    {Array.isArray(post.tags) && post.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="text-[10px] px-2.5 py-0.5 rounded-md bg-cyan-950/50 text-cyan-200 border border-cyan-500/20"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                {/* read article button */}
                                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                    <button
                                        onClick={() => setReadingBlog(post)}
                                        className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-1 transition-all cursor-pointer"
                                    >
                                        Read Article <FaArrowRight className="text-[10px]" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-slate-400 text-sm max-w-md mx-auto relative z-10">
                    <p className="mb-4">No articles found in this category yet.</p>
                    <button
                        onClick={handleOpenCreateModal}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-full shadow-lg shadow-cyan-500/25 transition-all text-xs cursor-pointer"
                    >
                        <FaPenNib className="text-xs" />
                        Write the first article in {activeCategory}
                    </button>
                </div>
            )}

            {/* write article modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-[#0b1329] border border-cyan-500/40 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative text-left">
                        {/* close button */}
                        <button
                            onClick={() => setIsCreateModalOpen(false)}
                            className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
                        >
                            <FaTimes className="text-base" />
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                                <FaPenNib className="text-lg" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Create New Article</h3>
                                <p className="text-xs text-slate-400">Publish your technical insight to the blog</p>
                            </div>
                        </div>

                        {submitSuccess ? (
                            <div className="py-12 flex flex-col items-center justify-center text-center">
                                <FaCheckCircle className="text-5xl text-emerald-400 mb-4 animate-bounce" />
                                <h4 className="text-xl font-bold text-white mb-2">Article Published Successfully!</h4>
                                <p className="text-sm text-slate-400">Your article is now live on the blogs platform.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleCreateBlog} className="space-y-4 text-xs">
                                {errorMessage && (
                                    <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-xl text-red-300 text-xs">
                                        {errorMessage}
                                    </div>
                                )}

                                {/* category selector */}
                                <div>
                                    <label className="block text-slate-300 font-semibold mb-1">
                                        Category <span className="text-cyan-400">*</span>
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                                    >
                                        {categories.map((c, i) => (
                                            <option key={i} value={c.name} className="bg-slate-900 text-white">
                                                {c.name} ({c.count} posts)
                                            </option>
                                        ))}
                                        <option value="__custom__" className="bg-slate-900 text-cyan-300 font-semibold">
                                            + Create New Category
                                        </option>
                                    </select>
                                </div>

                                {/* custom category input */}
                                {formData.category === '__custom__' && (
                                    <div>
                                        <label className="block text-slate-300 font-semibold mb-1">
                                            New Category Name <span className="text-cyan-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.customCategory}
                                            onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                                            placeholder="e.g. DevOps, Cloud, AI"
                                            className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                                            required
                                        />
                                    </div>
                                )}

                                {/* title input */}
                                <div>
                                    <label className="block text-slate-300 font-semibold mb-1">
                                        Article Title <span className="text-cyan-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g. Advanced Docker Multistage Builds for Microservices"
                                        className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                                        required
                                    />
                                </div>

                                {/* summary description */}
                                <div>
                                    <label className="block text-slate-300 font-semibold mb-1">
                                        Short Description / Excerpt <span className="text-cyan-400">*</span>
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="A brief overview summarizing what readers will learn in this post..."
                                        className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                                        required
                                    />
                                </div>

                                {/* article content body */}
                                <div>
                                    <label className="block text-slate-300 font-semibold mb-1">
                                        Full Content
                                    </label>
                                    <textarea
                                        rows={6}
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        placeholder="Write your article body, key takeaways, architectural diagrams explanation, or code snippets..."
                                        className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                                    />
                                </div>

                                {/* tags input */}
                                <div>
                                    <label className="block text-slate-300 font-semibold mb-1">
                                        Tags (comma-separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                        placeholder="e.g. Next.js, Architecture, Production"
                                        className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                                    />
                                </div>

                                {/* cover image url */}
                                <div>
                                    <label className="block text-slate-300 font-semibold mb-1">
                                        Cover Image URL (optional)
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="https://images.unsplash.com/..."
                                        className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                                    />
                                </div>

                                {/* modal actions */}
                                <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsCreateModalOpen(false)}
                                        className="px-4 py-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Publishing...' : 'Publish Article'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {/* read article modal */}
            {readingBlog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-[#0b1329] border border-cyan-500/40 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative text-left">
                        {/* close button */}
                        <button
                            onClick={() => setReadingBlog(null)}
                            className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
                        >
                            <FaTimes className="text-base" />
                        </button>

                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full">
                                {readingBlog.category}
                            </span>
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                <FaClock className="text-cyan-400 text-[10px]" /> {readingBlog.readTime || '5 min read'}
                            </span>
                            <span className="text-xs text-slate-500">
                                {readingBlog.createdAt
                                    ? new Date(readingBlog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                                    : (readingBlog.date || 'Recent')}
                            </span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight">
                            {readingBlog.title}
                        </h2>

                        {readingBlog.image && (
                            <div className="overflow-hidden rounded-xl mb-6 border border-white/10 max-h-72">
                                <img
                                    src={readingBlog.image}
                                    alt={readingBlog.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="p-4 rounded-xl bg-cyan-950/20 border-l-4 border-cyan-400 text-cyan-200 text-xs md:text-sm italic mb-6 leading-relaxed">
                            {readingBlog.description}
                        </div>

                        <div className="text-slate-300 text-sm leading-relaxed space-y-4 mb-8 whitespace-pre-line">
                            {readingBlog.content || readingBlog.description}
                        </div>

                        {/* tags in reading modal */}
                        {Array.isArray(readingBlog.tags) && readingBlog.tags.length > 0 && (
                            <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2 mb-6">
                                {readingBlog.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs px-2.5 py-1 rounded-lg bg-cyan-950/50 text-cyan-200 border border-cyan-500/20"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="flex justify-end pt-2">
                            <button
                                onClick={() => setReadingBlog(null)}
                                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                            >
                                Close Reader
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default BlogCard;
