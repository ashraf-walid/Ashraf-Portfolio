"use client";
import { useState, useEffect } from "react";
import {
  Home,
  User,
  Folder,
  Mail,
  FileText,
  Briefcase,
} from "lucide-react";

const sections = [
  { id: "home", icon: <Home size={24} />, label: "Home" },
  { id: "about", icon: <User size={24} />, label: "About" },
  { id: "resume", icon: <FileText size={24} />, label: "Resume" },
  { id: "projects", icon: <Folder size={24} />, label: "Projects" },
  { id: "services", icon: <Briefcase size={24} />, label: "Services" },
  { id: "contact", icon: <Mail size={24} />, label: "Contact" },
];

export default function SideMenu() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    // Set initial active from hash if present
    if (typeof window !== "undefined" && window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      if (sections.some((s) => s.id === hashId)) setActive(hashId);
    }

    // Observe sections to highlight current one while scrolling
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.6, // become active when ~60% in view
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    // Sync with manual hash changes (e.g., back/forward navigation)
    const onHashChange = () => {
      const hashId = window.location.hash.replace("#", "");
      if (sections.some((s) => s.id === hashId)) setActive(hashId);
    };
    window.addEventListener("hashchange", onHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return (
    <nav
      className="flex flex-col gap-y-2 px-4 justify-start sticky w-1/5 h-[90vh] top-6 bg-sideMenu ml-4 rounded-2xl border border-sideMenuHover"
      aria-label="Section navigation"
      role="navigation"
    >
      <ul className="flex flex-col mt-4 gap-10 py-2 ml-2" role="list">
        {sections.map((section) => (
          <li key={section.id} role="listitem">
            <a
              id={`nav-${section.id}`}
              href={`#${section.id}`}
            className={`rounded-xl transition-all  ${
                active === section.id? "text-accent ": "text-gray-500 hover:text-accent"
              }`}
          >
              <div className="flex items-center gap-2">
                <span aria-hidden>{section.icon}</span>
                <span>{section.label}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
