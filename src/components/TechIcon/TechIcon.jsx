'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaExternalLinkAlt, FaTimes, FaBookOpen, FaQuestionCircle, FaCheckCircle } from 'react-icons/fa';
import { techStackData } from './TechData';
import './TechIcon.css';

const TechIcon = () => {
    const [selectedTech, setSelectedTech] = useState(null);
    const [pinnedTechId, setPinnedTechId] = useState(null);
    const [qaSearch, setQaSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', label: 'All Tech' },
        { id: 'frontend', label: 'Frontend & UI' },
        { id: 'backend', label: 'Backend & APIs' },
        { id: 'database', label: 'Database & ORM' },
        { id: 'tools', label: 'Tools & Cloud' }
    ];

    const filteredTechData = activeCategory === 'all'
        ? techStackData
        : techStackData.filter(tech => tech.mainCategory === activeCategory);

    const togglePin = (techId) => {
        setPinnedTechId((prev) => (prev === techId ? null : techId));
    };

    // Close pinned popover menu when clicking outside any tech icon item
    useEffect(() => {
        if (!pinnedTechId) return;

        const handleOutsideClick = (event) => {
            if (!event.target.closest('.tech-item-wrapper')) {
                setPinnedTechId(null);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [pinnedTechId]);

    return (
        <>
            {/* Category Filter Tabs */}
            <div className='flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto mt-4 md:mt-6 mb-4 px-2 z-10 relative'>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-300 cursor-pointer ${
                            activeCategory === cat.id
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-md shadow-cyan-500/25 scale-105'
                                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-cyan-500/50 hover:text-slate-200'
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Tech Icons Grid */}
            <div className='flex flex-wrap items-center justify-center gap-4 md:gap-5 max-w-5xl mx-auto px-2 md:px-0 relative z-10 min-h-[140px]'>
                {filteredTechData.map((tech) => {
                    const isPinned = pinnedTechId === tech.id;
                    return (
                        <div 
                            key={tech.id}
                            className={`tech-item-wrapper relative group flex items-center justify-center ${isPinned ? 'z-50' : 'hover:z-40 z-10'}`}
                        >
                            {/* Circle Icon */}
                            <div 
                                className={`tech-icon-circle ${isPinned ? 'ring-2 ring-cyan-400 scale-110 bg-slate-800' : ''}`}
                                onClick={() => togglePin(tech.id)}
                            >
                                <div className='transition-all duration-300 group-hover:rotate-6 flex items-center justify-center'>
                                    {tech.icon}
                                </div>
                            </div>

                            {/* Action Menu (Visible on Hover OR when Clicked/Pinned) */}
                            <div className={`absolute bottom-full mb-2.5 ${isPinned ? 'flex' : 'hidden group-hover:flex'} flex-col items-center gap-1.5 p-2 bg-slate-900/95 border border-cyan-500/40 rounded-xl shadow-2xl backdrop-blur-xl z-50 transition-all duration-300 min-w-[125px] animate-fadeIn pointer-events-auto`}>
                                {/* Button 1: Tool Name Link */}
                                <a
                                    href={tech.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                    className='w-full text-center px-3 py-1.5 bg-cyan-950/80 hover:bg-cyan-600 text-cyan-200 hover:text-white text-xs font-semibold rounded-lg border border-cyan-500/30 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer relative z-50 pointer-events-auto'
                                    title={`Visit official ${tech.name} documentation`}
                                >
                                    {tech.name} <FaExternalLinkAlt className="text-[10px]" />
                                </a>

                                {/* Button 2: Overview Modal trigger */}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedTech(tech);
                                        setPinnedTechId(null);
                                    }}
                                    className='w-full text-center px-3 py-1.5 bg-slate-800/90 hover:bg-cyan-600 text-slate-200 hover:text-white text-xs font-semibold rounded-lg border border-slate-700 hover:border-cyan-400 transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm'
                                >
                                    Overview <FaBookOpen className="text-[10px]" />
                                </button>

                                {/* Pointer Arrow */}
                                <div className="w-2.5 h-2.5 bg-slate-900 border-r border-b border-cyan-500/40 rotate-45 -mb-3 -mt-1.5" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Viva Details / Overview Modal */}
            {selectedTech && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
                    onClick={() => setSelectedTech(null)}
                >
                    <div 
                        className="bg-slate-900/95 border border-slate-800 border-t-2 border-t-cyan-400 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl relative text-white space-y-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                                    {selectedTech.icon}
                                </div>
                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="text-xl md:text-2xl font-extrabold text-white">{selectedTech.name}</h3>
                                        <span className="text-xs px-2.5 py-0.5 bg-cyan-950 border border-cyan-500/30 text-cyan-300 rounded-full font-medium">
                                            {selectedTech.category}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1">Viva Notes & Technical Preparation</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setSelectedTech(null)}
                                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
                            >
                                <FaTimes className="text-lg" />
                            </button>
                        </div>

                        {/* What & Why */}
                        <div className="space-y-3">
                            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1 flex items-center gap-2">
                                    <FaCheckCircle className="text-cyan-400" /> What is it?
                                </h4>
                                <p className="text-sm text-slate-200 leading-relaxed">
                                    {selectedTech.vivaDetails.whatIsIt}
                                </p>
                            </div>

                            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1 flex items-center gap-2">
                                    <FaCheckCircle className="text-cyan-400" /> Why use it in projects?
                                </h4>
                                <p className="text-sm text-slate-200 leading-relaxed">
                                    {selectedTech.vivaDetails.whyUseIt}
                                </p>
                            </div>
                        </div>

                        {/* Key Concepts */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-3">
                                🔑 Key Concepts & Work Features
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedTech.vivaDetails.keyConcepts.map((concept, idx) => (
                                    <span key={idx} className="text-xs px-3 py-1 bg-cyan-950/60 border border-cyan-500/20 text-cyan-200 rounded-lg font-medium">
                                        {concept}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Viva Q&A */}
                        <div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                                    <FaQuestionCircle /> Common Viva & Interview Questions
                                </h4>
                                <span className="text-[11px] font-semibold px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-md w-fit">
                                    {selectedTech.vivaDetails.vivaQuestions.length} Questions Bank
                                </span>
                            </div>

                            {/* Search Filter Input */}
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={qaSearch}
                                    onChange={(e) => setQaSearch(e.target.value)}
                                    placeholder={`Search ${selectedTech.name} questions or topics...`}
                                    className="w-full px-3 py-1.5 bg-slate-950/80 border border-slate-700 focus:border-cyan-400 rounded-xl text-xs text-slate-100 placeholder-slate-500 outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                                {selectedTech.vivaDetails.vivaQuestions
                                    .filter(item => 
                                        !qaSearch || 
                                        item.q.toLowerCase().includes(qaSearch.toLowerCase()) || 
                                        item.a.toLowerCase().includes(qaSearch.toLowerCase())
                                    )
                                    .map((item, idx) => (
                                        <div key={idx} className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1.5 hover:border-cyan-500/30 transition-all">
                                            <p className="text-xs font-bold text-cyan-300">
                                                Q{idx + 1}: {item.q}
                                            </p>
                                            <p className="text-xs text-slate-300 leading-relaxed pl-2 border-l-2 border-cyan-500/40">
                                                {item.a}
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-6">
                            <button
                                onClick={() => setSelectedTech(null)}
                                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    if (selectedTech?.url) {
                                        window.open(selectedTech.url, '_blank', 'noopener,noreferrer');
                                    }
                                }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl shadow-lg transition-all cursor-pointer"
                            >
                                Visit {selectedTech.name} Docs <FaExternalLinkAlt className="text-[10px]" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TechIcon;