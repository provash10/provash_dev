"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { User, LogOut, LayoutDashboard } from "lucide-react";

// navigation login and profile action button
const Login = () => {
	// console.log("rendering navbar login button")
	const [user, setUser] = useState(null);

	useEffect(() => {
		const storedUser = localStorage.getItem("provash_agency_user");
		if (storedUser) {
			try {
				setUser(JSON.parse(storedUser));
			} catch (_err) {
				// console.log("stored user parsing error", _err)
			}
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("provash_agency_user");
		localStorage.removeItem("provash_agency_token");
		setUser(null);
		window.location.href = "/login";
	};

	if (user) {
		return (
			<div className="flex items-center gap-2 md:gap-3">
				<Link
					href="/dashboard"
					className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 hover:text-white border border-cyan-500/40 text-xs font-bold transition-all shadow-[0_0_12px_rgba(6,182,212,0.25)]"
				>
					<LayoutDashboard className="w-3.5 h-3.5" />
					<span>Dashboard</span>
				</Link>
				<div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-xs">
					<User className="w-3.5 h-3.5 text-cyan-400" />
					<span className="font-semibold text-white max-w-[100px] truncate">
						{user.name}
					</span>
				</div>
				<button
					onClick={handleLogout}
					title="Logout"
					className="p-1.5 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-900/50 transition-colors cursor-pointer"
				>
					<LogOut className="w-3.5 h-3.5" />
				</button>
			</div>
		);
	}

	return (
		<Link
			href="/login"
			className="flex items-center gap-2 cursor-pointer hover:text-white transition-all bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 px-4 py-1.5 rounded-full text-cyan-300 hover:border-cyan-400 text-xs md:text-sm font-semibold shadow-sm"
		>
			<User className="w-3.5 h-3.5" />
			<span>Login</span>
		</Link>
	);
};

export default Login;
