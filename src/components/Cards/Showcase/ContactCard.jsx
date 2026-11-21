'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaPhoneAlt, FaWhatsapp, FaLinkedin, FaGithub, FaTelegram, FaDiscord, FaTwitter } from 'react-icons/fa';

const ContactCard = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // handle contact message submission to backend api
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');

        try {
            const res = await fetch('http://localhost:5000/api/v1/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    budget: 'Direct Contact Form',
                    message: `[Subject: ${formData.subject}] ${formData.message}`,
                }),
            });

            const data = await res.json();
            if (data.success) {
                setIsSubmitted(true);
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => {
                    setIsSubmitted(false);
                }, 5000);
            } else {
                setSubmitError(data.message || 'Failed to send message.');
            }
        } catch (_err) {
            // console.log('contact form error', _err)
            setSubmitError('Unable to connect to server. Please try again shortly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactDetails = [
        {
            icon: <FaEnvelope className="text-xl text-cyan-400" />,
            title: 'Email Address',
            value: 'provashchandra1000@gmail.com',
            link: 'mailto:provashchandra1000@gmail.com'
        },
        {
            icon: <FaWhatsapp className="text-xl text-emerald-400" />,
            title: 'WhatsApp / Phone',
            value: '+880 1710-490345',
            link: 'https://wa.me/8801710490345'
        },
        {
            icon: <FaMapMarkerAlt className="text-xl text-rose-400" />,
            title: 'Location',
            value: 'Dhaka, Bangladesh (Remote Available)',
            link: '#'
        }
    ];

    const socialLinks = [
        { icon: <FaGithub size={18} />, label: 'GitHub', url: 'https://github.com/provash10' },
        { icon: <FaLinkedin size={18} />, label: 'LinkedIn', url: 'https://linkedin.com' },
        { icon: <FaWhatsapp size={18} />, label: 'WhatsApp', url: 'https://wa.me/8801710490345' },
        { icon: <FaTelegram size={18} />, label: 'Telegram', url: 'https://t.me' },
        { icon: <FaDiscord size={18} />, label: 'Discord', url: 'https://discord.com' },
        { icon: <FaTwitter size={18} />, label: 'X / Twitter', url: 'https://x.com' }
    ];

    return (
        <section className="w-full min-h-screen bg-[#070d19] text-white py-12 md:py-16 px-4 md:px-8 md:pr-32 lg:pr-36 xl:pr-40 flex flex-col items-center relative overflow-hidden">
            {/* Background glowing blurred blobs */}
            <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header section with back to home button */}
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-slate-800/80 pb-6 text-center md:text-left relative z-10">
                <div className="flex flex-col items-center md:items-start">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        Available For Hire
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-md">
                        Get In Touch
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm md:text-base max-w-xl mx-auto md:mx-0">
                        Have a project in mind, a freelance inquiry, or want to collaborate? Feel free to drop a message!
                    </p>
                </div>

                <Link 
                    href="/" 
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900/80 hover:bg-slate-800 text-cyan-300 hover:text-white font-semibold rounded-full border border-slate-700/80 hover:border-cyan-400 shadow-md transition-all duration-200 text-sm cursor-pointer backdrop-blur-md self-center md:self-auto"
                >
                    ← Back to Home
                </Link>
            </div>

            {/* Contact Layout Grid */}
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                
                {/* Left Side: Contact Information & Social Links */}
                <div className="lg:col-span-5 space-y-6">
                    {/* Status Pill */}
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl">
                        <h3 className="text-xl font-bold text-white mb-2">Let’s Connect!</h3>
                        <p className="text-slate-300 text-xs leading-relaxed mb-6">
                            I am open to full-time engineering roles, freelance MERN/Next.js projects, and technical consultations.
                        </p>

                        <div className="space-y-4">
                            {contactDetails.map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.link}
                                    className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 hover:border-cyan-500/50 hover:bg-slate-800/80 transition-all duration-300 group"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-semibold text-slate-400">{item.title}</h4>
                                        <p className="text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                                            {item.value}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl">
                        <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider mb-4">
                            Social Media & Profiles
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {socialLinks.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-950/40 transition-all duration-200 text-xs font-medium"
                                >
                                    <span className="text-cyan-400">{social.icon}</span>
                                    <span>{social.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Interactive Message Form */}
                <div className="lg:col-span-7 bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 border-t-2 border-r-2 border-t-cyan-400/30 border-r-cyan-400/30 rounded-2xl p-6 md:p-8 shadow-xl flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-extrabold text-white mb-2">Send a Message</h3>
                        <p className="text-slate-400 text-xs md:text-sm mb-6">
                            Fill out the form below and I will get back to you as soon as possible.
                        </p>

                        {isSubmitted && (
                            <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-medium animate-in fade-in duration-300">
                                ✓ Thank you! Your message has been sent successfully. I’ll reply shortly.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. John Doe"
                                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                        Your Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Project Inquiry / Job Opportunity"
                                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    rows="5"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell me more about your project goals or requirements..."
                                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                                />
                            </div>

                            {submitError && (
                                <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs">
                                    {submitError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl text-xs md:text-sm shadow-lg shadow-cyan-500/25 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer disabled:opacity-50"
                            >
                                <FaPaperPlane className="text-xs" /> {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ContactCard;
