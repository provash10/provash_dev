import SuperAdminConsole from "@/components/SuperAdmin/SuperAdminConsole";

export const metadata = {
	title: "Super Admin Console | Provash Agency",
	description: "Executive control panel for super administrator",
};

// super admin top level route page
export default function TopLevelSuperAdminPage() {
	return <SuperAdminConsole />;
}
