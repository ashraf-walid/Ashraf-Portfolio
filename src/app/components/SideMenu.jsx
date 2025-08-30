"use client";
import { useState, useEffect } from "react";
import {
  Home,
  User,
  Folder,
  Mail,
  FileText,
  Briefcase,
  Facebook,
  Linkedin,
  Github,
  Menu,
  X,
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        threshold: 0.5, // become active when ~50% in view
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
    <>
      {/* Mobile menu button */}
      <div
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed right-4 top-4 z-50 cursor-pointer rounded-full h-9 w-9 flex justify-center items-center bg-accent md:hidden"
      >
        {!isMenuOpen && <Menu size={24} className="text-black" />}
        {isMenuOpen && <X size={24} className="text-black" />}
      </div>

      {/* Backdrop for mobile menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Side menu (mobile & desktop) */}
      <nav
        className={`
          fixed top-0 left-0 h-full w-4/6 max-w-xs z-50 bg-sideMenu border border-sideMenuHover 
          rounded-l-2xl px-4 py-6 flex flex-col justify-start gap-y-2 transition-transform duration-500 
          md:sticky md:top-10 md:w-1/5 md:max-w-none md:rounded-2xl md:ml-4 md:flex md:translate-x-0
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:static md:opacity-100 md:pointer-events-auto
        `}
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
                  active === section.id ? "text-accent " : "text-gray-500 hover:text-accent"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <span aria-hidden>{section.icon}</span>
                  <span>{section.label}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-row gap-4 mb-4 justify-center items-center social-links mt-12">
          <a href="https://www.facebook.com/ashrf.aljzyry.2025" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-[50px] h-[50px] flex items-center justify-center bg-[#232323] text-blue-600 hover:text-blue-800 rounded-full text-[20px] transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            <Facebook size={24} />
          </a>
          <a href="https://www.linkedin.com/in/ِashrafelgezery" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-[50px] h-[50px] flex items-center justify-center bg-[#232323] text-blue-500 hover:text-blue-700 rounded-full text-[20px] transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            <Linkedin size={24} />
          </a>
          <a href="https://github.com/ashraf-walid" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-[50px] h-[50px] flex items-center justify-center bg-[#232323] text-gray-300 hover:text-gray-600 rounded-full text-[20px] transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400">
            <Github size={24} />
          </a>
        </div>
      </nav>
    </>
  );
}
