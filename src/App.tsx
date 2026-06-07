import React, { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { ProjectGrid } from "./components/ProjectGrid";
import { ProjectCaseStudy } from "./components/ProjectCaseStudy";
import { ResearchPub } from "./components/ResearchPub";
import { Achievements } from "./components/Achievements";
import { InteractiveResume } from "./components/InteractiveResume";
import { About } from "./components/About";
import { PROJECTS } from "./data";
import { Terminal, Github, Heart, ShieldCheck, Mail, Database } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("projects");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  // Handle URL deep link hashes on load and change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#/project/")) {
        const slug = hash.replace("#/project/", "");
        const match = PROJECTS.find((p) => p.slug === slug);
        if (match) {
          setSelectedProject(slug);
          setCurrentTab("projects");
          window.scrollTo(0, 0);
          return;
        }
      }

      // Standard pages
      const page = hash.replace("#/", "");
      if (["research", "achievements", "cv", "about"].includes(page)) {
        setCurrentTab(page);
        setSelectedProject(null);
      } else {
        setCurrentTab("projects");
        setSelectedProject(null);
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener("hashchange", handleHashChange);
    // Trigger on mounting
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Enforce strictly light theme on mount
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }, []);

  const handleSelectProject = (slug: string) => {
    window.location.hash = `#/project/${slug}`;
  };

  const handleBackToProjects = () => {
    window.location.hash = "#/";
  };

  // Render view depending on the selected category route tab
  const renderTabContent = () => {
    let content;
    if (currentTab === "projects") {
      if (selectedProject) {
        const projectData = PROJECTS.find((p) => p.slug === selectedProject);
        if (projectData) {
          content = (
            <ProjectCaseStudy
              project={projectData}
              onBack={handleBackToProjects}
            />
          );
        } else {
          content = null;
        }
      } else {
        content = (
          <div key="projects-dashboard" className="font-sans">
            <Hero onNavigate={(tab) => {
              window.location.hash = `#/${tab}`;
            }} />
            <ProjectGrid onSelectProject={handleSelectProject} />
          </div>
        );
      }
    } else {
      switch (currentTab) {
        case "research":
          content = <ResearchPub key="research-view" />;
          break;
        case "achievements":
          content = <Achievements key="achievements-view" />;
          break;
        case "cv":
          content = <InteractiveResume key="cv-view" />;
          break;
        case "about":
          content = <About key="about-view" />;
          break;
        default:
          content = null;
          break;
      }
    }

    return (
      <AnimatePresence mode="wait">
        {content && (
          <motion.div
            key={currentTab + (selectedProject || "")}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] antialiased">
      {/* Floating Capsule Toolbar Overlay */}
      <Navigation
        currentTab={currentTab}
        onTabChange={setCurrentTab}
      />

      {/* Main Page Render Layout */}
      <main className="container mx-auto px-4 sm:px-6 relative z-10">
        {renderTabContent()}
      </main>

      {/* Custom Mathematical Footer - Hidden on clean LaTeX CV Print */}
      <footer className="border-t border-dashed border-zinc-200 dark:border-zinc-850 mt-20 py-12 px-6 print:hidden">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-zinc-400">
          <div className="space-y-1.5 text-center md:text-left select-none">
            <span className="block font-bold text-zinc-800 dark:text-zinc-200 tracking-wider">
              EMON MOSHAK // MOSHAK INDUSTRIES
            </span>
            <p className="text-[10px] text-zinc-500 uppercase tracking-tight">
              Calculations integrated via linear systems &amp; continuous neural feedback loops.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="https://github.com/emonmoshak"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-950 dark:hover:text-white flex items-center gap-1 transition"
            >
              <Github className="w-3.5 h-3.5" /> github.com/emonmoshak
            </a>
            <a
              href="mailto:emoshayek@gmail.com"
              className="hover:text-zinc-950 dark:hover:text-white flex items-center gap-1 transition"
            >
              <Mail className="w-3.5 h-3.5" /> emoshayek@gmail.com
            </a>
            <span className="text-[10px] font-bold tracking-widest text-[#10B981] uppercase flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" /> SYSTEMS ACTIVE
            </span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-900 flex justify-between items-center text-[10px] font-mono text-zinc-400 select-none">
          <span>© Emon Moshak 2026</span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-300 dark:text-zinc-700">
            Precision Robotics Engine v1.1.25
          </span>
        </div>
      </footer>
    </div>
  );
}
