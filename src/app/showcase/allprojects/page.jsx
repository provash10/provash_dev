import React, { Suspense } from 'react';
import AllProjects from '@/components/ZShowcase/Projects/AllProjects';

export const metadata = {
    title: 'All Projects | Provash Chandra Barman',
    description: 'Explore all web applications, custom UI components, and MERN stack projects by Provash Chandra Barman.',
};

// all projects page entry with suspense wrapper
export default function AllProjectsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#070d19] flex items-center justify-center text-cyan-400">Loading projects...</div>}>
            <AllProjects />
        </Suspense>
    );
}
