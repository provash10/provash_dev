import BlogCard from '@/components/Cards/Showcase/BlogCard';
import React from 'react';

export const metadata = {
    title: 'Blog & Articles | Provash Chandra Barman',
    description: 'Read technical articles, tutorials, and deep dives on MERN Stack, Next.js, and web application architecture by Provash Chandra Barman.',
};

const BlogPage = () => {
    return (
        <div>
            <BlogCard />
        </div>
    );
};

export default BlogPage;
