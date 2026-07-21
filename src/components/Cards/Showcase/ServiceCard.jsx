import React from 'react';

const ServiceCard = ({ service }) => {
  return (
    <div className="group relative bg-[#0d1527]/80 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-md hover:border-cyan-400/60 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] flex flex-col justify-between">
      <div>
        <div className="w-14 h-14 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          {service.icon}
        </div>

        <h3 className="text-xl font-bold text-cyan-300 mb-3 group-hover:text-cyan-200 transition-colors">
          {service.title}
        </h3>

        <p className="text-gray-400 text-xs leading-relaxed mb-6">
          {service.description}
        </p>
      </div>

      <div className="pt-4 border-t border-white/5">
        <div className="flex flex-wrap gap-1.5">
          {service.skills.map((skill, index) => (
            <span
              key={index}
              className="text-[10px] px-2.5 py-1 rounded-md bg-cyan-950/50 text-cyan-200 border border-cyan-500/20"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
