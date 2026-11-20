"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
	CheckCircle2,
	Download,
	ArrowRight,
	ExternalLink,
	ShieldCheck,
	Receipt,
	LayoutDashboard,
} from "lucide-react";

// payment success details component wrapped in suspense
function SuccessContent() {
	// console.log("rendering payment success receipt screen")

	const searchParams = useSearchParams();

	const invoice = searchParams.get("invoice") || "INV-SAMPLE";
	const txn = searchParams.get("txn") || "TXN-SAMPLE";
	const amount = searchParams.get("amount") || "15000";
	const service = searchParams.get("service") || "Digital Agency Sprint";

	// print invoice trigger
	const handlePrint = () => {
		if (typeof window !== "undefined") {
			window.print();
		}
	};

	return (
		<div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 py-12 relative overflow-hidden">
			{/* glowing background ambient effect */}
			<div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

			<div className="relative z-10 w-full max-w-lg">
				{/* card container */}
				<div className="rounded-3xl bg-slate-900/90 border border-emerald-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(16,185,129,0.15)] space-y-6 backdrop-blur-xl">
					{/* success header badge */}
					<div className="text-center space-y-3">
						<div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border-2 border-emerald-400/40 shadow-[0_0_25px_rgba(16,185,129,0.3)] animate-pulse">
							<CheckCircle2 className="w-9 h-9" />
						</div>
						<h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
							Payment Completed!
						</h1>
						<p className="text-slate-400 text-xs sm:text-sm max-w-sm mx-auto">
							Thank you for your order. Your project sprint has been initiated in our production roadmap.
						</p>
					</div>

					{/* receipt details card */}
					<div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-5 space-y-3.5 text-xs">
						<div className="flex items-center justify-between border-b border-slate-800 pb-3">
							<div className="flex items-center gap-2 text-slate-400 font-semibold">
								<Receipt className="w-4 h-4 text-cyan-400" />
								<span>Invoice Number</span>
							</div>
							<span className="font-mono text-cyan-300 font-bold">
								#{invoice}
							</span>
						</div>

						<div className="flex items-center justify-between">
							<span className="text-slate-400">Transaction ID</span>
							<span className="font-mono text-slate-200">{txn}</span>
						</div>

						<div className="flex items-center justify-between">
							<span className="text-slate-400">Purchased Service</span>
							<span className="font-semibold text-white text-right max-w-[200px] truncate">
								{service}
							</span>
						</div>

						<div className="flex items-center justify-between">
							<span className="text-slate-400">Payment Status</span>
							<span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
								PAID & VERIFIED
							</span>
						</div>

						<div className="flex items-center justify-between border-t border-slate-800 pt-3">
							<span className="text-slate-300 font-bold text-sm">
								Total Paid
							</span>
							<span className="text-xl font-black text-emerald-400">
								৳{Number(amount).toLocaleString()} BDT
							</span>
						</div>
					</div>

					{/* sprint assurance notice */}
					<div className="flex items-start gap-3 p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-400">
						<ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
						<p>
							A confirmation receipt has been sent to your email. You can monitor milestone progress directly in your Client Portal.
						</p>
					</div>

					{/* actions */}
					<div className="space-y-3 pt-2">
						<Link
							href="/dashboard/user"
							className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
						>
							<LayoutDashboard className="w-4 h-4" />
							<span>Go to Client Portal</span>
							<ArrowRight className="w-4 h-4" />
						</Link>

						<div className="grid grid-cols-2 gap-3">
							<button
								type="button"
								onClick={handlePrint}
								className="py-2.5 px-4 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
							>
								<Download className="w-3.5 h-3.5" />
								<span>Print Receipt</span>
							</button>

							<Link
								href="/"
								className="py-2.5 px-4 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
							>
								<span>Back to Home</span>
								<ExternalLink className="w-3.5 h-3.5" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// exported page with suspense boundary
export default function PaymentSuccessPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen bg-slate-950 flex items-center justify-center text-emerald-400">
					<div className="animate-pulse">Loading receipt...</div>
				</div>
			}
		>
			<SuccessContent />
		</Suspense>
	);
}
