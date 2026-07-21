import AboutCard from '@/components/Cards/Showcase/AboutCard';
import React from 'react';

export const metadata = {
    title: 'About Me | Provash Chandra Barman',
    description: 'Learn more about Provash Chandra Barman, a MERN Stack & Next.js Developer specialized in building scalable web applications.',
};

const AboutPage = () => {
    return (
        <div>
            <AboutCard />
        </div>
    );
};

export default AboutPage;
