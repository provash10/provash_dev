import React from 'react';

const Statistics = () => {
    const statsData = [
        { value: '3+', label: 'Years Experience' },
        { value: '50+', label: 'Projects Completed' },
        { value: '15+', label: 'Technologies Mastered' },
        { value: '100%', label: 'Client Satisfaction' }
    ];

    return (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mt-6 md:mt-8 px-2 md:px-0 relative z-10'>
            {statsData.map((stat, index) => (
                <div 
                    key={index}
                    className='bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 border-t-2 border-r-2 border-t-cyan-400/20 border-r-cyan-400/20 p-4 md:p-5 rounded-2xl shadow-[4px_-4px_0px_rgba(6,182,212,0.15),_0_10px_20px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center text-center hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group'
                >
                    <span className='text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-200 to-blue-300 group-hover:animate-pulse'>
                        {stat.value}
                    </span>
                    <span className='text-slate-400 text-xs md:text-sm font-semibold mt-1 tracking-wide uppercase'>
                        {stat.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Statistics;