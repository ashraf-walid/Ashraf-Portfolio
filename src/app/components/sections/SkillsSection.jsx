"use client";
import { useState } from "react";

export default function SkillsSection() {
  const [activeTooltip, setActiveTooltip] = useState(null);

  const skillCategories = [
    {
      title: "Frontend",
      description: "Modern frontend technologies and frameworks",
      skills: [
        {
          name: "HTML5",
          icon: "/icons/html5.svg",
          tooltip: ".......................................",
          color: "hover:bg-red-500/20"
        },
        {
          name: "CSS3",
          icon: "/icons/css.svg",
          tooltip: ".......................................",
          color: "hover:bg-blue-500/20"
        },
        {
          name: "Javascript",
          icon: "/icons/javascript.svg",
          tooltip: ".......................................",
          color: "hover:bg-yello-500/20"
        },
        {
          name: "React",
          icon: "/icons/react.svg",
          tooltip: "Built dynamic dashboards and SPAs with component-based architecture",
          color: "hover:bg-blue-500/20"
        },
        {
          name: "Next.js",
          icon: "/icons/nextjs.svg",
          tooltip: "Developed full-stack applications with server-side rendering and API routes",
          color: "hover:bg-black/20"
        },
        {
          name: "Redux",
          icon: "/icons/redux.svg",
          tooltip: "Managed complex state in large-scale applications",
          color: "hover:bg-purple-500/20"
        },
        {
          name: "Tailwind CSS",
          icon: "/icons/tailwind.svg",
          tooltip: "Created responsive and modern UI designs with utility-first CSS",
          color: "hover:bg-cyan-500/20"
        },
        {
          name: "TypeScript",
          icon: "/icons/typescript.svg",
          tooltip: "Enhanced code quality and developer experience with type safety",
          color: "hover:bg-blue-600/20"
        },
        {
          name: "Context API",
          icon: "/icons/context.svg",
          tooltip: "Implemented lightweight state management for component trees",
          color: "hover:bg-green-500/20"
        },
        {
          name: "PWA",
          icon: "/icons/pwa.svg",
          tooltip: ".......................................",
          color: "hover:bg-browen-500/20"
        },
      ]
    },
    {
      title: "Backend & Databases",
      description: "Server-side technologies and data management",
      skills: [
        {
          name: "Prisma",
          icon: "/icons/prisma.svg",
          tooltip: "Type-safe database access and schema management",
          color: "hover:bg-white/20"
        },
        {
          name: "PostgreSQL",
          icon: "/icons/postgresql.svg",
          tooltip: "Reliable relational database for production applications",
          color: "hover:bg-blue-400/20"
        },
        {
          name: "Strapi",
          icon: "/icons/strapi.svg",
          tooltip: "Headless CMS for content management and API generation",
          color: "hover:bg-blue-500/20"
        },
        {
          name: "NextAuth",
          icon: "/icons/nextauth.svg",
          tooltip: "Secure authentication and authorization for Next.js applications",
          color: "hover:bg-green-600/20"
        }
      ]
    },
    {
      title: "Tools & Others",
      description: "Development tools and additional technologies",
      skills: [
        {
          name: "Git",
          icon: "/icons/git.svg",
          tooltip: "Version control and collaborative development workflows",
          color: "hover:bg-orange-600/20"
        },
        {
          name: "Clerk",
          icon: "/icons/clerk.svg",
          tooltip: "User authentication and management with pre-built components",
          color: "hover:bg-pink-500/20"
        },
        {
          name: "Stripe",
          icon: "/icons/stripe.svg",
          tooltip: "Payment processing and subscription management",
          color: "hover:bg-purple-500/20"
        },
        {
          name: "ShadCN UI",
          icon: "/icons/shadcn.svg",
          tooltip: "Re-usable components built with Radix UI and Tailwind CSS",
          color: "hover:bg-purple-600/20"
        }
      ]
    }
  ];

  return (
    <section id="skills" className="min-h-screen px-2 sm:px-4 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="bg-slate-200 w-fit text-stone-700 font-bold text-lg sm:text-xl px-4 sm:px-5 py-2 sm:py-3 rounded-3xl mx-auto mb-6">
            My Skills
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-4">
            The skills, tools and technologies I use
          </h2>
          <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto">
            A comprehensive collection of technologies I've worked with to create modern, scalable web applications.
          </p>
        </div>

        {/* Skills Categories */}
        <div className="space-y-16">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-surface rounded-3xl p-6 sm:p-8">
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-accent mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-300 text-base sm:text-lg">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="relative group"
                    onMouseEnter={() => setActiveTooltip(`${categoryIndex}-${skillIndex}`)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <div className={`
                      flex flex-col items-center p-4 rounded-2xl transition-all duration-300
                      bg-[#1b1b1b] hover:bg-[#2a2a2a] cursor-pointer
                      transform hover:scale-105 hover:shadow-lg
                      ${skill.color}
                    `}>
                      <div className="w-12 h-12 sm:w-16 sm:h-16 mb-3 flex items-center justify-center">
                        <img
                          src={skill.icon}
                          alt={`${skill.name} logo`}
                          className="w-full h-full object-contain"
                          aria-label={`${skill.name} technology icon`}
                        />
                      </div>
                      <span className="text-white text-sm font-medium text-center">
                        {skill.name}
                      </span>
                    </div>

                    {/* Tooltip */}
                    {activeTooltip === `${categoryIndex}-${skillIndex}` && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
                        <div className="bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg max-w-xs text-center">
                          {skill.tooltip}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Additional Info */}
        <div className="mt-16 bg-surface rounded-3xl p-6 sm:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-accent mb-4">
                Why These Technologies?
              </h3>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                I choose these technologies based on their performance, community support, and ability to deliver exceptional user experiences. Each tool serves a specific purpose in creating robust, scalable applications.
              </p>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-accent mb-4">
                Always Learning
              </h3>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                The tech landscape evolves rapidly, and I'm committed to staying current with the latest tools and best practices. I regularly explore new technologies to enhance my development capabilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
