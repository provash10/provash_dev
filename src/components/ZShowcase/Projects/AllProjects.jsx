'use client';
import React, { useState, useEffect } from "react";
import { FaGithub, FaExternalLinkAlt, FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProjectCard from "@/components/Cards/Showcase/ProjectCard";

const projectsData = [
  {
    id: 1,
    title: "Shopyzu - E-Commerce Architecture",
    category: "Full-Stack",
    description:
      "A complete e-commerce website architecture featuring responsive layouts, custom cart management, and seamless UI flow.",
    techStack: ["React", "Tailwind CSS", "DaisyUI", "Node.js"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://shopyzu.com",
    githubUrl: "https://github.com/provash10/shopyzu",
  },
  {
    id: 2,
    title: "System Administration Panel",
    category: "Frontend",
    description:
      "Admin profile & management interface featuring dark mode toggle, security settings, and dynamic user controls.",
    techStack: ["React", "Tailwind CSS", "FontAwesome", "React Router"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://example.com/admin",
    githubUrl: "https://github.com/provash10/admin-panel",
  },
  {
    id: 3,
    title: "SaaS Analytics Dashboard",
    category: "Full-Stack",
    description:
      "Real-time analytics platform featuring interactive charts, custom hooks, and secure HTTP interceptors for API calls.",
    techStack: ["Next.js", "Firebase", "Axios", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://analytics.provash.dev",
    githubUrl: "https://github.com/provash10/analytics",
  },
  {
    id: 4,
    title: "Vertical Chart Visualizer",
    category: "Frontend",
    description:
      "A specialized UI component for rendering dynamic vertical charts and data graphs in React applications.",
    techStack: ["React", "Tailwind CSS", "Recharts"],
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://example.com/charts",
    githubUrl: "https://github.com/provash10/chart-visualizer",
  },
  {
    id: 5,
    title: "E-Commerce Modular RESTful API Engine",
    category: "Backend",
    description:
      "High-throughput enterprise REST API with JWT authentication, refresh token rotation, Prisma ORM, and PostgreSQL caching.",
    techStack: ["Node.js", "Express.js", "PostgreSQL", "Prisma ORM", "Redis", "JWT"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    liveUrl: "http://localhost:5000/api/v1/health",
    githubUrl: "https://github.com/provash10/ecommerce-backend-api",
  },
  {
    id: 6,
    title: "Multi-Gateway Payment & Webhook Service",
    category: "Backend",
    description:
      "Dedicated microservice for processing bKash tokenized checkout, SSLCommerz, and Stripe webhooks with idempotent logging.",
    techStack: ["Express.js", "TypeScript", "bKash API", "Stripe SDK", "Zod", "Docker"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    liveUrl: "http://localhost:5000/api/v1/payment/health",
    githubUrl: "https://github.com/provash10/payment-webhook-service",
  },
];

const categories = ["All", "Frontend", "Backend", "Full-Stack"];

const AllProjects = () => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [projectsList, setProjectsList] = useState(projectsData);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // sync active category with url query parameter
  useEffect(() => {
    if (categoryParam) {
      const lower = categoryParam.toLowerCase();
      if (lower === "frontend") {
        setActiveCategory("Frontend");
      } else if (lower === "backend") {
        setActiveCategory("Backend");
      } else if (lower === "fullstack" || lower === "full-stack") {
        setActiveCategory("Full-Stack");
      } else if (lower === "all") {
        setActiveCategory("All");
      }
    }
  }, [categoryParam]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/portfolio");
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          // merge database projects with initial showcase
          setProjectsList([...data.data, ...projectsData]);
        }
      } catch (_err) {
        // console.log("offline portfolio fetch notice", _err)
      }
    };
    loadProjects();
  }, []);

  const filteredProjects = projectsList.filter((project) => {
    const categoryLower = (project.category || "").toLowerCase();
    const matchesCategory =
      activeCategory === "All" ||
      categoryLower === activeCategory.toLowerCase() ||
      (activeCategory === "Full-Stack" && (categoryLower.includes("full-stack") || categoryLower.includes("fullstack") || categoryLower.includes("saas"))) ||
      (activeCategory === "Frontend" && categoryLower.includes("frontend")) ||
      (activeCategory === "Backend" && (categoryLower.includes("backend") || categoryLower.includes("api")));
    const techItems = project.technologies || project.techStack || [];
    const matchesSearch =
      project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      techItems.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="w-full min-h-screen bg-[#070d19] text-white py-12 md:py-16 px-4 md:px-8 md:pr-32 lg:pr-36 xl:pr-40 flex flex-col items-center relative overflow-hidden">
      {/* Background glowing blobs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Back to Home button */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 mb-10 border-b border-slate-800/80 pb-6 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            Projects Showcase
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-md">
            All Projects
          </h2>
          <p className="text-slate-400 mt-2 text-sm md:text-base max-w-xl mx-auto md:mx-0">
            Explore my complete portfolio of web applications, custom UI components, and client work.
          </p>
        </div>

        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900/80 hover:bg-slate-800 text-cyan-300 hover:text-white font-semibold rounded-full border border-slate-700/80 hover:border-cyan-400 shadow-md transition-all duration-200 text-sm cursor-pointer backdrop-blur-md self-center md:self-auto"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 mb-12 bg-[#0d1527]/60 p-4 rounded-2xl border border-cyan-500/10 backdrop-blur-md">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === category
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "bg-slate-800/60 text-gray-400 hover:text-white hover:bg-slate-700/60"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="Search projects or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400 text-sm">
          No projects found matching your search criteria.
        </div>
      )}
    </section>
  );
};

export default AllProjects;