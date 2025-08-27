import HomeSection from "./components/sections/HomeSection";
import AboutSection from "./components/sections/AboutSection";
import ResumeSection from "./components/sections/ResumeSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ServicesSection from "./components/sections/ServicesSection";
import ContactSection from "./components/sections/ContactSection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HomeSection />
      <AboutSection />
      <ResumeSection />
      <ProjectsSection />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}
