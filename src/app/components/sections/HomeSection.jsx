"use client";
import Animate from "../motion";
import Image from "next/image";
import { ReactTyped } from "react-typed";

export default function HomeSection() {
  return (
    <section
      id="home"
      className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-7 py-16"
      aria-label="Home Section"
    >
      <Animate size={220} className="top-16 right-6" />
      <Animate size={180} className="top-52 left-64" />
      {/* Left Side: Text */}
      <div className="space-y-6 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-100">
          <span className="text-accent">Ashraf Elgezery</span>
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-300">
          <span className="text-accent">I'm a </span>
          <ReactTyped
            strings={[
              "Frontend Developer",
              "React Next.js Enthusiast",
              "Passionate about UI/UX",
            ]}
            typeSpeed={80}
            backSpeed={40}
            backDelay={1500}
            loop
          />
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          A Frontend Developer specialized in React and Next.js. 
          I focus on building fast, secure, and accessible web applications 
          with a great user experience.
        </p>
        <button className="px-6 py-3 bg-[#515151] hover:bg-[#393939] font-semibold rounded-xl shadow-md text-white focus:ring-2 focus:ring-accent focus:outline-none duration-500 transition">
          Contact Me
        </button>
      </div>

      {/* Right Side: Image */}
      <div className="flex justify-center md:justify-end z-50">
        <Image
          src="/profile/profile-1.webp"
          alt="Profile photo"
          className="w-48 h-48 md:w-64 md:h-72 rounded-3xl object-cover shadow-[15px_15px_0px_rgb(81,81,81)]"
          width={400}
          height={400}
        />
      </div>
    </section>
  );
}


