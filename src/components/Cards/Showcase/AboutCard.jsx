import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCode, FaBriefcase, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import profileImg from '../../../../public/img/profileImg.png';

const AboutCard = () => {
    const skills = {
        frontend: ['Next.js (SSR/SSG)', 'React.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Shadcn UI'],
        backend: ['Node.js', 'Express.js', 'Zod', 'Multer', 'RESTful APIs', 'JWT Auth', 'Axios Interceptors', 'Firebase Auth'],
        database: ['MongoDB', 'Redis', 'PostgreSQL', 'Prisma ORM', 'Beekeeper Studio'],
        tools: ['Cloudinary', 'Git & GitHub', 'VS Code', 'Vercel', 'Netlify', 'Postman']
    };

    const experiences = [
        {
            role: 'Lead MERN Stack & Next.js Developer',
            company: 'Provash Dev & Client Projects',
            period: '2023 - Present',
            description: 'Building high-performance server-side rendered (SSR) web applications, component-driven UI libraries, and optimizing Lighthouse performance scores.'
        },
        {
            role: 'Frontend & UI/UX Specialist',
            company: 'Freelance & Contract Work',
            period: '2022 - 2023',
            description: 'Designing interactive, responsive layouts, custom React hooks, and integrating secure REST APIs with error-handling interceptors.'
        }
    ];

    return (
        <section className="w-full min-h-screen bg-[#070d19] text-white py-12 md:py-16 px-4 md:px-8 md:pr-32 lg:pr-36 xl:pr-40 flex flex-col items-center relative overflow-hidden">
            {/* Background glowing blurred blobs */}
            <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header section with back to home button */}
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-slate-800/80 pb-6 text-center md:text-left relative z-10">
                <div className="flex flex-col items-center md:items-start">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        About Developer
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-md">
                        About Me
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm md:text-base max-w-xl mx-auto md:mx-0">
                        Passionate Full-Stack MERN & Next.js Engineer focused on building fast, reliable, and scalable web solutions.
                    </p>
                </div>

                <Link 
                    href="/" 
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900/80 hover:bg-slate-800 text-cyan-300 hover:text-white font-semibold rounded-full border border-slate-700/80 hover:border-cyan-400 shadow-md transition-all duration-200 text-sm cursor-pointer backdrop-blur-md self-center md:self-auto"
                >
                    ← Back to Home
                </Link>
            </div>

            {/* Main Content Grid */}
            <div className="w-full max-w-6xl space-y-10 relative z-10">
                
                {/* Profile Overview Card */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 border-t-2 border-r-2 border-t-cyan-400/30 border-r-cyan-400/30 rounded-2xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-center gap-8">
                    <div className="w-40 h-40 md:w-52 md:h-52 flex-shrink-0 relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-full blur-xl opacity-30 animate-pulse" />
                        <Image
                            priority
                            className="object-cover aspect-square rounded-full border-4 border-slate-800 relative z-10 shadow-2xl"
                            width={208}
                            height={208}
                            src={profileImg}
                            alt="Provash Chandra Barman"
                        />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2">
                            Hi, I’m <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-200 to-blue-300">Provash Chandra Barman</span>
                        </h2>
                        <p className="text-cyan-400 text-sm md:text-base font-semibold mb-4">
                            Results-Driven MERN Stack & Next.js Developer
                        </p>
                        <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                            I specialize in creating blazing-fast, server-side rendered (SSR) web applications and component-driven user interfaces. My expertise spans asynchronous JavaScript, custom React hooks, secure HTTP interceptors, and scalable database integration. Dedicated to delivering top-notch digital experiences from scratch.
                        </p>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                            <a
                                href="https://drive.google.com/file/d/1_-TBEZ23iPKsUkGaK19pcY-3NdoxCyIC/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl text-xs md:text-sm shadow-lg shadow-cyan-500/25 hover:scale-105 transition-all duration-300"
                            >
                                <FaDownload className="text-xs" /> Download Resume
                            </a>
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold rounded-xl text-xs md:text-sm border border-slate-700 hover:border-cyan-400 transition-all duration-300"
                            >
                                Explore Services <FaExternalLinkAlt className="text-[10px]" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Technical Skills Categorized */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-xl">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                        <FaCode className="text-cyan-400 text-2xl" />
                        <h3 className="text-xl md:text-2xl font-bold text-white">Technical Skills & Expertise</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider mb-3">Frontend</h4>
                            <div className="flex flex-wrap gap-2">
                                {skills.frontend.map((item, idx) => (
                                    <span key={idx} className="text-xs px-2.5 py-1 bg-cyan-950/50 border border-cyan-500/20 text-cyan-200 rounded-md font-medium">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider mb-3">Backend</h4>
                            <div className="flex flex-wrap gap-2">
                                {skills.backend.map((item, idx) => (
                                    <span key={idx} className="text-xs px-2.5 py-1 bg-cyan-950/50 border border-cyan-500/20 text-cyan-200 rounded-md font-medium">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider mb-3">Database</h4>
                            <div className="flex flex-wrap gap-2">
                                {skills.database.map((item, idx) => (
                                    <span key={idx} className="text-xs px-2.5 py-1 bg-cyan-950/50 border border-cyan-500/20 text-cyan-200 rounded-md font-medium">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider mb-3">Tools & Hosting</h4>
                            <div className="flex flex-wrap gap-2">
                                {skills.tools.map((item, idx) => (
                                    <span key={idx} className="text-xs px-2.5 py-1 bg-cyan-950/50 border border-cyan-500/20 text-cyan-200 rounded-md font-medium">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Experience Timeline */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-xl">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                        <FaBriefcase className="text-cyan-400 text-2xl" />
                        <h3 className="text-xl md:text-2xl font-bold text-white">Experience & Roles</h3>
                    </div>

                    <div className="space-y-6">
                        {experiences.map((exp, index) => (
                            <div key={index} className="border-l-2 border-cyan-500/40 pl-4 md:pl-6 relative">
                                <div className="w-3 h-3 bg-cyan-400 rounded-full absolute -left-[7px] top-1 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                                    <h4 className="text-lg font-bold text-slate-100">{exp.role}</h4>
                                    <span className="text-xs font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full w-fit">
                                        {exp.period}
                                    </span>
                                </div>
                                <p className="text-xs font-medium text-slate-400 mb-2">{exp.company}</p>
                                <p className="text-slate-300 text-sm leading-relaxed">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutCard;
