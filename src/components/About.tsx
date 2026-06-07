import React from "react";
import { Cpu, Terminal, Compass, GraduationCap, ShieldCheck, Activity } from "lucide-react";

export function About() {
  return (
    <section className="py-24 max-w-4xl mx-auto px-6 font-sans select-none animate-fade-in" id="foundational-principles">
      {/* Header Index */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-dashed border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-950 dark:text-white uppercase font-mono">
            // Foundational Principles
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1 uppercase tracking-wider">
            Scientific background, research paradigms, and the engineering mission
          </p>
        </div>
        <span className="text-[11px] font-mono text-zinc-400 mt-4 md:mt-0 uppercase">
          Emon Moshak profile
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Left Column: Short, precise, mathematically dense bio */}
        <div className="md:col-span-8 space-y-6 leading-relaxed text-sm sm:text-base text-zinc-700 dark:text-zinc-300">
          <div className="border border-zinc-150 bg-zinc-50/50 dark:border-zinc-850 dark:bg-zinc-950/20 p-6 rounded-2xl">
            <h3 className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">// Scientific Mission</h3>
            <p className="text-zinc-[650] dark:text-zinc-300 font-sans italic text-base">
              My engineering framework focuses on building deterministic physical mechanical systems augmented by adaptive computational intelligence. By coupling state-space vehicle dynamics with kinematics, and neural continuous learning parameter stabilizers, I strive to design next-generation autonomous robotics and smart rehabilitation interfaces.
            </p>
          </div>

          <p className="text-zinc-650 dark:text-zinc-405 text-sm sm:text-base text-justify">
            As the absolute winner of the Open Doors Olympiad in the Engineering &amp; Technology category, I combine analytical mechanics with deep computer science. My research archive is dedicated to Continual Learning, specifically preventing sequential network weight displacement during multi-task cycles—a key requirement for independent mechatronics and safety-critical edge robotics operating in evolving dynamic environments without continuous massive cloud retraining overhead.
          </p>

          <p className="text-zinc-650 dark:text-zinc-405 text-sm sm:text-base text-justify">
            Whether constructing inverse-kinematics FABRIK linkage solvers on low-precision microcontrollers, compiling complex Excel schedules into organized product trees, or checking tire slip slip curve margins under transient steer dynamic loads, my ultimate focus is technical rigor, reproducible numerical proof, and robust mathematical solutions.
          </p>
        </div>

        {/* Right Column: Research niches & academic targets */}
        <div className="md:col-span-4 space-y-6">
          <div className="border border-zinc-200 dark:border-zinc-805 bg-white dark:bg-zinc-900 rounded-xl p-5 space-y-4">
            <h4 className="font-mono text-xs font-extrabold text-zinc-950 dark:text-white uppercase border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Primary Focus Areas
            </h4>

            <div className="space-y-3 font-sans text-xs">
              <div className="space-y-1">
                <span className="font-mono font-bold text-[9.5px] uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                  01 // Kinematics &amp; Control
                </span>
                <p className="text-zinc-455 text-[11px] leading-relaxed">
                  Real-time solving of multi-joint coordinate trajectories under mechanical hardware joint restricts.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono font-bold text-[9.5px] uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                  02 // Vehicle Dynamics
                </span>
                <p className="text-zinc-455 text-[11px] leading-relaxed">
                  Planar 2-DOF state vectors, steer slip angles, tire force metrics, and active yaw rate stabilizer loops.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono font-bold text-[9.5px] uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                  03 // Deep Neural Networks
                </span>
                <p className="text-zinc-455 text-[11px] leading-relaxed">
                  Continual learning models, preventing catastrophic forgetting, synaptic consolidated networks.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono font-bold text-[9.5px] uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                  04 // Rehabilitation Tech
                </span>
                <p className="text-zinc-455 text-[11px] leading-relaxed">
                  Prosthetic coordinate alignment, smart assistive mechatronics trackers, sub-millimeter target picks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
