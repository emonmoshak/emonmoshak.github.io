import React, { useState } from "react";
import { Sun, Moon, Menu, X, Terminal, GraduationCap, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({
  currentTab,
  onTabChange,
}: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Selected Work", id: "projects" },
    { label: "Published Research", id: "research" },
    { label: "Achievements & Marks", id: "achievements" },
    { label: "Academic CV", id: "cv" },
    { label: "Foundations", id: "about" }
  ];

  const handleNavClick = (id: string) => {
    onTabChange(id);
    window.location.hash = `#/${id === "projects" ? "" : id}`;
    setMobileOpen(false);
  };

  return (
    <>
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4 md:px-0">
        <nav
          className="border border-dashed border-zinc-200 bg-white/80 dark:border-zinc-800 dark:bg-zinc-950/80 backdrop-blur-md rounded-2xl p-2 pl-4 pr-3 flex items-center justify-between"
          id="global-navbar"
        >
          {/* Logo Brand */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavClick("projects")}
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white flex items-center justify-center">
              <span className="font-mono text-sm font-bold text-white dark:text-zinc-900">EM</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-mono text-xs font-extrabold text-zinc-905 dark:text-white uppercase tracking-wider">
                Emon Moshak
              </span>
              <p className="font-mono text-[9px] text-zinc-400 uppercase -mt-0.5 tracking-tighter">
                Mechatronics & Robotics
              </p>
            </div>
          </div>

          {/* Desktop Nav Controls */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                    active
                      ? "text-zinc-900 dark:text-white font-bold"
                      : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-300"
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-zinc-900 dark:bg-white rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2">
            {/* Email Contact Direct Link */}
            <a
              href="mailto:emoshayek@gmail.com"
              className="hidden sm:inline-flex items-center gap-1 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border border-transparent hover:bg-zinc-800 dark:hover:bg-zinc-100 text-[11px] font-mono font-bold px-3 py-2 rounded-lg duration-150 cursor-pointer"
            >
              Contact <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 border border-zinc-200 dark:border-zinc-805 rounded-lg dark:text-white"
              aria-label="Mobile Navigation Toggle"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-lg flex flex-col justify-center px-8 md:hidden">
          <div className="space-y-6 flex flex-col font-sans">
            {navItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left py-2 font-mono text-2xl font-bold tracking-tight text-zinc-900 dark:text-white block hover:text-blue-600 dark:hover:text-blue-400"
              >
                <span className="text-zinc-300 dark:text-zinc-800 mr-2">0{idx + 1}.</span> {item.label}
              </button>
            ))}

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 mt-6">
              <a
                href="mailto:emoshayek@gmail.com"
                className="inline-flex items-center gap-2 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-sm font-mono font-bold px-6 py-3 rounded-xl hover:bg-blue-600 cursor-pointer"
              >
                Contact Emon <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
