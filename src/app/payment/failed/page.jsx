"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
	XCircle,
	RefreshCcw,
	ArrowRight,
	HelpCircle,
	AlertTriangle,
} from "lucide-react";

// payment failed details component wrapped in suspense
function FailedContent() {
	// console.log("rendering payment failed notification screen")

	const searchParams = useSearchParams();

	const message =
		searchParams.get("message") ||
		"Payment was declined or cancelled by the provider.";
	const txn = searchParams.get("txn") || "";

	return (
		<div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 py-12 relative overflow-hidden">
			{/* ambient alert background glow */}
			<div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

			<div className="relative z-10 w-full max-w-md">
				{/* card container */}
				<div className="rounded-3xl bg-slate-900/90 border border-rose-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(244,63,94,0.15)] space-y-6 backdrop-blur-xl">
					{/* failed header badge */}
					<div className="text-center space-y-3">
						<div className="w-16 h-16 mx-auto rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center border-2 border-rose-500/40 shadow-[0_0_25px_rgba(244,63,94,0.3)]">
							<XCircle className="w-9 h-9" />
						</div>
						<h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
							Payment Incomplete
						</h1>
						<p className="text-slate-400 text-xs sm:text-sm max-w-sm mx-auto">
							We were unable to verify or process your transaction. No charges have been deducted from your account.
						</p>
					</div>

					{/* reason message card */}
					<div className="rounded-2xl bg-slate-950/80 border border-rose-500/20 p-4 space-y-2 text-xs">
						<div className="flex items-center gap-2 text-rose-400 font-semibold">
							<AlertTriangle className="w-4 h-4" />
							<span>Reason Reported</span>
						</div>
						<p className="text-slate-300 font-mono text-[11px] bg-rose-950/40 p-2.5 rounded-xl border border-rose-500/20">
							{message}
						</p>
						{txn && (
							<p className="text-[10px] text-slate-500 font-mono pt-1">
								Transaction Reference: {txn}
							</p>
						)}
					</div>

					{/* help notice */}
					<div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
						<HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
						<p>
							Common reasons include network timeouts, insufficient balance, or manual cancellation. You can try again or choose another payment method.
						</p>
					</div>

					{/* action buttons */}
					<div className="space-y-3 pt-2">
						<Link
							href="/#pricing"
							className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg shadow-rose-500/20 cursor-pointer"
						>
							<RefreshCcw className="w-4 h-4" />
							<span>Try Payment Again</span>
							<ArrowRight className="w-4 h-4" />
						</Link>

						<Link
							href="/contact"
							className="w-full py-2.5 px-4 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
						>
							<span>Contact Support Desk</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

// exported page with suspense boundary
export default function PaymentFailedPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen bg-slate-950 flex items-center justify-center text-rose-400">
					<div className="animate-pulse">Loading status...</div>
				</div>
			}
		>
			<FailedContent />
		</Suspense>
	);
}
