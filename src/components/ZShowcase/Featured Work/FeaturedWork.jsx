import React from "react";
import { FaGithub, FaExternalLinkAlt, FaRocket } from "react-icons/fa";
import FeaturedCard from "@/components/Cards/Showcase/FeaturedCard";

const featuredProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    role: "Lead Full-Stack (Next.js, Node.js, MongoDB)",
    description:
      "A blazing-fast online store with server-side rendering, secure checkout, and dynamic inventory management.",
    impact:
      "99+ Lighthouse Performance Score, SEO-optimized, secure payments via Stripe.",
    techStack: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS"],
    image: "https://via.placeholder.com/600x400/0f172a/38bdf8?text=E-Commerce+Platform",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
  {
    id: 2,
    title: "Real-time SaaS Dashboard",
    role: "Frontend Lead (React, GSAP, Tailwind)",
    description:
      "An intuitive analytics platform built for monitoring system operations and user interactions in real-time.",
    impact:
      "Real-time data visualization, advanced animations, role-based access control.",
    techStack: ["React", "GSAP", "Tailwind CSS", "Chart.js", "Firebase"],
    image: "https://via.placeholder.com/600x400/0f172a/38bdf8?text=SaaS+Dashboard",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
];

const FeaturedWork = () => {
  return (
    <section className="w-full min-h-screen bg-[#070d19] text-white py-12 md:py-16 px-4 md:px-8 md:pr-32 lg:pr-36 xl:pr-40 flex flex-col items-center relative overflow-hidden">
      {/* Background glowing blurred blobs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header with Back to Home */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-slate-800/80 pb-6 text-center md:text-left relative z-10">
        <div className="flex flex-col items-center md:items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            Featured Showcase
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-md">
            Featured Projects
          </h2>
          <p className="text-gray-400 mt-2 text-sm md:text-base max-w-xl mx-auto md:mx-0">
            A showcase of my top-tier full-stack & frontend engineering work
          </p>
        </div>

        <a 
          href="/" 
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900/80 hover:bg-slate-800 text-cyan-300 hover:text-white font-semibold rounded-full border border-slate-700/80 hover:border-cyan-400 shadow-md transition-all duration-200 text-sm cursor-pointer backdrop-blur-md self-center md:self-auto"
        >
          ← Back to Home
        </a>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl">
        {featuredProjects.map((project) => (
          <FeaturedCard key={project.id} project={project} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
        <button className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-105 transition-transform duration-300 flex items-center gap-2">
          <FaRocket /> Hire Me
        </button>
        <a
          href="#projects"
          className="text-sm text-cyan-400 hover:text-cyan-300 underline underline-offset-4 font-medium transition-colors"
        >
          View More Projects &rarr;
        </a>
      </div>
    </section>
  );
};

export default FeaturedWork;