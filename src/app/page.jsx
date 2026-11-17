"use client";

import dynamic from "next/dynamic";
import React from "react";

// dynamically load agency home on client to prevent browser extension hydration attribute mismatch
const AgencyHome = dynamic(
	() => import("@/components/agency/AgencyHome"),
	{
		ssr: false,
		loading: () => (
			<div className="w-full min-h-[80vh] flex items-center justify-center text-cyan-400">
				<div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
			</div>
		),
	},
);

// home page entry
export default function HomePage() {
	return (
		<div className="w-full" suppressHydrationWarning>
			<AgencyHome />
		</div>
	);
}
