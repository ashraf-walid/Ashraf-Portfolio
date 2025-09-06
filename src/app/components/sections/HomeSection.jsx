"use client";
import Animate from "../motion";
import Image from "next/image";
import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";

export default function HomeSection() {
  return (
    <section
      id="home"
      className="grid grid-cols-1 md:grid-cols-2 items-center md:gap-8 px-4 sm:px-6 md:px-7 py-12 md:py-16 min-h-screen relative overflow-hidden"
      aria-label="Home Section"
    >
      <Animate size={180} className="top-14 right-8 md:top-16 md:right-12" />
      <Animate size={140} className="top-56 left-8 md:top-52 md:left-64" />
      {/* Left Side: Text */}
      <motion.div 
        className="space-y-4 sm:space-y-6 text-center md:text-left z-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.3
            }
          }
        }}
      >
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-accent"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" }
            }
          }}
        >
          Ashraf Elgezery
        </motion.h1>
        <motion.h2 
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" }
            }
          }}
        >
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
        </motion.h2>
        <motion.p 
          className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-[470px] md:max-w-[600px] mx-auto md:mx-0"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" }
            }
          }}
        >
          Frontend Developer specialized in React & Next.js. I create fast, secure, and user-friendly web apps with a focus on clean design and performance.
        </motion.p>
        <motion.a 
          href={`#projects`} 
          className="inline-block px-6 py-3 mt-8 sm:mt-12 md:mt-16 text-lg bg-[#515151] hover:bg-[#393939] font-semibold rounded-full shadow-md text-white focus:ring-2 focus:ring-accent focus:outline-none duration-500 transition"
          variants={{
            hidden: { opacity: 0, y: 30, scale: 0.9 },
            visible: { 
              opacity: 1, 
              y: 0,
              scale: 1,
              transition: { duration: 0.6, ease: "easeOut" }
            }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View My Work
        </motion.a>
      </motion.div>

      {/* Right Side: Image */}
      <motion.div 
        className="flex justify-center md:justify-end z-10"
        initial={{ opacity: 0, x: 50, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          x: 0, 
          scale: 1,
          transition: { 
            duration: 0.8, 
            ease: "easeOut",
            delay: 0.5
          }
        }}
      >
        <motion.div
          whileHover={{ 
            scale: 1.05,
            rotateY: 5,
            transition: { duration: 0.3 }
          }}
        >
          <Image
            src="/profile/profile-1.webp"
            priority
            alt="Profile photo"
            className="w-48 h-52 sm:w-64 sm:h-64 md:w-64 md:h-72 lg:w-72 lg:h-80 rounded-3xl object-cover shadow-[8px_8px_0px_rgb(81,81,81)] md:shadow-[15px_15px_0px_rgb(81,81,81)]"
            width={400}
            height={400}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}


