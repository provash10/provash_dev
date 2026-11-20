import React from "react";
import Services from "@/components/ZShowcase/Services/Services";

export const metadata = {
	title: "Agency & Developer Services | Provash Chandra Barman",
	description:
		"Explore enterprise full-stack development, YouTube automation, and digital growth services by Provash Digital Agency.",
};

// dedicated agency services catalog page
export default function ServicesPage() {
	// console.log("rendering dedicated services catalog page")
	return (
		<main className="w-full min-h-screen bg-[#070d19] text-white">
			<Services />
		</main>
	);
}
