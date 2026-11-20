import UserConsole from "@/components/User/UserConsole";

export const metadata = {
	title: "Client Portal | Provash Agency",
	description: "Personal client workspace and project inquiries",
};

// client personal portal dedicated route page
export default function UserDashboardPage() {
	return <UserConsole />;
}
