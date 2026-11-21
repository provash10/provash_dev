'use client';

import React, { useState, useEffect } from 'react';
import { FaExternalLinkAlt, FaTimes, FaBookOpen, FaQuestionCircle, FaCheckCircle } from 'react-icons/fa';
import { techStackData } from '../TechIcon/TechData';
import './TechMarquee.css';

const TechMarquee = () => {
    const [selectedTech, setSelectedTech] = useState(null);
    const [pinnedTechId, setPinnedTechId] = useState(null);
    const [qaSearch, setQaSearch] = useState('');

    // duplicate tech stack items array for seamless infinite marquee loop
    const marqueeList = [...techStackData, ...techStackData];

    // toggle pinned popover menu
    const togglePin = (techId) => {
        setPinnedTechId((prev) => (prev === techId ? null : techId));
    };

    // close pinned popover menu when clicking outside any tech item
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
        <div className="relative w-full">
            {/* left and right gradient fade masks for marquee edge smoothing */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#050b17] to-transparent z-30" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#050b17] to-transparent z-30" />

            {/* marquee scroll viewport moving right to left */}
            <div className="tech-marquee-container">
                <div className="tech-marquee-track">
                    {marqueeList.map((tech, index) => {
                        const itemKey = `${tech.id}-${index}`;
                        const isPinned = pinnedTechId === itemKey;

                        return (
                            <div
                                key={itemKey}
                                className={`tech-item-wrapper relative group flex flex-col items-center justify-center shrink-0 ${
                                    isPinned ? 'z-50' : 'hover:z-40 z-10'
                                }`}
                            >
                                {/* circular tech icon */}
                                <div
                                    className={`tech-marquee-circle ${
                                        isPinned ? 'ring-2 ring-cyan-400 scale-110 bg-slate-800' : ''
                                    }`}
                                    onClick={() => togglePin(itemKey)}
                                    title={tech.name}
                                >
                                    <div className="transition-all duration-300 group-hover:rotate-6 flex items-center justify-center">
                                        {tech.icon}
                                    </div>
                                </div>

                                {/* tech title label below circle */}
                                <span className="text-[10px] font-semibold text-slate-400 group-hover:text-cyan-300 transition-colors mt-2 tracking-wide">
                                    {tech.name}
                                </span>

                                {/* action popover visible on hover or when pinned */}
                                <div
                                    className={`absolute bottom-full mb-2 ${
                                        isPinned ? 'flex' : 'hidden group-hover:flex'
                                    } flex-col items-center gap-1.5 p-2 bg-slate-900/95 border border-cyan-500/40 rounded-xl shadow-2xl backdrop-blur-xl z-50 transition-all duration-200 min-w-[125px] tech-popover-anim pointer-events-auto`}
                                >
                                    {/* link to official docs */}
                                    <a
                                        href={tech.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                        className="w-full text-center px-3 py-1.5 bg-cyan-950/80 hover:bg-cyan-600 text-cyan-200 hover:text-white text-xs font-semibold rounded-lg border border-cyan-500/30 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer relative z-50 pointer-events-auto"
                                        title={`Visit official ${tech.name} documentation`}
                                    >
                                        {tech.name} <FaExternalLinkAlt className="text-[10px]" />
                                    </a>

                                    {/* button overview modal trigger */}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedTech(tech);
                                            setPinnedTechId(null);
                                        }}
                                        className="w-full text-center px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer relative z-50 pointer-events-auto"
                                    >
                                        <FaBookOpen className="text-[10px] text-cyan-400" />
                                        <span>Overview</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* viva and technical overview modal */}
            {selectedTech?.vivaDetails && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
                    onClick={() => setSelectedTech(null)}
                >
                    <div
                        className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative custom-scrollbar"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* modal header */}
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-slate-800/80 border border-slate-700 rounded-xl">
                                    {selectedTech.icon}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-xl font-bold text-white tracking-wide">
                                            {selectedTech.name}
                                        </h3>
                                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                                            {selectedTech.category}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-0.5">
                                        Core Architecture, Viva Guide & Best Practices
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedTech(null)}
                                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                                aria-label="Close Modal"
                            >
                                <FaTimes size={18} />
                            </button>
                        </div>

                        {/* modal content sections */}
                        <div className="space-y-4">
                            {/* definition block */}
                            <div className="p-3.5 bg-slate-950/40 border border-slate-800/80 rounded-xl">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1 flex items-center gap-1.5">
                                    <FaBookOpen /> What is it?
                                </h4>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                    {selectedTech.vivaDetails.whatIsIt}
                                </p>
                            </div>

                            {/* benefit block */}
                            <div className="p-3.5 bg-slate-950/40 border border-slate-800/80 rounded-xl">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1 flex items-center gap-1.5">
                                    <FaCheckCircle /> Why use it?
                                </h4>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                    {selectedTech.vivaDetails.whyUseIt}
                                </p>
                            </div>

                            {/* key architectural concepts */}
                            {selectedTech.vivaDetails.keyConcepts && (
                                <div className="p-3.5 bg-slate-950/40 border border-slate-800/80 rounded-xl">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
                                        Key Architectural Concepts
                                    </h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {selectedTech.vivaDetails.keyConcepts.map((concept, idx) => (
                                            <span
                                                key={idx}
                                                className="text-[11px] px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-lg"
                                            >
                                                {concept}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* viva questions and answers */}
                            {selectedTech.vivaDetails.vivaQuestions && selectedTech.vivaDetails.vivaQuestions.length > 0 && (
                                <div className="mt-5 pt-3 border-t border-slate-800/80">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                                            <FaQuestionCircle /> Common Viva & Interview Questions
                                        </h4>
                                        <span className="text-[11px] font-semibold px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-md w-fit">
                                            {selectedTech.vivaDetails.vivaQuestions.length} Questions Bank
                                        </span>
                                    </div>

                                    {/* search filter input */}
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
                                            .filter(
                                                (item) =>
                                                    !qaSearch ||
                                                    item.q.toLowerCase().includes(qaSearch.toLowerCase()) ||
                                                    item.a.toLowerCase().includes(qaSearch.toLowerCase())
                                            )
                                            .map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1.5 hover:border-cyan-500/30 transition-all"
                                                >
                                                    <p className="text-xs font-bold text-cyan-300">
                                                        Q: {item.q}
                                                    </p>
                                                    <p className="text-xs text-slate-300 leading-relaxed pl-2 border-l-2 border-cyan-500/40">
                                                        {item.a}
                                                    </p>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}

                            {/* modal footer */}
                            <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-6">
                                <button
                                    onClick={() => setSelectedTech(null)}
                                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                                >
                                    Close Overview
                                </button>
                                <a
                                    href={selectedTech.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
                                >
                                    <span>Official Documentation</span>
                                    <FaExternalLinkAlt size={10} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TechMarquee;
