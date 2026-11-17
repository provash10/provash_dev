"use client";

import { usePathname } from "next/navigation";
import React from "react";
import HeaderIcon from "./HeaderIcon/HeaderIcon";
import Navbar from "./Navbar/Navbar";

// conditional navigation manager based on route
export default function NavigationManager() {
	// console.log("navigation manager active route check")
	const pathname = usePathname();

	// check if route is portfolio or portfolio dependent
	const isPortfolioRoute =
		pathname === "/portfolio" ||
		pathname.startsWith("/portfolio/") ||
		pathname.startsWith("/showcase");

	return (
		<>
			{/* top navbar is rendered only on non-portfolio routes */}
			{!isPortfolioRoute && <Navbar />}

			{/* right side floating navbar is rendered only on portfolio routes */}
			{isPortfolioRoute && <HeaderIcon />}
		</>
	);
}
