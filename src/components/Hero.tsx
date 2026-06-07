import React from "react";
import { GraduationCap, BookOpen, Layers, ShieldCheck, FileText, ArrowDownIcon } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onNavigate: (tab: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="pt-32 pb-16 px-6 font-sans select-none max-w-4xl mx-auto text-center" id="portfolio-hero">
      {/* Profile Photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="relative mx-auto w-32 h-32 mb-6"
      >
        <div className="absolute inset-0 bg-blue-150 rounded-full blur-xl opacity-30 animate-pulse" />
        <motion.img
          whileHover={{ scale: 1.06 }}
          src="https://avatars.githubusercontent.com/u/189391537?v=4"
          alt="Emon Moshak"
          referrerPolicy="no-referrer"
          className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-md mx-auto"
        />
      </motion.div>

      {/* Small Award indicator Pill */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-mono text-[10px] uppercase font-bold tracking-wider mb-8">
        <GraduationCap className="w-3.5 h-3.5" />
        Open Doors Olympiad Absolute Winner (Engineering)
      </div>

      {/* Main minimal Display Headline */}
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.08] mb-6">
        Emon Moshak
        <span className="block text-zinc-400 dark:text-zinc-650 font-normal text-3xl sm:text-5xl mt-2 leading-tight">
          Future Robotics &amp; Automotive Engineer
        </span>
      </h1>

      {/* Scientific subhead tags */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
        <span className="font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-widest">• Olympiad First-Tier</span>
        <span className="hidden sm:inline">|</span>
        <span className="font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-widest">• Published Research Author</span>
        <span className="hidden sm:inline">|</span>
        <span className="font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-widest">• Computational System Builder</span>
      </div>

      {/* Narrative Lead Bio summary (Under 120 words) */}
      <p className="mt-8 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
        Building mechatronics controllers, inverse kinematics, and neural simulators. Winner of the global Open Doors Olympiad in Engineering &amp; Technology, pursuing physical and digital automotive system boundaries.
      </p>

      {/* CTA Trigger Array */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
        <button
          onClick={() => onNavigate("projects")}
          className="w-full sm:w-auto px-6 py-3 bg-zinc-950 text-white dark:bg-white dark:text-zinc-900 text-xs font-mono font-bold rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-100 duration-150 cursor-pointer shadow-sm"
        >
          Explore Selected Work
        </button>
        <button
          onClick={() => onNavigate("research")}
          className="w-full sm:w-auto px-6 py-3 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-xs font-mono font-bold rounded-xl duration-150 cursor-pointer"
        >
          Read Published Paper
        </button>
        <button
          onClick={() => onNavigate("cv")}
          className="w-full sm:w-auto px-6 py-3 border border-dashed border-zinc-300 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-550 dark:text-zinc-400 text-xs font-mono rounded-xl duration-150 cursor-pointer"
        >
          Download/Print CV
        </button>
      </div>

      {/* Scrolling guide decoration */}
      <div className="flex flex-col items-center justify-center gap-1.5 mt-20 text-zinc-400 dark:text-zinc-600 animate-bounce">
        <span className="font-mono text-[9px] uppercase tracking-widest">Scroll To Explore Laboratory</span>
        <ArrowDownIcon className="w-3.5 h-3.5 " />
      </div>
    </section>
  );
}
