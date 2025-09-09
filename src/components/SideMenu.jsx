"use client";
import { useState, useEffect } from "react";
import {
  Home,
  User,
  CodeXml,
  Mail,
  FileCheck2,
  BriefcaseBusiness,
  Facebook,
  Linkedin,
  Github,
  Menu,
  X,
} from "lucide-react";

const sections = [
  { id: "home", icon: <Home size={24} />, label: "Home" },
  { id: "about", icon: <User size={24} />, label: "About" },
  { id: "skills", icon: <FileCheck2 size={24}/>, label: "Skills" },
  { id: "projects", icon: <CodeXml size={24} />, label: "Projects" },
  { id: "services", icon: <BriefcaseBusiness size={24} />, label: "Services" },
  { id: "contact", icon: <Mail size={24} />, label: "Contact" },
];

export default function SideMenu() {
  const [active, setActive] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Set initial active from hash if present
    // window.location.hash means the part of the link (URL) that comes after the # sign.
    if (typeof window !== "undefined" && window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      if (sections.some((s) => s.id === hashId)) setActive(hashId);
    }

    // Observe sections to highlight current one while scrolling
    // new IntersectionObserver(...) It is an API built into the browser that monitors one or more elements.
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section that's most visible
        let mostVisible = null;
        let maxRatio = 0;

        // entry.intersectionRatio → The element's appearance ratio (from 0 to 1).
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisible = entry.target.id;
          }
        });

        // Also check all sections to find the one with highest visibility
        sections.forEach((section) => {
          const el = document.getElementById(section.id);
          if (el) {
            // el.getBoundingClientRect() Returns an object containing information about the element's location on the screen.
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight; // Height of browser window (viewport).
            const elementHeight = rect.height; // The height (length) of the item.
            
            // Calculate how much of the element is visible
            const visibleTop = Math.max(0, rect.top); // The distance from the top of the screen to the start of the element.
            const visibleBottom = Math.min(windowHeight, rect.bottom); // The distance from the top of the screen to the end of the element.
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            const visibilityRatio = visibleHeight / elementHeight;
            
            if (visibilityRatio > maxRatio && visibilityRatio > 0.3) {
              maxRatio = visibilityRatio;
              mostVisible = section.id;
            }
          }
        });

        if (mostVisible) {
          setActive(mostVisible);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // The percentage of an element that must appear to be considered "visible."
        rootMargin: '-20% 0px -20% 0px' // Allows you to expand or shrink the viewing area (the viewport).
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
        className="fixed right-4 top-4 z-50 cursor-pointer rounded-full h-9 w-9 flex justify-center items-center bg-transparent sm:bg-accent md:hidden "
      >
        {!isMenuOpen && <Menu size={28} className="sm:text-black" />}
        {isMenuOpen && <X size={28} className="sm:text-black" />}
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
          md:sticky md:top-8 md:w-1/5 md:max-w-none md:rounded-2xl md:ml-4 md:flex md:translate-x-0
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
          <a href="https://wa.me/201000980788" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-[50px] h-[50px] flex items-center justify-center bg-[#232323] text-green-500 hover:text-green-700 rounded-full text-[20px] transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </a>
        </div>
      </nav>
    </>
  );
}
