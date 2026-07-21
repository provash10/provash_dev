import React from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const FeaturedCard = ({ project }) => {
  return (
    <div className="group relative bg-[#0d1527]/80 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-md hover:border-cyan-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col justify-between">
      {/* Project Image Container */}
      <div className="relative overflow-hidden rounded-xl mb-6 border border-white/5">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1527] via-transparent to-transparent opacity-80" />
      </div>

      {/* Project Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold text-cyan-300 mb-1">
            {project.title}
          </h3>
          <p className="text-xs font-semibold text-blue-400 mb-3">
            {project.role}
          </p>

          <p className="text-gray-300 text-sm mb-3">
            {project.description}
          </p>

          <div className="bg-cyan-950/40 border-l-2 border-cyan-400 p-3 rounded-r-lg mb-4">
            <p className="text-xs text-gray-300">
              <strong className="text-cyan-400">Key Impact: </strong>
              {project.impact}
            </p>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="text-xs px-2.5 py-1 rounded-md bg-cyan-900/30 text-cyan-200 border border-cyan-500/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-2 border-t border-white/5">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300"
          >
            <FaExternalLinkAlt className="text-xs" /> Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800/80 border border-slate-700 text-gray-300 font-medium text-sm hover:bg-slate-700 hover:text-white transition-all duration-300"
          >
            <FaGithub /> GitHub Repo
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
