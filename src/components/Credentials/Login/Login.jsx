import React from 'react';

const Login = () => {
    return (
        <div className='flex items-center gap-2 cursor-pointer hover:text-slate-300 transition-colors bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30 px-4 py-1.5 rounded-full'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-violet-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
        <span className="font-semibold text-sm">Login</span>
      </div>
    );
};

export default Login;