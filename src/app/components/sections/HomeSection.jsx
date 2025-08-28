"use client";
import Animate from "../motion";
import Image from "next/image";
import { ReactTyped } from "react-typed";

export default function HomeSection() {
  return (
    <section
      id="home"
      className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-4 sm:px-6 md:px-7 py-12 md:py-16 min-h-screen relative overflow-hidden"
      aria-label="Home Section"
    >
      <Animate size={180} className="top-8 right-8 md:top-16 md:right-12" />
      <Animate size={140} className="top-40 left-8 md:top-52 md:left-64" />
      {/* Left Side: Text */}
      <div className="space-y-4 sm:space-y-6 text-center md:text-left z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-accent">
          Ashraf Elgezery
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300">
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
        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-[470px] md:max-w-[600px] mx-auto md:mx-0">
          Frontend Developer specialized in React & Next.js. I create fast, secure, and user-friendly web apps with a focus on clean design and performance.
        </p>
        <a href={`#contact`} className="inline-block px-6 py-3 mt-8 sm:mt-12 md:mt-16 text-lg bg-[#515151] hover:bg-[#393939] font-semibold rounded-xl shadow-md text-white focus:ring-2 focus:ring-accent focus:outline-none duration-500 transition">
           Contact Me
        </a>
      </div>

      {/* Right Side: Image */}
      <div className="flex justify-center md:justify-end z-10">
        <Image
          src="/profile/profile-1.webp"
          priority
          alt="Profile photo"
          className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-80 lg:w-80 lg:h-96 rounded-3xl object-cover shadow-[15px_15px_0px_rgb(81,81,81)]"
          width={400}
          height={400}
        />
      </div>
    </section>
  );
}


