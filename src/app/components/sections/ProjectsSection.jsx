"use client";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

export default function ProjectsSection() {
  const projects = [
    {
      id: 1,
      name: "E-Commerce Website",
      // and secure payment processing
      description: "A full-featured online store with product catalog, shopping cart, Favorites page, Payment and confirmation page, Advanced Filter, user authentication. Solves the need for businesses to sell products online with a modern, responsive interface.",
      image: "/projects/ecommerce.png",
      // "Stripe"
      technologies: ["Next.js", "Firebase", "Zustand (state management)", "Tailwind CSS", "Lucide" ,"Node.js"],
      liveDemo: "https://e-commerce-version-arabic.vercel.app/",
      githubRepo: "https://github.com/ashraf-walid/e-commerce-version-arabic",
      featured: true
    },
    {
      id: 2,
      name: "Admin Panel",
      description: "A modern admin dashboard built with React and Firebase, featuring user management, authentication, and dashboard analytics. The application provides an interface for administrators to manage users and view system analytics.",
      image: "/projects/admin-dashboard.png",
      technologies: ["React 19","Firebase","React Router DOM","Vite","Tailwind CSS","Zustand","Lucide React (icons)"],    
      liveDemo: "https://admin-panel-ten-mu.vercel.app/",
      githubRepo: "https://github.com/ashraf-walid/Admin-Panel.git",
      featured: true
    },
    {
      id: 3,
      name: "E-Commerce",
      description: `This project is currently under development and will be released soon. 
                    It already includes the core e-commerce functionality such as product listings.    
                    More features like advanced filtering, and secure payments are coming soon.`,
      technologies: ["Firebase Auth", "Zustand", "React"],
      liveDemo: "https://hilal-computer.vercel.app/",
      githubRepo: "https://github.com/ashraf-walid/HILAL-Computer.git",
      featured: false,
      note: "In Progress",
    },
    {
      id: 4,
      name: "Portfolio Website",
      description: "Modern, responsive portfolio website showcasing skills and projects. Features smooth animations, dark mode, and optimized performance for better user experience.",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
      liveDemo: "https://ashraf-portfolio-seven.vercel.app/",
      githubRepo: "https://github.com/ashraf-walid/Ashraf-Portfolio.git",
      featured: false
    }
  ];

  return (
    <section id="projects" className="min-h-screen px-2 sm:px-4 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="bg-slate-200 w-fit text-stone-700 font-bold text-lg sm:text-xl px-4 sm:px-5 py-2 sm:py-3 rounded-3xl mx-auto mb-6">
            My Projects
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-4">
            Featured Projects
          </h2>
          <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto">
            A collection of projects that showcase my skills in web development, from full-stack applications to modern user interfaces.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-accent mb-8 text-center">
            Featured Work
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.filter(project => project.featured).map((project) => (
              <div key={project.id} className="group">
                <div className="bg-surface rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="max-w-full h-auto rounded-lg"
                        priority={project.featured}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
                      />  ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 z-10"></div>
                        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                          <span className="text-4xl">🛒</span>
                        </div>
                      </> )
                    }
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                      <div className="text-center text-white">
                        <p className="text-lg font-semibold mb-2">View Project</p>
                        <p className="text-sm opacity-90">Click to see more details</p>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 sm:p-8">
                    <h4 className="text-xl sm:text-2xl font-bold text-accent mb-3">
                      {project.name}
                    </h4>
                    <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h5 className="text-sm font-semibold text-accent mb-2">Technologies Used:</h5>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-[#1b1b1b] text-gray-300 text-xs rounded-full border border-gray-600"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-zinc-700 font-semibold rounded-xl hover:bg-[#cacaca] focus:ring-2 focus:ring-accent focus:outline-none duration-500 transition flex-1"
                      >
                        <ExternalLink size={18} />
                        Live Demo
                      </a>
                      <a
                        href={project.githubRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-neutral-200 text-zinc-200 font-semibold rounded-xl hover:bg-[#5f5f5f] focus:ring-2 focus:ring-accent focus:outline-none duration-500 transition flex-1"
                      >
                        <Github size={18} />
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Projects */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-accent mb-8 text-center">
            Other Projects
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {projects.filter(project => !project.featured).map((project) => (
              <div key={project.id} className="group">
                <div className="bg-surface rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 z-10"></div>
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover w-full h-full"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                        <span className="text-3xl">
                          {project.name.includes("Auth") ? "🔐" : "💼"}
                        </span>
                      </div>
                    )}
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                      <div className="text-center text-white">
                        <p className="text-sm font-semibold">View Project</p>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h4 className="text-lg sm:text-xl font-bold text-accent mb-2">
                      {project.name}
                      {project.note && <span className="px-2 py-1 bg-yellow-500 text-black text-xs rounded-full ml-3">{project.note}</span>}
                    </h4>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 4).map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-[#1b1b1b] text-gray-300 text-xs rounded-full border border-gray-600"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-[#1b1b1b] text-gray-300 text-xs rounded-full border border-gray-600">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 px-3 py-2 bg-slate-100 text-zinc-700 font-semibold rounded-lg hover:bg-[#cacaca] focus:ring-2 focus:ring-accent focus:outline-none duration-500 transition text-sm flex-1"
                      >
                        <ExternalLink size={14} />
                        Demo
                      </a>
                      <a
                        href={project.githubRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 px-3 py-2 border border-neutral-200 text-zinc-200 font-semibold rounded-lg hover:bg-[#5f5f5f] focus:ring-2 focus:ring-accent focus:outline-none duration-500 transition text-sm flex-1"
                      >
                        <Github size={14} />
                        Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-surface rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-accent mb-4">
              Want to see more?
            </h3>
            <p className="text-gray-300 text-base sm:text-lg mb-6">
              Check out my GitHub profile for more projects and contributions.
            </p>
            <a
              href="https://github.com/ashraf-walid"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 text-zinc-700 font-semibold rounded-xl hover:bg-[#cacaca] focus:ring-2 focus:ring-accent focus:outline-none duration-500 transition"
            >
              <Github size={20} />
              View All Projects on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
