"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

// dynamic imports with ssr false to prevent browser extension attribute mismatch
const Navbar = dynamic(() => import("./Navbar/Navbar"), { ssr: false });
const HeaderIcon = dynamic(() => import("./HeaderIcon/HeaderIcon"), {
	ssr: false,
});

// conditional navigation manager based on route
export default function NavigationManager() {
	// console.log("navigation manager active route check")
	const pathname = usePathname();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	// check if route is portfolio or portfolio dependent
	const isPortfolioRoute =
		pathname === "/portfolio" ||
		pathname.startsWith("/portfolio/") ||
		pathname.startsWith("/showcase");

	return (
		<header className="sticky top-0 z-50 w-full" suppressHydrationWarning>
			{/* top navbar is rendered only on non-portfolio routes */}
			{!isPortfolioRoute && <Navbar />}

			{/* right side floating navbar is rendered only on portfolio routes */}
			{isPortfolioRoute && <HeaderIcon />}
		</header>
	);
}
