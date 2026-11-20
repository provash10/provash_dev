"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Lock, Mail, ArrowRight, Eye, EyeOff, ShieldAlert, Sparkles } from "lucide-react";

// client login authentication page
export default function LoginPage() {
	// console.log("rendering login authentication page")

	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	// handle credentials login submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const res = await fetch("http://localhost:5000/api/v1/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();

			if (!res.ok || !data.success) {
				setError(data.message || "Invalid email or password");
				setIsLoading(false);
				return;
			}

			// store auth tokens in local storage
			if (data.data) {
				localStorage.setItem("provash_agency_token", data.data.accessToken);
				localStorage.setItem(
					"provash_agency_user",
					JSON.stringify(data.data.user),
				);
			}

			const role = data.data?.user?.role;
			if (role === "SUPER_ADMIN") {
				router.push("/dashboard/super-admin");
			} else if (role === "ADMIN") {
				router.push("/dashboard/admin");
			} else if (role === "PROJECT_MANAGER") {
				router.push("/dashboard/project-manager");
			} else {
				router.push("/dashboard/user");
			}
			router.refresh();
		} catch (_err) {
			// console.log("login connection notice", _err)
			setError("Failed to connect to authentication server. Please check backend.");
			setIsLoading(false);
		}
	};

	// fill demo admin credentials
	const fillDemoAdmin = () => {
		setEmail("admin@provash.dev");
		setPassword("Admin@provash123");
		setError("");
	};

	return (
		<div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
			<div className="w-full max-w-md rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
				<div className="absolute -top-16 -left-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
				<div className="absolute -bottom-16 -right-16 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

				{/* header */}
				<div className="text-center space-y-2 relative z-10">
					<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
						<Sparkles className="w-3 h-3" />
						Client & Admin Portal
					</div>
					<h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
						Welcome Back
					</h1>
					<p className="text-slate-400 text-xs">
						Sign in to manage your services, bookings, and invoices
					</p>
				</div>

				{/* error alert */}
				{error && (
					<div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs">
						<ShieldAlert className="w-4 h-4 flex-shrink-0" />
						<span>{error}</span>
					</div>
				)}

				{/* form */}
				<form onSubmit={handleSubmit} className="space-y-4 relative z-10">
					<div>
						<label className="block text-xs font-semibold text-slate-300 mb-1.5">
							Email Address
						</label>
						<div className="relative">
							<Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
							<input
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="admin@provash.dev"
								className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
							/>
						</div>
					</div>

					<div>
						<label className="block text-xs font-semibold text-slate-300 mb-1.5">
							Password
						</label>
						<div className="relative">
							<Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
							<input
								type={showPassword ? "text" : "password"}
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="••••••••"
								className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
							>
								{showPassword ? (
									<EyeOff className="w-4 h-4" />
								) : (
									<Eye className="w-4 h-4" />
								)}
							</button>
						</div>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 hover:from-cyan-300 hover:to-blue-400 transition-all cursor-pointer shadow-lg shadow-cyan-400/20 active:scale-[0.99] disabled:opacity-50"
					>
						{isLoading ? "Signing In..." : "Sign In"}
						<ArrowRight className="w-4 h-4" />
					</button>
				</form>

				{/* google login option */}
				<div className="relative z-10 space-y-4">
					<div className="flex items-center gap-3 my-2">
						<div className="h-px bg-slate-800 flex-1" />
						<span className="text-[11px] text-slate-500 uppercase tracking-wider">
							Or continue with
						</span>
						<div className="h-px bg-slate-800 flex-1" />
					</div>

					<button
						type="button"
						onClick={fillDemoAdmin}
						className="w-full py-2.5 rounded-xl bg-slate-950 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
					>
						<Sparkles className="w-3.5 h-3.5" />
						Auto-fill Super Admin Credentials
					</button>
				</div>

				{/* footer redirect */}
				<p className="text-center text-xs text-slate-400 relative z-10 pt-2 border-t border-slate-800">
					Don't have an account yet?{" "}
					<Link
						href="/register"
						className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
					>
						Create Account
					</Link>
				</p>
			</div>
		</div>
	);
}
