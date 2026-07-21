import ContactCard from '@/components/Cards/Showcase/ContactCard';
import React from 'react';

export const metadata = {
    title: 'Contact Me | Provash Chandra Barman',
    description: 'Get in touch with Provash Chandra Barman for full-time MERN & Next.js roles, freelance projects, and consultations.',
};

const ContactPage = () => {
    return (
        <div>
            <ContactCard />
        </div>
    );
};

export default ContactPage;