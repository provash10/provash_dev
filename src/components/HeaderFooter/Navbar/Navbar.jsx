import React from 'react';
import './Navbar.css';
import Login from '@/components/Credentials/Login/Login';
import HeaderIcon from '../HeaderIcon/HeaderIcon';

const Navbar = () => {
  return (
    <div className='navbar-bg-gradient px-6 py-3 border-b-1 border-slate-950 flex justify-between items-center text-white'>
      <div>
         <img src="/img/devaioz_tlogo.png" alt="DEVAIOZ Logo" className="h-8 w-auto" />
      </div>
      <div className='flex items-center gap-3'>
        <span className='text-sm font-bold px-4 py-1.5 rounded-full text-slate-300 hover:text-white cursor-pointer transition-all bg-slate-950 hover:bg-violet-600 border border-slate-800 hover:bg-violet-500'>
          Overview</span>
        <span className='text-sm font-bold px-4 py-1.5 rounded-full text-slate-300 hover:text-white cursor-pointer transition-all bg-slate-950 hover:bg-violet-600 border border-slate-800 hover:bg-violet-500'>
          Services</span>
        <span className='text-sm font-bold px-4 py-1.5 rounded-full text-slate-300 hover:text-white cursor-pointer transition-all bg-slate-950 hover:bg-violet-600 border border-slate-800 hover:bg-violet-500'>
          Project</span>
        <span className='text-sm font-bold px-4 py-1.5 rounded-full text-slate-300 hover:text-white cursor-pointer transition-all bg-slate-950 hover:bg-violet-600 border border-slate-800 hover:bg-violet-500'>
          Contact</span>
          <span className='text-sm font-bold px-4 py-1.5 rounded-full text-slate-300 hover:text-white cursor-pointer transition-all bg-slate-950 hover:bg-violet-600 border border-slate-800 hover:bg-violet-500'>
          Launch Console</span>

        
      </div>
      <div className='flex items-center gap-2'>
        <Login></Login>
      </div>
    </div>
  );
};

export default Navbar;
