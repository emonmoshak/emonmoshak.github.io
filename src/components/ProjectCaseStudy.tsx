import React from "react";
import { Project } from "../types";
import {
  NumericalMethodsSimulator,
  VehicleDynamicsSimulator,
  RoboticVisionSimulator,
  KinematicsSolverSimulator,
  BitmapSolverSimulator,
  SheetCsvMenuSimulator
} from "./Simulators";
import { ArrowLeft, Github, ExternalLink, Library, Database, Cpu, Milestone, TrendingUp, HelpCircle } from "lucide-react";

interface ProjectCaseStudyProps {
  project: Project;
  onBack: () => void;
}

export function ProjectCaseStudy({ project, onBack }: ProjectCaseStudyProps) {
  // Render matching interactive simulation inside Case Study
  const renderSimulator = () => {
    switch (project.slug) {
      case "numerical-methods":
        return <NumericalMethodsSimulator />;
      case "vehicle-dynamics":
        return <VehicleDynamicsSimulator />;
      case "vision-pick-place":
        return <RoboticVisionSimulator />;
      case "ik-solver":
        return <KinematicsSolverSimulator />;
      case "slam-simulator":
        return <BitmapSolverSimulator />;
      case "embedded-motor":
        return <SheetCsvMenuSimulator />;
      default:
        return null;
    }
  };

  return (
    <article className="py-24 max-w-4xl mx-auto px-6 font-sans select-none animate-fade-in" id="project-case-study">
      {/* Back to Home anchor */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition duration-150 mb-10 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to selected systems
      </button>

      {/* Case Study Header Hero */}
      <header className="border-b border-dashed border-zinc-200 dark:border-zinc-800 pb-8 mb-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest bg-blue-50 dark:bg-blue-950/25 px-2.5 py-1 rounded">
            {project.category}
          </span>
          <span className="font-mono text-xs text-zinc-400">
            Research Index: {project.year}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white mt-1">
          {project.title}
        </h1>

        <p className="mt-4 text-sm sm:text-base text-zinc-550 dark:text-zinc-400 leading-relaxed font-sans max-w-3xl">
          {project.summary}
        </p>

        {/* External links */}
        <div className="flex flex-wrap gap-4 mt-6">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition"
            >
              <Github className="w-4 h-4" /> [VIEW ON GITHUB REPOSITORY] ↗
            </a>
          )}
          {project.externalUrl && project.externalUrl !== "#" && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition"
            >
              <ExternalLink className="w-4 h-4" /> [Simulated Deployment]
            </a>
          )}
        </div>
      </header>

      {/* RENDER ACTIVE SIMULATION (Absolute climax of technical credibility) */}
      <section className="mb-14" id="case-study-workspace-simulator">
        <div className="flex items-center gap-2 mb-4 font-mono text-xs font-bold text-zinc-700 dark:text-zinc-200">
          <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin" />
          // DYNAMIC COMPUTATION WORKSPACE
        </div>
        {renderSimulator()}
      </section>

      {/* Case details split column grids */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-12 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
        {/* Left Side: Summary, problem statement, parameters */}
        <div className="md:col-span-8 space-y-10">
          {/* Overview Section */}
          <section className="space-y-3">
            <h3 className="font-mono text-xs font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-600" /> System Overview
            </h3>
            <p className="text-zinc-[600] dark:text-zinc-350 text-sm leading-relaxed">
              {project.overview}
            </p>
          </section>

          {/* Problem Statement Section */}
          <section className="space-y-3">
            <div className="p-4 bg-orange-50/50 dark:bg-amber-950/10 border border-orange-200/30 dark:border-amber-900/20 rounded-xl space-y-2">
              <h3 className="font-mono text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" /> Core Engineering Problem
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed">
                {project.problem}
              </p>
            </div>
          </section>

          {/* Theoretical Foundations & Mathematical Formulations */}
          <section className="space-y-4">
            <h3 className="font-mono text-xs font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Library className="w-4 h-4 text-blue-600" /> Theoretical Foundations
            </h3>
            <p className="text-zinc-[600] dark:text-zinc-350 text-sm leading-relaxed">
              {project.mathTheory.description}
            </p>
            <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-xl p-4 space-y-2 text-center">
              {project.mathTheory.equations.map((eq, i) => (
                <div key={i} className="font-mono text-xs sm:text-sm dark:text-zinc-300 py-1 flex items-center justify-center gap-2">
                  <span className="text-blue-500 font-bold">eq.{i + 1} //</span>
                  <code className="bg-zinc-100 dark:bg-zinc-900 px-3 py-1 rounded border border-zinc-200 dark:border-zinc-800 tracking-wide">
                    {eq}
                  </code>
                </div>
              ))}
            </div>
          </section>

          {/* Implementation & Algorithms */}
          <section className="space-y-3">
            <h3 className="font-mono text-xs font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Milestone className="w-4 h-4 text-blue-600" /> Implementation Layout
            </h3>
            <p className="text-zinc-[600] dark:text-zinc-350 text-sm leading-relaxed">
              {project.implementation.details}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.implementation.algorithms.map((algo) => (
                <span
                  key={algo}
                  className="font-mono text-[10px] uppercase font-bold text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-850 px-2.5 py-1 rounded"
                >
                  {algo}
                </span>
              ))}
            </div>
          </section>

          {/* Trade-offs & Engineering Challenges */}
          <section className="space-y-3">
            <h3 className="font-mono text-xs font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              // Trade-offs &amp; Bottlenecks
            </h3>
            <ul className="space-y-3 font-sans text-sm text-zinc-600 dark:text-zinc-400">
              {project.challenges.map((challenge, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="font-mono text-amber-500 font-bold">[0{i+1}]</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Future Work & Roadmap */}
          <section className="space-y-3">
            <h3 className="font-mono text-xs font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              // Laboratory Roadmap
            </h3>
            <ul className="space-y-3 font-sans text-sm text-zinc-650 dark:text-zinc-400">
              {project.futureWork.map((fw, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="font-mono text-blue-500 font-bold">[+]</span>
                  <span>{fw}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Side: Key Metadata Specs & Performance Benchmarks */}
        <div className="md:col-span-4 space-y-6">
          <div className="border border-zinc-200 dark:border-zinc-805 bg-zinc-50 dark:bg-zinc-[#131314] rounded-xl p-5 space-y-4">
            <h4 className="font-mono text-xs font-extrabold text-zinc-950 dark:text-white uppercase border-b border-dashed border-zinc-200 dark:border-zinc-800 pb-2 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> Benchmarks
            </h4>

            {project.results.metrics.map((m) => (
              <div key={m.label} className="space-y-0.5">
                <span className="block font-mono text-[10px] text-zinc-400 uppercase tracking-tight">
                  {m.label}
                </span>
                <span className="block font-mono text-base font-bold text-zinc-950 dark:text-white">
                  {m.value}
                </span>
              </div>
            ))}

            <div className="border-t border-dashed border-zinc-200 dark:border-zinc-800 pt-3">
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">
                {project.results.summary}
              </p>
            </div>
          </div>

          <div className="border border-zinc-200 dark:border-zinc-805 bg-zinc-50 dark:bg-zinc-[#131314] rounded-xl p-5 space-y-3">
            <h4 className="font-mono text-xs font-bold text-zinc-950 dark:text-white uppercase">
              Operational Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.implementation.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] text-zinc-500 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back button at footer */}
      <footer className="pt-16 border-t border-dashed border-zinc-200 dark:border-zinc-800 mt-16 text-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-xs font-mono text-zinc-600 dark:text-zinc-300 rounded-lg duration-150 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Selected Systems
        </button>
      </footer>
    </article>
  );
}
