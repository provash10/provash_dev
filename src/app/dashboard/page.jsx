"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// central dashboard role router page
export default function DashboardPage() {
	// console.log("evaluating user role for dashboard routing")
	const router = useRouter();

	useEffect(() => {
		const storedUser = localStorage.getItem("provash_agency_user");
		const storedToken = localStorage.getItem("provash_agency_token");

		if (!storedUser || !storedToken) {
			router.push("/login");
			return;
		}

		try {
			const parsed = JSON.parse(storedUser);
			if (parsed.role === "SUPER_ADMIN") {
				router.replace("/dashboard/super-admin");
			} else if (parsed.role === "ADMIN") {
				router.replace("/dashboard/admin");
			} else if (parsed.role === "PROJECT_MANAGER") {
				router.replace("/dashboard/project-manager");
			} else {
				router.replace("/dashboard/user");
			}
		} catch (_err) {
			// console.log("failed to parse user session", _err)
			router.push("/login");
		}
	}, [router]);

	return (
		<div className="w-full min-h-[70vh] flex items-center justify-center text-cyan-400">
			<div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
		</div>
	);
}
