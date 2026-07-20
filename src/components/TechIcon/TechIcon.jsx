import React from 'react';
import { FaReact, FaJs, FaNodeJs, FaGithub } from 'react-icons/fa';
import { SiExpress, SiMongodb, SiTailwindcss, SiNextdotjs, SiFirebase, SiPrisma, SiPostgresql, SiTypescript, SiGsap, SiFramer, SiShadcnui } from 'react-icons/si';
import { GiBee } from 'react-icons/gi';
import Link from 'next/link';
import './TechIcon.css';

const TechIcon = () => {
    const techStack = [
        { name: 'JavaScript', icon: <FaJs size={25} className='text-[#f7df1e]' />, url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
        { name: 'TypeScript', icon: <SiTypescript size={25} className='text-[#3178c6]' />, url: 'https://www.typescriptlang.org/' },
        { name: 'React', icon: <FaReact size={25} className='text-[#61dafb]' />, url: 'https://react.dev/' },
        { name: 'Next.js', icon: <SiNextdotjs size={25} className='text-white' />, url: 'https://nextjs.org/' },
        { name: 'Tailwind CSS', icon: <SiTailwindcss size={25} className='text-[#38bdf8]' />, url: 'https://tailwindcss.com/' },
        { name: 'Shadcn UI', icon: <SiShadcnui size={25} className='text-white' />, url: 'https://ui.shadcn.com/' },
        { name: 'Node.js', icon: <FaNodeJs size={25} className='text-[#339933]' />, url: 'https://nodejs.org/' },
        { name: 'Express', icon: <SiExpress size={25} className='text-slate-350' />, url: 'https://expressjs.com/' },
        { name: 'MongoDB', icon: <SiMongodb size={25} className='text-[#47a248]' />, url: 'https://www.mongodb.com/' },
        { name: 'Firebase', icon: <SiFirebase size={25} className='text-[#FFCA28]' />, url: 'https://firebase.google.com/' },
        { name: 'GitHub', icon: <FaGithub size={25} className='text-white' />, url: 'https://github.com/' },
        { name: 'Beekeeper Studio', icon: <GiBee size={25} className='text-[#f59e0b]' />, url: 'https://www.beekeeperstudio.io/' },
        { name: 'Prisma', icon: <SiPrisma size={25} className='text-white' />, url: 'https://www.prisma.io/' },
        { name: 'PostgreSQL', icon: <SiPostgresql size={25} className='text-[#336791]' />, url: 'https://www.postgresql.org/' },
        { name: 'GSAP', icon: <SiGsap size={25} className='text-[#88ce02]' />, url: 'https://gsap.com/' },
        { name: 'Framer Motion', icon: <SiFramer size={25} className='text-[#0055ff]' />, url: 'https://motion.dev/' }
    ];

    return (
        <div className='flex flex-wrap items-center justify-center gap-4 md:gap-5 max-w-5xl mx-auto mt-4 md:mt-6 px-2 md:px-0 relative z-10'>
            {techStack.map((tech, index) => (
                <Link 
                    href={tech.url}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='tech-icon-circle group'
                    title={tech.name}
                >
                    <div className='transition-all duration-355 group-hover:rotate-6 flex items-center justify-center'>
                        {tech.icon}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default TechIcon;