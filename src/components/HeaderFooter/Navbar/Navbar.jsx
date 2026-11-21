import React from "react";
import Link from "next/link";
import "./Navbar.css";
import Login from "@/components/Credentials/Login/Login";

// main agency navbar
const Navbar = () => {
	// console.log("rendering agency top navigation bar")
	return (
		<div className="navbar-bg-gradient px-4 md:px-8 py-3 border-b border-slate-800/80 flex justify-between items-center text-white backdrop-blur-xl bg-slate-950/85 shadow-lg shadow-black/30">
			<Link href="/" className="flex items-center gap-2 group">
				{/* devaioz logo commented out pending domain purchase */}
				{/* <img src="/img/devaioz_tlogo.png" alt="devaioz logo" className="h-8 w-auto object-contain" /> */}
				<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 group-hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)]">
					<span className="text-base sm:text-lg font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-200 to-white">
						PROVASH
					</span>
					<span className="text-[11px] font-extrabold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
						DEV
					</span>
				</div>
			</Link>
			<div className="hidden md:flex items-center gap-3">
				<Link
					href="/"
					className="text-sm font-semibold px-4 py-1.5 rounded-full text-slate-300 hover:text-white transition-all bg-slate-950/70 hover:bg-blue-600/30 border border-slate-800 hover:border-blue-500"
				>
					Home
				</Link>
				<Link
					href="/services"
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
