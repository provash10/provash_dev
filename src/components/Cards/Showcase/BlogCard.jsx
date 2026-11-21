'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaSearch, FaClock, FaArrowRight, FaTimes, FaPenNib, FaCheckCircle, FaLayerGroup, FaFolderOpen } from 'react-icons/fa';

const defaultCategoriesTaxonomy = [
    {
        name: 'Technology & IT',
        count: 0,
        subcategories: [
            { name: 'Web Development', count: 0 },
            { name: 'Artificial Intelligence', count: 0 },
            { name: 'Cybersecurity', count: 0 },
            { name: 'Cloud & DevOps', count: 0 },
            { name: 'Mobile Apps', count: 0 },
            { name: 'Software Architecture', count: 0 }
        ]
    },
    {
        name: 'Science',
        count: 0,
        subcategories: [
            { name: 'Space & Astronomy', count: 0 },
            { name: 'Physics & Quantum', count: 0 },
            { name: 'Biotechnology', count: 0 },
            { name: 'Climate & Environment', count: 0 },
            { name: 'Neuroscience', count: 0 }
        ]
    },
    {
        name: 'Politics',
        count: 0,
        subcategories: [
            { name: 'National Politics', count: 0 },
            { name: 'Geopolitics & Global Affairs', count: 0 },
            { name: 'Public Policy', count: 0 },
            { name: 'Political Economy', count: 0 },
            { name: 'Law & Human Rights', count: 0 }
        ]
    },
    {
        name: 'Finance',
        count: 0,
        subcategories: [
            { name: 'Personal Finance', count: 0 },
            { name: 'FinTech', count: 0 },
            { name: 'Stock Market & Investing', count: 0 },
            { name: 'Cryptocurrency & Web3', count: 0 },
            { name: 'Macroeconomics & Banking', count: 0 },
            { name: 'Startup Funding', count: 0 }
        ]
    }
];

const BlogCard = () => {
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState(defaultCategoriesTaxonomy);
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeSubCategory, setActiveSubCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [readingBlog, setReadingBlog] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // article creation form state
    const [formData, setFormData] = useState({
        title: '',
        category: 'Technology & IT',
        customCategory: '',
        subCategory: 'Web Development',
        customSubCategory: '',
        description: '',
        content: '',
        tags: '',
        image: ''
    });

    // fetch live blogs and category taxonomy from backend
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

    // handle category tab switch
    const handleCategoryChange = (catName) => {
        setActiveCategory(catName);
        setActiveSubCategory('All');
    };

    // available subcategories for current active category
    const currentCategoryObj = categories.find(
        (c) => c.name.toLowerCase() === activeCategory.toLowerCase()
    );
    const currentSubcategories = currentCategoryObj ? currentCategoryObj.subcategories : [];

    // handle article creation form submission
    const handleCreateBlog = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setIsSubmitting(true);

        const targetCategory = formData.category === '__custom__'
            ? formData.customCategory.trim()
            : (formData.category || 'Technology & IT');

        const targetSubCategory = formData.subCategory === '__custom__'
            ? formData.customSubCategory.trim()
            : (formData.subCategory || 'General');

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
            : [targetCategory, targetSubCategory];

        const payload = {
            title: formData.title.trim(),
            category: targetCategory,
            subCategory: targetSubCategory,
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
                // add newly created blog to active state
                setBlogs((prev) => [data.data, ...prev]);
                // reload live category taxonomy from backend
                loadData();
                setTimeout(() => {
                    setSubmitSuccess(false);
                    setIsCreateModalOpen(false);
                    // reset form inputs
                    setFormData({
                        title: '',
                        category: 'Technology & IT',
                        customCategory: '',
                        subCategory: 'Web Development',
                        customSubCategory: '',
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

    // filter articles based on category, subcategory and search query
    const filteredBlogs = blogs.filter((post) => {
        const matchesCategory =
            activeCategory === 'All' ||
            post.category.toLowerCase() === activeCategory.toLowerCase();

        const matchesSubCategory =
            activeSubCategory === 'All' ||
            (post.subCategory && post.subCategory.toLowerCase() === activeSubCategory.toLowerCase());

        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.subCategory?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (Array.isArray(post.tags) && post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));

        return matchesCategory && matchesSubCategory && matchesSearch;
    });

    // open create modal with preselected category and subcategory
    const handleOpenCreateModal = () => {
        const initCategory = activeCategory !== 'All' ? activeCategory : 'Technology & IT';
        const foundCategory = categories.find((c) => c.name.toLowerCase() === initCategory.toLowerCase());
        const initSub = activeSubCategory !== 'All'
            ? activeSubCategory
            : (foundCategory?.subcategories?.[0]
                ? foundCategory.subcategories[0].name
                : 'General');

        setFormData({
            title: '',
            category: initCategory,
            customCategory: '',
            subCategory: initSub,
            customSubCategory: '',
            description: '',
            content: '',
            tags: '',
            image: ''
        });
        setErrorMessage('');
        setSubmitSuccess(false);
        setIsCreateModalOpen(true);
    };

    // dynamic subcategories for modal selection based on modal category
    const modalCategoryObj = categories.find(
        (c) => c.name.toLowerCase() === formData.category.toLowerCase()
    );
    const modalSubcategories = modalCategoryObj ? modalCategoryObj.subcategories : [];

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
                        Knowledge Base & Insights Hub
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-md">
                        Blog & Articles
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm md:text-base max-w-2xl mx-auto md:mx-0">
                        Explore in-depth articles across Technology, Science, Politics, and Finance, or share your own expertise.
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

            {/* main category pills and search toolbar */}
            <div className="w-full max-w-7xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6 relative z-10">
                {/* main category pills */}
                <div className="flex flex-wrap items-center gap-2.5">
                    <button
                        onClick={() => handleCategoryChange('All')}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                            activeCategory === 'All'
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 border border-cyan-400/40'
                                : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40'
                        }`}
                    >
                        <FaLayerGroup className="text-[11px]" />
                        <span>All Categories</span>
                        <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-slate-800/90 text-cyan-300 font-bold border border-cyan-500/20">
                            {blogs.length}
                        </span>
                    </button>

                    {categories.map((cat, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleCategoryChange(cat.name)}
                            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                                activeCategory.toLowerCase() === cat.name.toLowerCase()
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 border border-cyan-400/40'
                                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40'
                            }`}
                        >
                            <span>{cat.name}</span>
                            <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-slate-800/90 text-cyan-300 font-bold border border-cyan-500/20">
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
                        placeholder="Search title, subcategory, tags..."
                        className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                </div>
            </div>

            {/* subcategory filter bar when category is selected */}
            {activeCategory !== 'All' && currentSubcategories && currentSubcategories.length > 0 && (
                <div className="w-full max-w-7xl bg-[#091224]/80 border border-cyan-500/20 rounded-2xl p-4 mb-8 relative z-10 backdrop-blur-md">
                    <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 mb-3 px-1">
                        <FaFolderOpen className="text-cyan-400" />
                        <span>Subcategories in {activeCategory}:</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => setActiveSubCategory('All')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                                activeSubCategory === 'All'
                                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                                    : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800 hover:border-cyan-500/30'
                            }`}
                        >
                            All {activeCategory}
                        </button>
                        {currentSubcategories.map((sub, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveSubCategory(sub.name)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                                    activeSubCategory.toLowerCase() === sub.name.toLowerCase()
                                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                                        : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800 hover:border-cyan-500/30'
                                }`}
                            >
                                <span>{sub.name}</span>
                                {sub.count > 0 && (
                                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                        activeSubCategory.toLowerCase() === sub.name.toLowerCase()
                                            ? 'bg-slate-950/20 text-slate-950 font-bold'
                                            : 'bg-slate-800 text-cyan-300'
                                    }`}>
                                        {sub.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* active filter summary indicator */}
            <div className="w-full max-w-7xl flex items-center justify-between text-xs text-slate-400 mb-6 px-1 relative z-10">
                <p>
                    Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'} in{' '}
                    <span className="text-cyan-400 font-semibold">{activeCategory}</span>
                    {activeSubCategory !== 'All' && (
                        <span>
                            {' '}➔ <span className="text-blue-400 font-semibold">{activeSubCategory}</span>
                        </span>
                    )}
                </p>
                {activeCategory !== 'All' && (
                    <button
                        onClick={handleOpenCreateModal}
                        className="text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer"
                    >
                        + Write article in {activeSubCategory !== 'All' ? activeSubCategory : activeCategory}
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
                                    <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                                        <button
                                            onClick={() => handleCategoryChange(post.category)}
                                            className="bg-cyan-950/90 hover:bg-cyan-900 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-[10px] font-bold px-3 py-1 rounded-full cursor-pointer transition-colors"
                                        >
                                            {post.category}
                                        </button>
                                        {post.subCategory && post.subCategory !== 'General' && (
                                            <span className="bg-blue-950/90 backdrop-blur-md border border-blue-500/40 text-blue-300 text-[10px] font-bold px-2.5 py-1 rounded-full">
                                                {post.subCategory}
                                            </span>
                                        )}
                                    </div>
                                    <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-slate-300 text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                                        <FaClock className="text-[9px] text-cyan-400" /> {post.readTime || '5 min read'}
                                    </div>
                                </div>

                                <div className="text-[11px] text-slate-400 font-medium mb-2">
                                    {post.createdAt
                                        ? new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                        : 'Recent'}
                                </div>

                                <h2 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors mb-3 leading-snug">
                                    {post.title}
                                </h2>

                                <p className="text-slate-300 text-xs leading-relaxed mb-6">
                                    {post.description}
                                </p>
                            </div>

                            <div>
                                {/* tags list */}
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

                                {/* read article action button */}
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
                    <p className="mb-4">No articles found in this category or subcategory yet.</p>
                    <button
                        onClick={handleOpenCreateModal}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-full shadow-lg shadow-cyan-500/25 transition-all text-xs cursor-pointer"
                    >
                        <FaPenNib className="text-xs" />
                        Write the first article in {activeSubCategory !== 'All' ? activeSubCategory : activeCategory}
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
                                <p className="text-xs text-slate-400">Publish your technical insight under category & subcategory</p>
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

                                {/* category dropdown */}
                                <div>
                                    <label className="block text-slate-300 font-semibold mb-1">
                                        Main Category <span className="text-cyan-400">*</span>
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => {
                                            const newCat = e.target.value;
                                            const found = categories.find((c) => c.name.toLowerCase() === newCat.toLowerCase());
                                            const firstSub = found?.subcategories?.[0]
                                                ? found.subcategories[0].name
                                                : 'General';
                                            setFormData({
                                                ...formData,
                                                category: newCat,
                                                subCategory: firstSub
                                            });
                                        }}
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
                                            placeholder="e.g. Artificial Intelligence, Philosophy"
                                            className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                                            required
                                        />
                                    </div>
                                )}

                                {/* subcategory dropdown */}
                                <div>
                                    <label className="block text-slate-300 font-semibold mb-1">
                                        Subcategory <span className="text-cyan-400">*</span>
                                    </label>
                                    <select
                                        value={formData.subCategory}
                                        onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                                        className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                                    >
                                        {modalSubcategories.map((s, i) => (
                                            <option key={i} value={s.name} className="bg-slate-900 text-white">
                                                {s.name}
                                            </option>
                                        ))}
                                        <option value="__custom__" className="bg-slate-900 text-cyan-300 font-semibold">
                                            + Create Custom Subcategory
                                        </option>
                                    </select>
                                </div>

                                {/* custom subcategory input */}
                                {formData.subCategory === '__custom__' && (
                                    <div>
                                        <label className="block text-slate-300 font-semibold mb-1">
                                            New Subcategory Name <span className="text-cyan-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.customSubCategory}
                                            onChange={(e) => setFormData({ ...formData, customSubCategory: e.target.value })}
                                            placeholder="e.g. Next.js, Quantum Computing, Deep Learning"
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
                                        placeholder="e.g. Understanding Modern Cloud Architecture"
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
                                        placeholder="Write your article body, key takeaways, diagrams explanation, or code snippets..."
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

                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full">
                                {readingBlog.category}
                            </span>
                            {readingBlog.subCategory && readingBlog.subCategory !== 'General' && (
                                <span className="bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-bold px-3 py-1 rounded-full">
                                    {readingBlog.subCategory}
                                </span>
                            )}
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                <FaClock className="text-cyan-400 text-[10px]" /> {readingBlog.readTime || '5 min read'}
                            </span>
                            <span className="text-xs text-slate-500">
                                {readingBlog.createdAt
                                    ? new Date(readingBlog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                                    : 'Recent'}
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
