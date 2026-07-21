import React from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  return (
    <div className="group relative bg-[#0d1527]/80 border border-cyan-500/20 rounded-2xl p-5 backdrop-blur-md hover:border-cyan-400/60 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] flex flex-col justify-between">
      <div>
        <div className="relative overflow-hidden rounded-xl mb-4 border border-white/5">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-cyan-950/80 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-[10px] font-bold px-2.5 py-1 rounded-full">
            {project.category}
          </div>
        </div>

        <h3 className="text-xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-950/50 text-cyan-200 border border-cyan-500/20"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-3 border-t border-white/5">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-medium hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-white transition-all duration-300"
          >
            <FaExternalLinkAlt className="text-[10px]" /> Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800/80 border border-slate-700 text-gray-300 text-xs font-medium hover:bg-slate-700 hover:text-white transition-all duration-300"
          >
            <FaGithub className="text-xs" /> Code
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
