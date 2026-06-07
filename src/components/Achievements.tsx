import React from "react";
import { ACHIEVEMENTS, CERTIFICATIONS } from "../data";
import { Award, BookOpen, Star, FileCheck, CircleDot, ShieldCheck, Milestone } from "lucide-react";
import { motion } from "motion/react";

export function Achievements() {
  const academicMetrics = [
    { label: "CSE CGPA", value: "3.70 / 4.00", desc: "Computer Science & Engineering specialization" },
    { label: "Olympiad Absolute Grade", value: "Absolute Winner", desc: "First-Tier placement globally in Tech track" },
    { label: "HSC GPA", value: "4.92 / 5.00", desc: "Pre-University analytical science matrix" },
    { label: "Archived Publications", value: "1 Paper (Zenodo)", desc: "Main author, continual learning & networks" }
  ];

  return (
    <section className="py-24 max-w-5xl mx-auto px-6 font-sans select-none animate-fade-in" id="academic-milestones">
      {/* Header index line */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-dashed border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-950 dark:text-white uppercase font-mono">
            // Milestones &amp; Academic Indexes
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1 uppercase tracking-wider">
            Verified Olympiad results, mechatronics certifications, and scholastic performance benchmarks
          </p>
        </div>
        <span className="text-[11px] font-mono text-zinc-400 mt-4 md:mt-0 uppercase">
          Dynamic validation links enabled
        </span>
      </div>

      {/* Grid of Key Scientific Academic Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {academicMetrics.map((met) => (
          <motion.div
            key={met.label}
            whileHover={{ y: -4, scale: 1.02 }}
            className="p-5 border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 rounded-xl space-y-1 text-center shadow-xs hover:border-zinc-350 dark:hover:border-zinc-800 transition duration-200 cursor-default"
          >
            <span className="block font-mono text-[9px] text-zinc-400 uppercase tracking-tight font-semibold">
              {met.label}
            </span>
            <span className="block text-xl sm:text-2xl font-extrabold font-mono text-zinc-900 dark:text-white mt-1">
              {met.value}
            </span>
            <p className="text-[10px] text-zinc-400 leading-normal font-medium pt-1.5 border-t border-zinc-50 dark:border-zinc-800/80 mt-1.5">
              {met.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Main card grid of Detailed Achievements */}
      <h3 className="font-mono text-xs font-extrabold text-zinc-450 dark:text-zinc-500 uppercase tracking-widest pl-1 mb-4 flex items-center gap-1.5">
        <Milestone className="w-4 h-4 text-blue-600" /> Selective honors &amp; recognitions
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {ACHIEVEMENTS.map((ach) => (
          <motion.div
            key={ach.title}
            whileHover={{ scale: 1.015, y: -2 }}
            className={`p-5 rounded-2xl border flex gap-4 transition-all duration-200 ${
              ach.highlight
                ? "border-blue-200 bg-blue-50/20 dark:border-blue-900/30 dark:bg-blue-950/10"
                : "border-zinc-200 bg-white dark:border-zinc-850 dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-800"
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {ach.highlight ? (
                <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              ) : (
                <FileCheck className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
              )}
            </div>

            <div className="space-y-1.5 flex-grow">
              <div className="flex justify-between items-start gap-2">
                <h4 className="text-sm font-extrabold text-zinc-950 dark:text-white font-sans">
                  {ach.title}
                </h4>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-mono text-[8px] font-bold text-zinc-400 uppercase bg-zinc-100 dark:bg-zinc-800 px-1 rounded-sm">
                    {ach.type}
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-zinc-550 dark:text-zinc-400 leading-relaxed font-normal">
                {ach.description}
              </p>
              {ach.verifyUrl && (
                <div className="pt-2">
                  <a
                    href={ach.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-mono font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    Verify Credential ↗
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Grouped Certifications Subsection */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-dashed border-zinc-200 dark:border-zinc-800 pb-4">
        <h3 className="font-mono text-xs font-extrabold text-zinc-450 dark:text-zinc-500 uppercase tracking-widest pl-1 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600" /> Certified Technical Competence Matrix
        </h3>
        <p className="text-[10px] font-mono text-zinc-400 uppercase mt-2 md:mt-0">
          Independent accreditation tracks
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CERTIFICATIONS.map((cert) => (
          <motion.div
            key={cert.title}
            whileHover={{ scale: 1.025, y: -3 }}
            className="p-4 border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 rounded-xl space-y-2 relative overflow-hidden transition-all duration-200 hover:border-zinc-300 dark:hover:border-zinc-800"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8.5px] uppercase px-2 py-0.5 rounded-sm bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 font-bold">
                {cert.category}
              </span>
              <CircleDot className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-700" />
            </div>

            <h4 className="text-xs font-bold text-zinc-900 dark:text-white line-clamp-2 min-h-[32px] pr-2 uppercase font-mono">
              {cert.title}
            </h4>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 border-t border-zinc-100 dark:border-zinc-800 pt-2">
              <span className="truncate max-w-[120px]">{cert.issuer}</span>
              <span className="font-semibold text-zinc-500 shrink-0">{cert.date}</span>
            </div>

            {cert.verifyUrl && (
              <div className="pt-2 border-t border-dashed border-zinc-100 dark:border-zinc-800/80 mt-1 flex justify-end">
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[9px] text-blue-600 dark:text-blue-400 font-bold hover:underline inline-flex items-center gap-0.5"
                >
                  Verify Certificate ↗
                </a>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
