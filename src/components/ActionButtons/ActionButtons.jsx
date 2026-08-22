import React from 'react';
import Link from 'next/link';

const ActionButtons = () => {
    return (
        <div className='flex flex-wrap items-center justify-center md:justify-start gap-1.5 md:gap-2 pl-0'>
            {/* Download Resume Button with Gradient Background & Teal Glow */}
            <Link 
                href="https://drive.google.com/file/d/1_-TBEZ23iPKsUkGaK19pcY-3NdoxCyIC/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                className='px-3 md:px-3.5 py-1.5 md:py-2 bg-gradient-to-r from-slate-900 via-teal-950/80 to-slate-900 hover:from-teal-900/90 hover:via-slate-900 hover:to-teal-900/90 text-white font-semibold rounded-full border border-teal-500/40 shadow-[0_0_12px_rgba(20,184,166,0.3)] hover:shadow-[0_0_24px_rgba(20,184,166,0.65)] hover:border-teal-300 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer text-[11px] md:text-xs inline-block backdrop-blur-md whitespace-nowrap'
            >
                Download Resume
            </Link>

            {/* View Work Vibrant Cyan-Blue Gradient Button */}
            <Link 
                href="/showcase/featured-work" 
                className='px-3 md:px-3.5 py-1.5 md:py-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:via-blue-500 hover:to-cyan-400 text-white font-bold rounded-full border border-cyan-300/60 shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:shadow-[0_0_32px_rgba(6,182,212,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer text-[11px] md:text-xs inline-block backdrop-blur-md whitespace-nowrap'
            >
                Featured Work
            </Link>

            {/* Projects Gradient Button */}
            <Link 
                href="/showcase/allprojects" 
                className='px-3 md:px-3.5 py-1.5 md:py-2 bg-gradient-to-r from-slate-900 via-blue-950/80 to-slate-900 hover:from-cyan-600 hover:to-blue-600 text-slate-200 hover:text-white font-semibold rounded-full border border-slate-700/80 hover:border-cyan-400 shadow-[0_0_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer text-[11px] md:text-xs inline-block whitespace-nowrap'
            >
                Projects
            </Link>

            {/* Services Gradient Button */}
            <Link 
                href="/showcase/services" 
                className='px-3 md:px-3.5 py-1.5 md:py-2 bg-gradient-to-r from-slate-900 via-blue-950/80 to-slate-900 hover:from-cyan-600 hover:to-blue-600 text-slate-200 hover:text-white font-semibold rounded-full border border-slate-700/80 hover:border-cyan-400 shadow-[0_0_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer text-[11px] md:text-xs inline-block whitespace-nowrap'
            >
                Services
            </Link>

            {/* Software Gradient Button */}
            <Link 
                href="/showcase/services" 
                className='px-3 md:px-3.5 py-1.5 md:py-2 bg-gradient-to-r from-slate-900 via-blue-950/80 to-slate-900 hover:from-cyan-600 hover:to-blue-600 text-slate-200 hover:text-white font-semibold rounded-full border border-slate-700/80 hover:border-cyan-400 shadow-[0_0_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer text-[11px] md:text-xs inline-block whitespace-nowrap'
            >
                Software
            </Link>

            {/* Hire Me Gradient Button */}
            <Link 
                href="/contact" 
                className='px-3 md:px-3.5 py-1.5 md:py-2 bg-gradient-to-r from-slate-900 via-blue-950/80 to-slate-900 hover:from-blue-600 hover:to-indigo-600 text-slate-200 hover:text-white font-semibold rounded-full border border-slate-700/80 hover:border-cyan-400 shadow-[0_0_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer text-[11px] md:text-xs inline-block whitespace-nowrap'
            >
                Hire Me
            </Link>
        </div>
    );
};

export default ActionButtons;
