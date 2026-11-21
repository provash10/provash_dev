import BlogCard from "@/components/Cards/Showcase/BlogCard";
import React from "react";

export const metadata = {
	title: "Blogs & Technical Articles | Provash Chandra Barman",
	description:
		"Read engineering blogs, architecture deep-dives, and tutorials by Provash Chandra Barman.",
};

// dedicated blogs route page
export default function BlogsPage() {
	// console.log("rendering dedicated blogs route page")
	return (
		<div>
			<BlogCard />
		</div>
	);
}
