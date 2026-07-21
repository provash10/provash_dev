import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedinIn, FaXTwitter, FaFacebookF, FaEnvelope, FaDiscord, FaWhatsapp, FaTelegram } from 'react-icons/fa6';
import './SocialMediaIcons.css';

const SocialMediaIcons = () => {
    const socialLinks = [
        {
            name: 'GitHub',
            url: 'https://github.com/provash10',
            icon: <FaGithub size={17} className="text-white hover:text-cyan-400 transition-colors" />
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/provashchandrabarman/',
            icon: <FaLinkedinIn size={17} className="text-[#0077b5] hover:text-blue-300 transition-colors" />
        },
        {
            name: 'WhatsApp',
            url: 'https://wa.me/',
            icon: <FaWhatsapp size={17} className="text-[#25D366] hover:text-green-300 transition-colors" />
        },
        {
            name: 'Telegram',
            url: 'https://t.me/',
            icon: <FaTelegram size={17} className="text-[#26A5E4] hover:text-sky-300 transition-colors" />
        },
        {
            name: 'Discord',
            url: 'https://discord.com/',
            icon: <FaDiscord size={17} className="text-[#5865F2] hover:text-indigo-300 transition-colors" />
        },
        {
            name: 'Twitter / X',
            url: 'https://x.com/',
            icon: <FaXTwitter size={17} className="text-white hover:text-slate-300 transition-colors" />
        },
        {
            name: 'Facebook',
            url: 'https://facebook.com/',
            icon: <FaFacebookF size={17} className="text-[#1877f2] hover:text-blue-400 transition-colors" />
        },
        {
            name: 'Email',
            url: 'mailto:barmanprovash5@gmail.com',
            icon: <FaEnvelope size={17} className="text-[#2dd4bf] hover:text-teal-300 transition-colors" />
        }
    ];

    return (
        <div className="social-media-container">
            {socialLinks.map((social, index) => (
                <Link
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-circle group"
                    title={social.name}
                >
                    <div className="transition-all duration-350 group-hover:rotate-6 flex items-center justify-center">
                        {social.icon}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default SocialMediaIcons;
