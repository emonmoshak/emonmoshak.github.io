import React from "react";
import { Project } from "../types";
import { PROJECTS } from "../data";
import { ArrowRight, Settings, Compass, HelpCircle, Variable, ShieldAlert, Cpu } from "lucide-react";
import { motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 26 
    } 
  }
};

interface ProjectGridProps {
  onSelectProject: (slug: string) => void;
}

export function ProjectGrid({ onSelectProject }: ProjectGridProps) {
  return (
    <section className="py-20 max-w-5xl mx-auto px-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-dashed border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-950 dark:text-white uppercase font-mono">
            // Selected Systems &amp; Solvers
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1 uppercase tracking-wider">
            Planar simulators, numerical models, and optical classifiers built from first principles
          </p>
        </div>
        <span className="text-[11px] font-mono text-zinc-400 mt-4 md:mt-0 uppercase">
          Dynamic calculations active
        </span>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-8" 
        id="selected-projects-grid"
      >
        {PROJECTS.map((project) => (
          <motion.div
            key={project.slug}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.018 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => onSelectProject(project.slug)}
            className="group cursor-pointer flex flex-col gap-4 border border-zinc-200 dark:border-zinc-850 hover:border-zinc-350 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-xs transition-colors duration-200"
          >
            {/* Visual Thumbnail Art based on case study Slug */}
            <div className="aspect-[4/3] w-full bg-zinc-50 dark:bg-[#121213] rounded-xl border border-zinc-150 dark:border-zinc-850 flex items-center justify-center p-6 relative overflow-hidden">
              {/* Dynamic Abstract Blueprint Iconography */}
              {project.slug === "numerical-methods" && (
                <svg className="w-full h-full stroke-zinc-300 dark:stroke-zinc-800 fill-none" viewBox="0 0 100 100">
                  <path d="M 10 90 L 90 10" strokeDasharray="2,2" strokeWidth="0.5" />
                  <path d="M 10 50 Q 50 10 90 90" stroke="#2563EB" strokeWidth="1.5" />
                  <circle cx="50" cy="30" r="3" fill="#EF4444" stroke="none" />
                  <line x1="50" y1="30" x2="50" y2="90" stroke="#EF4444" strokeWidth="0.75" strokeDasharray="3,3" />
                  <line x1="10" y1="90" x2="90" y2="90" stroke="#A1A1AA" strokeWidth="0.5" />
                  <line x1="10" y1="10" x2="10" y2="90" stroke="#A1A1AA" strokeWidth="0.5" />
                </svg>
              )}

              {project.slug === "vehicle-dynamics" && (
                <svg className="w-full h-full stroke-zinc-300 dark:stroke-zinc-800 fill-none" viewBox="0 0 100 100">
                  {/* Road trajectory curve */}
                  <path d="M 10 70 Q 40 10 90 50" stroke="#2563EB" strokeWidth="1.5" />
                  {/* CG vehicle block */}
                  <rect x="36" y="24" width="22" height="12" rx="2" fill="none" stroke="#EF4444" strokeWidth="1.5" transform="rotate(-30 47 30)" />
                  {/* Wheel lines */}
                  <line x1="34" y1="20" x2="42" y2="16" stroke="#111" strokeWidth="3" transform="rotate(-30 47 30)" />
                  <line x1="56" y1="30" x2="64" y2="26" stroke="#111" strokeWidth="3" transform="rotate(-30 47 30)" />
                </svg>
              )}

              {project.slug === "vision-pick-place" && (
                <svg className="w-full h-full stroke-zinc-300 dark:stroke-zinc-800 fill-none" viewBox="0 0 100 100">
                  {/* Camera coordinate lens */}
                  <rect x="20" y="20" width="60" height="60" strokeDasharray="3,3" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="16" stroke="#2563EB" strokeWidth="1.5" />
                  {/* Target crosshairs lock */}
                  <line x1="50" y1="10" x2="50" y2="90" stroke="#EF4444" strokeWidth="0.5" />
                  <line x1="10" y1="50" x2="90" y2="50" stroke="#EF4444" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="4" fill="#10B981" stroke="none" />
                </svg>
              )}

              {project.slug === "ik-solver" && (
                <svg className="w-full h-full stroke-zinc-300 dark:stroke-zinc-800 fill-none" viewBox="0 0 100 100">
                  {/* Arm linkage segments */}
                  <line x1="20" y1="80" x2="55" y2="40" stroke="#2563EB" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="55" y1="40" x2="85" y2="65" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Joint pivots */}
                  <circle cx="20" cy="80" r="6" fill="#18181B" stroke="none" />
                  <circle cx="55" cy="40" r="4" fill="#18181B" stroke="none" />
                  <circle cx="85" cy="65" r="3" fill="#10B981" stroke="none" />
                  {/* Reachable boundary ring overlay */}
                  <circle cx="20" cy="80" r="70" strokeDasharray="2,2" strokeWidth="0.5" />
                </svg>
              )}

              {project.slug === "slam-simulator" && (
                <svg className="w-full h-full stroke-zinc-200 dark:stroke-zinc-850 fill-none" viewBox="0 0 100 100">
                  {/* Grid layout cells */}
                  <rect x="15" y="15" width="20" height="20" fill="rgba(37, 99, 235, 0.15)" stroke="#2563EB" strokeWidth="0.75" />
                  <rect x="35" y="15" width="20" height="20" fill="rgba(37, 99, 235, 0.15)" stroke="#2563EB" strokeWidth="0.75" />
                  <rect x="15" y="35" width="20" height="20" fill="rgba(37, 99, 235, 0.15)" stroke="#2563EB" strokeWidth="0.75" />
                  <rect x="55" y="55" width="20" height="20" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" strokeWidth="0.75" />
                  <rect x="75" y="55" width="20" height="20" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" strokeWidth="0.75" />

                  {/* Empty borders */}
                  <rect x="15" y="15" width="70" height="70" stroke="#D1D5DB" strokeWidth="0.5" />
                </svg>
              )}

              {project.slug === "embedded-motor" && (
                <svg className="w-full h-full stroke-zinc-250 dark:stroke-zinc-800 fill-none" viewBox="0 0 100 100">
                  {/* Nested columns conversion */}
                  <rect x="10" y="15" width="30" height="70" rx="3" stroke="#94A3B8" strokeWidth="0.75" />
                  <line x1="20" y1="15" x2="20" y2="85" stroke="#94A3B8" strokeWidth="0.5" />
                  <line x1="10" y1="35" x2="40" y2="35" stroke="#94A3B8" strokeWidth="0.5" />
                  <line x1="10" y1="55" x2="40" y2="55" stroke="#94A3B8" strokeWidth="0.5" />

                  {/* Transforming path arrow */}
                  <path d="M 46 50 L 54 50" stroke="#EF4444" strokeWidth="1" />
                  <path d="M 51 46 L 55 50 L 51 54" stroke="#EF4444" strokeWidth="1" />

                  <rect x="60" y="20" width="30" height="60" rx="4" stroke="#2563EB" strokeWidth="1.25" />
                  <line x1="66" y1="35" x2="84" y2="35" stroke="#2563EB" strokeWidth="1" />
                  <line x1="66" y1="50" x2="80" y2="50" stroke="#F59E0B" strokeWidth="0.75" />
                </svg>
              )}

              {/* Corner tech metrics decor */}
              <div className="absolute top-3 left-3 font-mono text-[8px] text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                ID_CORE: // {project.slug.toUpperCase()}
              </div>
              <div className="absolute bottom-3 right-3 font-mono text-[9px] text-zinc-500 font-bold border border-zinc-200 dark:border-zinc-805 bg-white dark:bg-zinc-900 px-2 py-0.5 rounded-sm">
                LAB SIM
              </div>
            </div>

            {/* Core Card Info Block */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider">
                  {project.category}
                </span>
                <span className="font-mono text-xs text-zinc-400">
                  {project.year}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-zinc-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white transform group-hover:translate-x-1.5 transition duration-150" />
              </div>

              <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed font-sans line-clamp-2">
                {project.summary}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
