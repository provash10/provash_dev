import AdminConsole from "@/components/Admin/AdminConsole";

export const metadata = {
	title: "Studio Admin Console | Provash Agency",
	description: "Studio operations and client lead management console",
};

// admin studio dedicated route page
export default function AdminDashboardPage() {
	return <AdminConsole />;
}
