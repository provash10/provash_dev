import React from "react";
import ServiceCard from "@/components/Cards/Showcase/ServiceCard";
import {
  FaCode,
  FaRocket,
  FaLayerGroup,
  FaServer,
  FaTools,
  FaShieldAlt,
} from "react-icons/fa";

const servicesData = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    icon: <FaCode className="text-3xl text-cyan-400" />,
    description:
      "Building scalable, end-to-end web applications using the MERN stack (MongoDB, Express, React, Node.js) with dynamic and secure user flows.",
    skills: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    id: 2,
    title: "Next.js & SSR Optimization",
    icon: <FaRocket className="text-3xl text-cyan-400" />,
    description:
      "Developing blazing-fast, server-side rendered (SSR) web applications focused on SEO performance, speed, and exceptional user experiences.",
    skills: ["Next.js", "SSR / SSG", "SEO", "Performance Tuning"],
  },
  {
    id: 3,
    title: "Frontend & UI/UX Architecture",
    icon: <FaLayerGroup className="text-3xl text-cyan-400" />,
    description:
      "Converting complex designs into fully responsive, component-driven layouts with interactive animations and sleek styling.",
    skills: ["Tailwind CSS", "DaisyUI", "GSAP", "Framer Motion"],
  },
  {
    id: 4,
    title: "REST API & Secure Interceptors",
    icon: <FaServer className="text-3xl text-cyan-400" />,
    description:
      "Designing and integrating RESTful APIs equipped with custom Axios interceptors, JWT authentication, and seamless error handling.",
    skills: ["Axios Interceptors", "REST API", "Firebase Auth", "JWT"],
  },
  {
    id: 5,
    title: "State Management & Custom Hooks",
    icon: <FaTools className="text-3xl text-cyan-400" />,
    description:
      "Structuring clean and maintainable frontend architectures with custom React hooks, efficient context usage, and state isolation.",
    skills: ["React Hooks", "Context API", "Redux Toolkit", "TanStack Query"],
  },
  {
    id: 6,
    title: "Code Optimization & Maintenance",
    icon: <FaShieldAlt className="text-3xl text-cyan-400" />,
    description:
      "Refactoring legacy codebases, fixing application bugs, and enforcing top-tier security standards to ensure long-term stability.",
    skills: ["Bug Fixing", "Code Refactoring", "Security", "Clean Code"],
  },
];

const Services = () => {
  return (
    <section className="w-full min-h-screen bg-[#070d19] text-white py-12 md:py-16 px-4 md:px-8 md:pr-32 lg:pr-36 xl:pr-40 flex flex-col items-center relative overflow-hidden">
      {/* Background glowing blurred blobs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header section with back to home button */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-slate-800/80 pb-6 text-center md:text-left relative z-10">
        <div className="flex flex-col items-center md:items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            Services Showcase
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-md">
            Services I Offer
          </h2>
          <p className="text-gray-400 mt-2 text-sm md:text-base max-w-xl mx-auto md:mx-0">
            Delivering high-quality frontend, full-stack, and performance-focused web solutions tailored to modern standards.
          </p>
        </div>

        <a 
          href="/" 
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900/80 hover:bg-slate-800 text-cyan-300 hover:text-white font-semibold rounded-full border border-slate-700/80 hover:border-cyan-400 shadow-md transition-all duration-200 text-sm cursor-pointer backdrop-blur-md self-center md:self-auto"
        >
          ← Back to Home
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {servicesData.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
};

export default Services;