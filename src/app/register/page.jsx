"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { User, Lock, Mail, Phone, ArrowRight, Eye, EyeOff, ShieldAlert, CheckCircle2, Sparkles } from "lucide-react";

// client register authentication page
export default function RegisterPage() {
	// console.log("rendering register authentication page")

	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	// handle client registration submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const res = await fetch("http://localhost:5000/api/v1/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, phone, password }),
			});

			const data = await res.json();

			if (!res.ok || !data.success) {
				setError(data.message || "Failed to create account");
				setIsLoading(false);
				return;
			}

			setSuccess(true);
			setTimeout(() => {
				router.push("/login");
			}, 1500);
		} catch (_err) {
			// console.log("registration connection error", _err)
			setError("Failed to connect to authentication server. Please check backend.");
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-[85vh] flex items-center justify-center py-10 px-4">
			<div className="w-full max-w-md rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
				<div className="absolute -top-16 -left-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
				<div className="absolute -bottom-16 -right-16 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

				{/* header */}
				<div className="text-center space-y-2 relative z-10">
					<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
						<Sparkles className="w-3 h-3" />
						Create Client Account
					</div>
					<h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
						Join Provash Agency
					</h1>
					<p className="text-slate-400 text-xs">
						Access bespoke web engineering, YouTube automation & marketing
					</p>
				</div>

				{/* success notice */}
				{success && (
					<div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs">
						<CheckCircle2 className="w-4 h-4 flex-shrink-0" />
						<span>Account created successfully! Redirecting to login...</span>
					</div>
				)}

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
							Full Name
						</label>
						<div className="relative">
							<User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
							<input
								type="text"
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="e.g. John Doe"
								className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
							/>
						</div>
					</div>

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
								placeholder="john@example.com"
								className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
							/>
						</div>
					</div>

					<div>
						<label className="block text-xs font-semibold text-slate-300 mb-1.5">
							Phone Number (Optional)
						</label>
						<div className="relative">
							<Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
							<input
								type="tel"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								placeholder="+8801XXXXXXXXX"
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
								minLength={6}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Minimum 6 characters"
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
						disabled={isLoading || success}
						className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 hover:from-cyan-300 hover:to-blue-400 transition-all cursor-pointer shadow-lg shadow-cyan-400/20 active:scale-[0.99] disabled:opacity-50"
					>
						{isLoading ? "Creating Account..." : "Create Account"}
						<ArrowRight className="w-4 h-4" />
					</button>
				</form>

				{/* footer redirect */}
				<p className="text-center text-xs text-slate-400 relative z-10 pt-2 border-t border-slate-800">
					Already have an account?{" "}
					<Link
						href="/login"
						className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
					>
						Sign In
					</Link>
				</p>
			</div>
		</div>
	);
}
