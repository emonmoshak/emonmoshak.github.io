import React, { useState } from "react";
import { RESEARCH_PAPER } from "../data";
import { Download, Copy, Check, Library, Compass, Cpu, HelpCircle, Variable, ShieldAlert, Cpu as Brain, Award } from "lucide-react";

export function ResearchPub() {
  const [copiedType, setCopiedType] = useState<"apa" | "ieee" | "bibtex" | null>(null);

  const copyToClipboard = (text: string, type: "apa" | "ieee" | "bibtex") => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <section className="py-24 max-w-4xl mx-auto px-6 font-sans select-none animate-fade-in" id="research-publication">
      <div className="border-b border-dashed border-zinc-200 dark:border-zinc-800 pb-8 mb-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest bg-blue-50 dark:bg-blue-950/25 px-2.5 py-1 rounded">
            Peer-Reviewed / Open-Archive
          </span>
          <span className="font-mono text-xs text-zinc-400">
            Published: {RESEARCH_PAPER.date}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white mt-1">
          {RESEARCH_PAPER.title}
        </h1>

        <div className="flex items-center gap-2 mt-4 text-xs font-mono text-zinc-500">
          <span>By:</span>
          {RESEARCH_PAPER.authors.map((author) => (
            <span key={author} className="font-bold text-zinc-800 dark:text-zinc-250 bg-zinc-100 dark:bg-zinc-850 px-2 py-0.5 rounded">
              {author}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Paper structured sections */}
        <div className="lg:col-span-8 space-y-10 leading-relaxed text-sm sm:text-base text-zinc-700 dark:text-zinc-300">
          {/* Abstract */}
          <section className="space-y-3">
            <h3 className="font-mono text-xs font-extrabold text-zinc-950 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Library className="w-4 h-4 text-blue-600" /> Executive Abstract
            </h3>
            <p className="text-zinc-[600] dark:text-zinc-350 text-sm leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-5 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-850 italic">
              "{RESEARCH_PAPER.abstract}"
            </p>
          </section>

          {/* Motivation */}
          <section className="space-y-3">
            <h3 className="font-mono text-xs font-extrabold text-zinc-950 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600" /> Research Motivation
            </h3>
            <p className="text-zinc-[600] dark:text-zinc-350 text-sm leading-relaxed">
              {RESEARCH_PAPER.motivation}
            </p>
          </section>

          {/* Mathematical Modeling */}
          <section className="space-y-4">
            <div className="p-5 bg-blue-50/20 dark:bg-blue-950/10 border border-blue-200/30 dark:border-blue-900/20 rounded-2xl space-y-3">
              <h3 className="font-mono text-xs font-bold text-blue-800 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <Brain className="w-4 h-4" /> Elastic Weight Consolidation (EWC) Formulation
              </h3>
              <p className="text-zinc-650 dark:text-zinc-350 text-xs sm:text-sm leading-relaxed">
                Continual Learning addresses sequential weight decay by applying quadratic diagonal checks mapping the Fisher Information Matrix (F). Weights that are critical to historical tasks are penalized for drift.
              </p>
              <div className="font-mono text-xs dark:text-zinc-300 py-2.5 flex items-center justify-center bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200/70 dark:border-zinc-850">
                <code className="tracking-wide">
                  {"L(\\theta) = L_B(\\theta) + \\sum_{i} \\frac{\\lambda}{2} F_i (\\theta_i - \\theta_{A,i}^*)^2"}
                </code>
              </div>
            </div>
          </section>

          {/* Key Findings */}
          <section className="space-y-3">
            <h3 className="font-mono text-xs font-extrabold text-zinc-950 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" /> Core Empirical Findings
            </h3>
            <ul className="space-y-3 font-sans text-sm text-zinc-600 dark:text-zinc-400">
              {RESEARCH_PAPER.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex gap-2.5 items-start">
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-extrabold bg-blue-50 dark:bg-blue-950/30 px-1.5 rounded text-xs select-none">
                    0{idx + 1}
                  </span>
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Future Directions */}
          <section className="space-y-3">
            <h3 className="font-mono text-xs font-extrabold text-zinc-950 dark:text-white uppercase tracking-wider flex items-center gap-2">
              // Continual Systems Future Directions
            </h3>
            <ul className="space-y-3 font-sans text-sm text-zinc-[650] dark:text-zinc-400">
              {RESEARCH_PAPER.futureResearch.map((fr, idx) => (
                <li key={idx} className="flex gap-2 items-start">
                  <span className="font-mono text-zinc-400 font-bold">[→]</span>
                  <span>{fr}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Side: Citations generators & file downloads */}
        <div className="lg:col-span-4 space-y-6">
          <div className="border border-zinc-200 dark:border-zinc-805 bg-zinc-50 dark:bg-zinc-[#131314] rounded-2xl p-5 space-y-4">
            <h4 className="font-mono text-xs font-extrabold text-zinc-950 dark:text-white uppercase border-b border-dashed border-zinc-200 dark:border-zinc-800 pb-2">
              Scientific Indexing
            </h4>

            <div className="space-y-1">
              <span className="block font-mono text-[9px] text-zinc-400 uppercase">Indexing Node</span>
              <span className="block font-mono text-xs font-bold text-zinc-800 dark:text-zinc-300 capitalize">
                {RESEARCH_PAPER.publication}
              </span>
            </div>

            <div className="space-y-1">
              <span className="block font-mono text-[9px] text-zinc-400 uppercase">Digital DOI Identifier</span>
              <span className="block font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold truncate hover:underline cursor-pointer">
                10.5281/zenodo.1048821
              </span>
            </div>

            <a
              href={RESEARCH_PAPER.zenodoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-4 py-2.5 px-4 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-mono font-bold rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-100 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4" /> Download Archive (Zenodo)
            </a>
          </div>

          {/* Citation Generator Widget */}
          <div className="border border-zinc-205 dark:border-zinc-805 bg-zinc-50 dark:bg-zinc-[#131214] rounded-2xl p-5 space-y-4">
            <h4 className="font-mono text-xs font-bold text-zinc-950 dark:text-white uppercase">
              Cite Publication
            </h4>

            {/* APA */}
            <div className="space-y-1 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 p-3 rounded-lg relative">
              <span className="block font-mono text-[8px] text-zinc-400 uppercase font-bold">APA FORMAT</span>
              <p className="text-[10px] font-sans text-zinc-600 dark:text-zinc-400 leading-normal pr-6 mt-1">
                {RESEARCH_PAPER.citation.apa}
              </p>
              <button
                onClick={() => copyToClipboard(RESEARCH_PAPER.citation.apa, "apa")}
                className="absolute top-2 right-2 text-zinc-300 hover:text-zinc-650 cursor-pointer"
                title="Copy APA reference"
              >
                {copiedType === "apa" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* IEEE */}
            <div className="space-y-1 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 p-3 rounded-lg relative">
              <span className="block font-mono text-[8px] text-zinc-400 uppercase font-bold">IEEE FORMAT</span>
              <p className="text-[10px] font-sans text-zinc-600 dark:text-zinc-400 leading-normal pr-6 mt-1">
                {RESEARCH_PAPER.citation.ieee}
              </p>
              <button
                onClick={() => copyToClipboard(RESEARCH_PAPER.citation.ieee, "ieee")}
                className="absolute top-2 right-2 text-zinc-300 hover:text-zinc-650 cursor-pointer"
                title="Copy IEEE reference"
              >
                {copiedType === "ieee" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* BibTeX */}
            <div className="space-y-1 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 p-3 rounded-lg relative">
              <span className="block font-mono text-[8px] text-zinc-400 uppercase font-bold text-zinc-400">BIBTEX CODE block</span>
              <pre className="text-[9px] font-mono text-zinc-500 max-h-24 overflow-y-auto leading-tight pr-6 mt-1 scrollbar-hidden whitespace-pre-wrap">
                {RESEARCH_PAPER.citation.bibtex}
              </pre>
              <button
                onClick={() => copyToClipboard(RESEARCH_PAPER.citation.bibtex, "bibtex")}
                className="absolute top-2 right-2 text-zinc-300 hover:text-zinc-650 cursor-pointer"
                title="Copy BibTeX script"
              >
                {copiedType === "bibtex" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
