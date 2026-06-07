import React, { useRef } from "react";
import { PROJECTS, CERTIFICATIONS, ACHIEVEMENTS, RESEARCH_PAPER } from "../data";
import { Printer, Download, Mail, Github, Award, CheckCircle, ExternalLink } from "lucide-react";

export function InteractiveResume() {
  const resumeRef = useRef<HTMLDivElement | null>(null);

  const triggerSystemPrint = () => {
    window.print();
  };

  return (
    <section className="py-24 max-w-4xl mx-auto px-6 font-sans select-none animate-fade-in" id="academic-resume">
      {/* Action controls widget- Hidden on print */}
      <div className="flex items-center justify-between border-b border-dashed border-zinc-200 dark:border-zinc-800 pb-6 mb-10 print:hidden">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-950 dark:text-white uppercase font-mono">
            // PRINTABLE ACADEMIC CV
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1 uppercase tracking-wider">
            LaTeX-styled structured academic resume optimized for printing
          </p>
        </div>
        <button
          onClick={triggerSystemPrint}
          className="inline-flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 text-xs font-mono font-bold px-4 py-2 rounded-xl duration-150 shadow-sm cursor-pointer"
        >
          <Printer className="w-4 h-4" /> Print / Save PDF
        </button>
      </div>

      {/* Main Page Layout Wrapper - LaTeX Computer Modern feel */}
      <div
        ref={resumeRef}
        className="bg-white dark:bg-zinc-950 p-8 sm:p-12 border border-zinc-200 dark:border-zinc-850 rounded-2xl shadow-sm font-serif max-w-[800px] mx-auto text-zinc-900 dark:text-zinc-150 print:border-0 print:shadow-none print:p-0 print:bg-white print:text-black"
        id="latex-printable-cv"
      >
        {/* CV Header details */}
        <header className="text-center space-y-2 border-b-2 border-zinc-900 dark:border-zinc-200 pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight font-sans uppercase">
            Emon Moshak
          </h1>
          <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 print:text-zinc-630">
            Open Doors Olympiad Winner | Future Robotics &amp; Automotive Engineer
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-mono text-zinc-500 dark:text-zinc-400 print:text-zinc-630 pt-1">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> emoshayek@gmail.com
            </span>
            <span>|</span>
            <span className="flex items-center gap-1">
              <Github className="w-3.5 h-3.5" /> github.com/emonmoshak
            </span>
            <span>|</span>
            <span>Abstract Publication: DOI.10.5281/zenodo</span>
          </div>
        </header>

        {/* Education Row Section */}
        <section className="mt-8 space-y-4">
          <h2 className="text-sm font-sans font-bold uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 pb-1 text-zinc-950 dark:text-white print:border-zinc-400">
            Education
          </h2>
          <div className="space-y-4 font-sans text-xs">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-1">
              <div>
                <h3 className="font-bold text-zinc-950 dark:text-white text-base">
                  BS in Computer Science &amp; Engineering (CSE)
                </h3>
                <p className="text-zinc-800 dark:text-zinc-200 text-xs font-semibold">
                  City University
                </p>
                <p className="text-zinc-[600] dark:text-zinc-400 text-xs">
                  Scholar path — 1 semester completed
                </p>
              </div>
              <div className="text-right sm:text-right font-mono text-[10px] text-zinc-400">
                <span>Grade: 3.70 / 4.00 CGPA</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-1">
              <div>
                <h3 className="font-bold text-zinc-950 dark:text-white text-base">
                  Higher Secondary Certificate (HSC)
                </h3>
                <p className="text-zinc-800 dark:text-zinc-200 text-xs font-semibold">
                  Jahangirnagar University School and College
                </p>
                <p className="text-zinc-[600] dark:text-zinc-400 text-xs">
                  Analytical Mathematics &amp; Science focus matrix
                </p>
              </div>
              <div className="text-right sm:text-right font-mono text-[10px] text-zinc-400">
                <span>Grade: 4.92 / 5.00 GPA</span>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Publications Section */}
        <section className="mt-8 space-y-4">
          <h2 className="text-sm font-sans font-bold uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 pb-1 text-zinc-950 dark:text-white print:border-zinc-400">
            Archived Publications
          </h2>
          <div className="space-y-2 text-xs">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2">
              <div>
                <h3 className="font-sans font-bold text-zinc-900 dark:text-white text-base">
                  "{RESEARCH_PAPER.title}"
                </h3>
                <p className="text-zinc-[600] dark:text-zinc-400 leading-normal font-sans italic mt-1 pr-6 text-justify">
                  {RESEARCH_PAPER.abstract}
                </p>
              </div>
              <span className="font-mono text-[10px] text-zinc-400 font-bold whitespace-nowrap">
                Oct 2024
              </span>
            </div>
            <p className="font-mono text-[10px] text-zinc-500 pt-1">
              DOI: 10.5281/zenodo.1048821 (Zenodo publication indexing tracker)
            </p>
          </div>
        </section>

        {/* Selected Projects Summary Section */}
        <section className="mt-8 space-y-4">
          <h2 className="text-sm font-sans font-bold uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 pb-1 text-zinc-950 dark:text-white print:border-zinc-400">
            Representative Engineering Designs
          </h2>
          <div className="space-y-4 font-sans text-xs">
            {PROJECTS.slice(0, 4).map((p) => (
              <div key={p.slug} className="space-y-1 text-justify">
                <div className="flex justify-between items-baseline font-mono text-[10px] text-zinc-400 font-bold">
                  <span className="font-sans font-extrabold text-sm text-zinc-900 dark:text-white capitalize">
                    {p.title}
                  </span>
                  <span>{p.year}</span>
                </div>
                <div className="font-mono text-[9px] text-blue-600 dark:text-blue-400 uppercase font-semibold">
                  Category: {p.category} | Stack: {p.implementation.tech.join(", ")}
                </div>
                <p className="text-zinc-[600] dark:text-zinc-400 leading-relaxed text-xs">
                  {p.overview}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Awards & Achievements Section */}
        <section className="mt-8 space-y-4">
          <h2 className="text-sm font-sans font-bold uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 pb-1 text-zinc-950 dark:text-white print:border-zinc-400">
            Selected Honors &amp; Recognitions
          </h2>
          <div className="space-y-2 font-sans text-xs">
            {ACHIEVEMENTS.map((ach) => (
              <div key={ach.title} className="flex gap-2 items-start text-justify">
                <span className="text-zinc-455 font-bold font-mono">[•]</span>
                <div>
                  <strong className="text-zinc-900 dark:text-white font-extrabold">{ach.title}</strong> — <span className="text-zinc-[600] dark:text-zinc-405">{ach.description}</span>
                  {ach.verifyUrl && (
                    <span className="print:hidden whitespace-nowrap ml-2">
                      <a
                        href={ach.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[9px] text-blue-600 dark:text-blue-400 font-bold hover:underline"
                      >
                        [Verify ↗]
                      </a>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills list table section */}
        <section className="mt-8 space-y-4">
          <h2 className="text-sm font-sans font-bold uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 pb-1 text-zinc-950 dark:text-white print:border-zinc-400">
            Acquired Engineering Standards
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4 font-sans text-xs pt-1">
            <div className="space-y-0.5">
              <span className="font-bold block uppercase text-[10px] text-zinc-400 tracking-tight">Kinematics &amp; Control</span>
              <p className="text-zinc-650 dark:text-zinc-400">FABRIK joints, planars, Affine coordinate maps, mechatronic calibration.</p>
            </div>
            <div className="space-y-0.5">
              <span className="font-bold block uppercase text-[10px] text-zinc-400 tracking-tight">Linear Algebra &amp; Solvers</span>
              <p className="text-zinc-650 dark:text-zinc-400">Gauss-Seidel, Jacobi systems, Newton root approximation, float limits.</p>
            </div>
            <div className="space-y-0.5">
              <span className="font-bold block uppercase text-[10px] text-zinc-400 tracking-tight">Vehicle Physics</span>
              <p className="text-zinc-650 dark:text-zinc-400">2-DOF bicycle state dynamics, lateral torque forces, tire slip equations.</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
