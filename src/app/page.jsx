"use client";

import dynamic from "next/dynamic";
import React from "react";

// dynamic client import prevents extension attribute mismatch
const AgencyHome = dynamic(
	() => import("@/components/agency/AgencyHome"),
	{
		ssr: false,
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
