import React from "react";
import AgencyHome from "@/components/agency/AgencyHome";

// home page entry
export default function HomePage() {
	return (
		<div className="w-full" suppressHydrationWarning>
			<AgencyHome />
		</div>
	);
}
