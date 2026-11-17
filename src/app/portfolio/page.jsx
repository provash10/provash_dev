"use client";

import dynamic from "next/dynamic";
import React from "react";

// dynamically load main banner on client to prevent extension hydration mismatch
const MainBanner = dynamic(
	() => import("@/components/AMainPage3000/MainBanner"),
	{
		ssr: false,
		loading: () => (
			<div className="w-full min-h-[600px] flex items-center justify-center text-cyan-400">
				<div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
			</div>
		),
	},
);

// portfolio page rendering the complete developer showcase
const PortfolioPage = () => {
	// console.log("rendering portfolio showcase page")
	return (
		<div className="w-full max-w-7xl mx-auto px-3 md:px-6 py-4" suppressHydrationWarning>
			<MainBanner />
		</div>
	);
};

export default PortfolioPage;
