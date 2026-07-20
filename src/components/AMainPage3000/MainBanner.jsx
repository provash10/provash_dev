import Image from 'next/image';
import React from 'react';
import profileImg from "../../../public/img/profileImg.png"
import Statistics from '../Stats/Statistics';
import TechIcon from '../TechIcon/TechIcon';
import Link from 'next/link';

const MainBanner = () => {
    return (
        <div className='bg-gradient-to-br from-[#0b1b3d] via-[#0f2a5c] to-[#08132b] px-4 py-4 md:py-6 rounded-3xl border border-slate-900 shadow-2xl relative overflow-hidden'>
            {/* Background glowing blobs for Deep Ocean Blue & Steel Teal aesthetics */}
            <div className='absolute -left-10 -top-10 w-72 h-72 bg-teal-600/5 rounded-full blur-3xl pointer-events-none' />
            <div className='absolute -right-10 -bottom-10 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl pointer-events-none' />

            <h1 className='text-3xl md:text-5xl flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-4 md:mb-5 font-extrabold text-white tracking-tight'>
                <span className='bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-cyan-100 to-white'>
                    Welcome To My
                </span>
                <Link 
                    href="https://provash-portfolio.netlify.app" 
                    target='_blank'
                    rel="noopener noreferrer"
                    className='inline-flex items-center justify-center px-4 py-1.5 md:px-5 md:py-2 text-2xl md:text-4xl font-extrabold text-cyan-300 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-cyan-500/40 hover:border-cyan-400 rounded-2xl shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 cursor-pointer backdrop-blur-md'
                >
                    Portfolio
                </Link>
                {/* <img src="/img/devaioz_tlogo.png" alt="DEVAIOZ Logo" className="h-8 md:h-12 w-auto object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]" /> */}
            </h1>

            {/* Profile card wrapper with glassmorphism and custom top + right border highlight (diagonal shape) + solid 3D stand shadow */}
            <div className='max-w-5xl mx-auto bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 border-t-2 border-r-2 border-t-cyan-400/30 border-r-cyan-400/30 p-4 md:p-5 rounded-2xl shadow-[1px_-1px_0px_rgba(6,182,212,0.3),_2px_-2px_0px_rgba(6,182,212,0.3),_3px_-3px_0px_rgba(6,182,212,0.25),_4px_-4px_0px_rgba(6,182,212,0.25),_5px_-5px_0px_rgba(6,182,212,0.2),_6px_-6px_0px_rgba(6,182,212,0.2),_7px_-7px_0px_rgba(6,182,212,0.15),_8px_-8px_0px_rgba(6,182,212,0.15),_0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center gap-10 md:gap-24 relative z-10'>
                {/* Left side: Profile image with glowing back shadow */}
                <div className="w-36 h-36 md:w-48 md:h-48 flex-shrink-0 relative">
                    <div className='absolute inset-0 bg-gradient-to-tr from-blue-600 to-teal-600 rounded-full blur-lg opacity-25 animate-pulse' />
                    <Image
                        priority
                        className='object-cover aspect-square rounded-full border-4 border-slate-800/80 relative z-10 shadow-2xl'
                        width={192} height={192}
                        src={profileImg} alt="Profile img"
                    />
                </div>

                {/* Right side: Bio and action buttons */}
                <div className='flex-1 text-center md:text-left pr-0 md:pr-12'>
                    <h2 className='text-2xl md:text-3xl font-extrabold mb-2 tracking-tight'>
                        <span className='bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-200 to-blue-300'>
                            Hi, I’m Provash,
                        </span>
                    </h2>
                    <p className='text-slate-300 text-sm md:text-base leading-relaxed mb-4 max-w-2xl font-medium'>
                        A results-driven MERN Stack & Next.js Developer focused on building blazing-fast, server-side rendered (SSR) web applications. I specialize in turning complex designs into fully responsive, component-driven layouts. Proficient in handling asynchronous operations, custom hooks, and secure HTTP interceptors, I am dedicated to optimizing performance and delivering top-notch user experiences from scratch.
                    </p>
                    
                    {/* Action buttons with Modern Royal Blue Accent styling */}
                    <div className='flex flex-wrap items-center justify-center md:justify-start gap-4'>
                        <button className='px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full shadow-lg shadow-blue-600/25 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-sm'>
                            Download Resume
                        </button>
                        <Link href="https://www.linkedin.com/in/provashchandrabarman/" target="_blank" rel="noopener noreferrer" className='px-6 py-3 bg-blue-100 hover:bg-blue-200 text-blue-950 font-bold rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-sm'>
                            Linkedin
                        </Link>
                        <button className='px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-550 text-white font-semibold rounded-full shadow-lg shadow-blue-950/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-sm'>
                            Hire Me
                        </button>
                        <button className='px-6 py-3 bg-blue-100 hover:bg-blue-200 text-blue-950 font-bold rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-sm'>
                            Projects
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <TechIcon></TechIcon>
            </div>

            <div>
                <Statistics></Statistics>
            </div>
        </div>
    );
};

export default MainBanner;