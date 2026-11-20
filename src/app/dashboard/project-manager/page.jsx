import ProjectManagerConsole from "@/components/ProjectManager/ProjectManagerConsole";

export const metadata = {
	title: "Project Manager Delivery Console | Provash Agency",
	description: "Client delivery and sprint management console",
};

// project manager dedicated route page
export default function ProjectManagerDashboardPage() {
	return <ProjectManagerConsole />;
}
