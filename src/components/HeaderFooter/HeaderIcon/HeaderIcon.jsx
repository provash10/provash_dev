'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBusinessTime, FaHome, FaTools, FaBars, FaTimes } from 'react-icons/fa';
import { IoMdContact } from 'react-icons/io';
import { LiaBlogSolid } from 'react-icons/lia';
import { MdContactPhone } from 'react-icons/md';

import { usePathname } from 'next/navigation';

const HeaderIcon = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeHash, setActiveHash] = useState('/');
    const pathname = usePathname();

    useEffect(() => {
        const handleHashChange = () => {
            setActiveHash(window.location.hash || '/');
        };
        // Initial check
        handleHashChange();
        
        window.addEventListener('hashchange', handleHashChange);
        window.addEventListener('popstate', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            window.removeEventListener('popstate', handleHashChange);
        };
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    // floating menu navigation items
    const menuItems = [
        { href: "/", label: "HOME", icon: <FaHome size={24} /> },
        { href: "/portfolio", label: "PORTFOLIO", icon: <FaTools size={24} /> },
        { href: "/showcase/services", label: "SERVICES", icon: <FaBusinessTime size={24} /> },
        { href: "/showcase/allprojects", label: "PROJECTS", icon: <FaTools size={24} /> },
        { href: "/about", label: "ABOUT", icon: <IoMdContact size={24} /> },
        { href: "/contact", label: "CONTACT", icon: <MdContactPhone size={24} /> },
        { href: "/blog", label: "BLOG", icon: <LiaBlogSolid size={24} /> },
    ];

    return (
        <>
            {/* Desktop View: Floating Navbar on the right */}
            <div className='fixed right-8 md:right-10 lg:right-12 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-3'>
                {menuItems.map((item, index) => {
                    // Check if current item is active. Default to home ('/') if hash is empty.
                    const isActive = pathname === item.href || activeHash === item.href || (item.href === '/' && (pathname === '/' || activeHash === '/' || activeHash === '' || activeHash === '#'));
                    return (
                        <Link 
                            key={index}
                            href={item.href} 
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer hover:scale-110
                                ${isActive 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/35 border border-blue-500' 
                                    : 'bg-slate-900 text-slate-400 hover:bg-blue-600 hover:text-white border border-slate-800 hover:border-blue-500 shadow-slate-950/50'
                                }`}
                            title={item.label}
                        >
                            {item.icon}
                        </Link>
                    );
                })}
            </div>

            {/* Mobile View: Top Header Bar */}
            <div className='fixed top-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 z-40 flex md:hidden items-center justify-between px-6 shadow-md'>
                <div>
                    <img src="/img/devaioz_tlogo.png" alt="DEVAIOZ Logo" className="h-7 w-auto" />
                </div>
                <button onClick={toggleMenu} className='text-blue-500 hover:text-blue-400 p-2 focus:outline-none cursor-pointer' aria-label="Open Menu">
                    <FaBars size={24} />
                </button>
            </div>

            {/* Mobile View: Full-Screen Drawer Menu */}
            {isOpen && (
                <div className='fixed inset-0 bg-slate-950/98 backdrop-blur-lg z-50 flex flex-col p-6 animate-in fade-in duration-200 md:hidden'>
                    {/* Drawer Header */}
                    <div className='flex items-center justify-between h-12 flex-shrink-0'>
                        <div>
                            <img src="/img/devaioz_tlogo.png" alt="DEVAIOZ Logo" className="h-7 w-auto" />
                        </div>
                        <button onClick={toggleMenu} className='text-blue-500 hover:text-blue-400 p-2 focus:outline-none cursor-pointer' aria-label="Close Menu">
                            <FaTimes size={26} />
                        </button>
                    </div>

                    {/* Drawer Items */}
                    <div className='flex-1 flex flex-col items-center justify-center gap-8 pb-12'>
                        {menuItems.map((item, index) => {
                            const isActive = pathname === item.href || activeHash === item.href || (item.href === '/' && (pathname === '/' || activeHash === '/' || activeHash === '' || activeHash === '#'));
                            return (
                                <Link 
                                    key={index}
                                    href={item.href} 
                                    onClick={toggleMenu}
                                    className={`flex items-center gap-4 text-xl font-bold hover:scale-105 transition-all duration-200 px-6 py-2 rounded-xl w-48 justify-start cursor-pointer
                                        ${isActive 
                                            ? 'text-white bg-blue-600 shadow-md shadow-blue-600/20' 
                                            : 'text-blue-400 hover:text-blue-300 hover:bg-blue-600/10'
                                        }`}
                                >
                                    <span className={isActive ? 'text-white' : 'text-blue-500'}>{item.icon}</span>
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default HeaderIcon;