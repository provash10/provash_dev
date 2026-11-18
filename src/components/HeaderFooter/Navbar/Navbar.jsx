import React from "react";
import Link from "next/link";
import "./Navbar.css";
import Login from "@/components/Credentials/Login/Login";

// main agency navbar
const Navbar = () => {
	// console.log("rendering agency top navigation bar")
	return (
		<div className="navbar-bg-gradient px-4 md:px-8 py-3 border-b border-slate-900 flex justify-between items-center text-white sticky top-0 z-50 backdrop-blur-md">
			<Link href="/" className="flex items-center gap-2">
				<img
					src="/img/devaioz_tlogo.png"
					alt="DEVAIOZ Agency Logo"
					className="h-8 w-auto object-contain"
				/>
			</Link>
			<div className="hidden md:flex items-center gap-3">
				<Link
					href="/"
					className="text-sm font-semibold px-4 py-1.5 rounded-full text-slate-300 hover:text-white transition-all bg-slate-950/70 hover:bg-blue-600/30 border border-slate-800 hover:border-blue-500"
				>
					Home
				</Link>
				<Link
					href="/#services"
					className="text-sm font-semibold px-4 py-1.5 rounded-full text-slate-300 hover:text-white transition-all bg-slate-950/70 hover:bg-blue-600/30 border border-slate-800 hover:border-blue-500"
				>
					Services
				</Link>
				<Link
					href="/software"
					className="text-sm font-semibold px-4 py-1.5 rounded-full text-slate-300 hover:text-white transition-all bg-slate-950/70 hover:bg-cyan-600/30 border border-slate-800 hover:border-cyan-500"
				>
					Software
				</Link>
				<Link
					href="/#pricing"
					className="text-sm font-semibold px-4 py-1.5 rounded-full text-slate-300 hover:text-white transition-all bg-slate-950/70 hover:bg-blue-600/30 border border-slate-800 hover:border-blue-500"
				>
					Pricing
				</Link>
				<Link
					href="/portfolio"
					className="text-sm font-bold px-4 py-1.5 rounded-full text-cyan-300 hover:text-white transition-all bg-slate-900 hover:bg-cyan-600/40 border border-cyan-500/50 hover:border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.25)]"
				>
					Portfolio
				</Link>
				<Link
					href="/about"
					className="text-sm font-semibold px-4 py-1.5 rounded-full text-slate-300 hover:text-white transition-all bg-slate-950/70 hover:bg-blue-600/30 border border-slate-800 hover:border-blue-500"
				>
					About
				</Link>
				<Link
					href="/contact"
					className="text-sm font-semibold px-4 py-1.5 rounded-full text-slate-300 hover:text-white transition-all bg-slate-950/70 hover:bg-blue-600/30 border border-slate-800 hover:border-blue-500"
				>
					Contact
				</Link>
			</div>
			<div className="flex items-center gap-2">
				<Login />
			</div>
		</div>
	);
};

export default Navbar;
