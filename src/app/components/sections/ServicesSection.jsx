"use client";
import { 
  Monitor, 
  Code, 
  ShoppingCart, 
  Zap, 
  Rocket,
  Palette,
  Smartphone,
  Globe,
  Database,
  Shield,
  Settings,
  GitBranch
} from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      id: 1,
      title: "UI / Front-End Development",
      description: "Building responsive, modern, and fast websites using Next.js, React, and Tailwind CSS. Pixel-perfect implementation from Figma/PSD designs with accessibility & SEO best practices.",
      icon: Monitor,
      features: ["Next.js & React", "Tailwind CSS", "Figma/PSD to Code", "Accessibility & SEO", "Cross-browser Testing"],
      color: "hover:bg-blue-500/10 hover:border-blue-500/50"
    },
    {
      id: 2,
      title: "Full-Stack Web Apps",
      description: "Developing complete applications with Next.js + Firebase. Real-time features, API integrations, and comprehensive backend solutions for modern web applications.",
      icon: Code,
      features: ["Next.js + Firebase", "Real-time Features", "API Integrations", "Authentication", "Cloud Functions"],
      color: "hover:bg-green-500/10 hover:border-green-500/50"
    },
    {
      id: 3,
      title: "E-Commerce Solutions",
      description: "Custom e-commerce stores with product management, shopping cart, and secure payment processing. Complete admin dashboards for business management.",
      icon: ShoppingCart,
      features: ["Custom Stores", "Payment Gateways", "Admin Dashboards", "Product Management", "Order Tracking"],
      color: "hover:bg-purple-500/10 hover:border-purple-500/50"
    },
    {
      id: 4,
      title: "Performance & Optimization",
      description: "Optimizing site speed and Core Web Vitals. Image optimization, caching strategies, and comprehensive SEO improvements for better user experience.",
      icon: Zap,
      features: ["Core Web Vitals", "Image Optimization", "Caching", "Lighthouse", "SEO Improvements"],
      color: "hover:bg-yellow-500/10 hover:border-yellow-500/50"
    },
    {
      id: 5,
      title: "Deployment & Maintenance",
      description: "Hosting setup with Vercel or Firebase Hosting. CI/CD pipelines, bug fixing, updates, and long-term maintenance with Git workflow setup.",
      icon: Rocket,
      features: ["Vercel/Firebase Hosting", "CI/CD Pipelines", "Bug Fixing", "Updates", "Git Workflow"],
      color: "hover:bg-red-500/10 hover:border-red-500/50"
    },
    {
      id: 6,
      title: "Design & UX",
      description: "Creating beautiful, user-friendly interfaces with modern design principles. Responsive design, user experience optimization, and interactive elements.",
      icon: Palette,
      features: ["UI/UX Design", "Responsive Design", "Interactive Elements", "User Testing", "Design Systems"],
      color: "hover:bg-pink-500/10 hover:border-pink-500/50"
    }
  ];

  return (
    <section id="services" className="min-h-screen px-2 sm:px-4 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="bg-slate-200 w-fit text-stone-700 font-bold text-lg sm:text-xl px-4 sm:px-5 py-2 sm:py-3 rounded-3xl mx-auto mb-6">
            My Services
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-4">
            What I Can Do For You
          </h2>
          <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive web development services, 
            ensuring your digital presence is modern, fast, and user-friendly.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div key={service.id} className="group">
                <div className={`
                  bg-surface rounded-3xl p-6 sm:p-8 h-full
                  border border-gray-700/50
                  transition-all duration-300 transform hover:-translate-y-2
                  hover:shadow-xl hover:shadow-black/20
                  ${service.color}
                `}>
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-[#1b1b1b] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={32} className="text-accent" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-accent mb-4">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Services Info */}
        <div className="mt-16">
          <div className="bg-surface rounded-3xl p-6 sm:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-accent mb-4">
                  Why Choose My Services?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Smartphone className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-accent">Responsive Design</h4>
                      <p className="text-gray-300 text-sm">Works perfectly on all devices and screen sizes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-accent">Modern Technologies</h4>
                      <p className="text-gray-300 text-sm">Using the latest frameworks and best practices</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Database className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-accent">Scalable Solutions</h4>
                      <p className="text-gray-300 text-sm">Built to grow with your business needs</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-accent mb-4">
                  Development Process
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-accent">Quality Assurance</h4>
                      <p className="text-gray-300 text-sm">Thorough testing and code review process</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Settings className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-accent">Maintenance Support</h4>
                      <p className="text-gray-300 text-sm">Ongoing support and updates after launch</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <GitBranch className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-accent">Version Control</h4>
                      <p className="text-gray-300 text-sm">Professional Git workflow and documentation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-surface rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-accent mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-300 text-base sm:text-lg mb-6">
              Let's discuss your requirements and create something amazing together.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 text-zinc-700 font-semibold rounded-xl hover:bg-[#cacaca] focus:ring-2 focus:ring-accent focus:outline-none duration-500 transition"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
