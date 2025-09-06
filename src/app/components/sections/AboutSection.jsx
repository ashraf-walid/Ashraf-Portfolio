"use client";
import { BadgeCheck, Mail, Phone, MapPin, Download, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen grid flex-col-reverse md:grid-cols-2 px-2 sm:px-4 py-10 sm:py-16">
      {/* Card */}
      <motion.div 
        className="w-fit max-w-md sm:max-w-lg md:max-w-none h-fit bg-[#232323] rounded-3xl flex flex-col justify-between items-center gap-8 p-6 sm:p-8 mx-auto md:mx-0"
        initial={{ opacity: 0, x: -50, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Image & BadgeCheck*/}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Image
            src="/profile/profile-2.jpg"
            alt="Portrait of Ashraf Elgezery, Frontend Developer"
            className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover border-4"
            width={200}
            height={200}
          />
          {/* BadgeCheck */}
          <motion.div 
            className="absolute right-4 bottom-3 md:right-5 md:bottom-6 flex justify-center items-center w-5 h-5 rounded-full bg-white"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
          >
            <BadgeCheck className="text-green-800 font-extrabold" />
          </motion.div>
        </motion.div>
        <motion.h2 
          className="text-xl sm:text-2xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Ashraf Elgezery
        </motion.h2>
        <motion.h3 
          className="text-sm sm:text-base font-medium"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Front End Develober
        </motion.h3>
        <motion.div 
          className="bg-[#1b1b1b] w-full rounded-xl px-4 py-2 flex gap-2 text-sm sm:text-base items-center"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Mail aria-hidden="true"/>ashrafelgezery2014@gmail.com
        </motion.div>
        <motion.div 
          className="bg-[#1b1b1b] w-full rounded-xl px-4 py-2 flex gap-2 text-sm sm:text-base items-center"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Phone aria-hidden="true"/>+20 1000 980 788
        </motion.div>
        <motion.div 
          className="bg-[#1b1b1b] w-full rounded-xl px-4 py-2 flex gap-2 text-sm sm:text-base items-center"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <MapPin aria-hidden="true"/>Egypt, Damitta
        </motion.div>
      </motion.div>
      {/* Get to know me */}
      <motion.div 
        className="w-full flex flex-col gap-6 mt-10 md:mt-0"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="bg-slate-200 w-fit text-stone-700 font-bold text-lg sm:text-xl px-4 sm:px-5 py-2 sm:py-3 rounded-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Get to know me
        </motion.div>
        <motion.div 
          className="text-3xl sm:text-4xl md:text-5xl max-w-full md:max-w-[470px] font-bold"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Passionate About Creating Web Applications
        </motion.div>
        <motion.div 
          className="text-base sm:text-xl text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          Enthusiastic Frontend Developer with experience building responsive, user-friendly web applications using React.js, 
          Next.js, and modern JavaScript (ES6+). Skilled in integrating REST APIs, collaborating with cross-functional teams, and writing clean, reusable code.
        </motion.div>
        <motion.div 
          className="text-base sm:text-xl text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          Developed and deployed multiple web applications using React.js and Next.js.
        </motion.div>
        <motion.div 
          className="flex flex-col sm:flex-row bg-[#232323] p-6 sm:p-8 justify-between rounded-3xl gap-6 sm:gap-0"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">5+</div>
            <div className="text-gray-400 text-base sm:text-lg">projects</div>
            <div className="text-gray-400 text-base sm:text-lg">completed</div>
          </motion.div>
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.9 }}
            viewport={{ once: true }}
          >
            <div className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">2+</div>
            <div className="text-gray-400 text-base sm:text-lg">Years</div>
            <div className="text-gray-400 text-base sm:text-lg">Experience</div>
          </motion.div>
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.0 }}
            viewport={{ once: true }}
          >
            <div className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">98%</div>
            <div className="text-gray-400 text-base sm:text-lg">Client</div>
            <div className="text-gray-400 text-base sm:text-lg">Satisfaction</div>
          </motion.div>
        </motion.div>
        {/* Details */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-between w-full gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          {/* coulm One */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            viewport={{ once: true }}
          >
            <div className="text-gray-400 text-sm sm:text-base mb-2">Specialization</div>
            <div className="text-xl sm:text-2xl mb-6 sm:mb-10">Wep Develpment</div>
            <div className="text-gray-400 text-base sm:text-lg mb-2">Education</div>
            <div className="text-xl sm:text-2xl">Bachelor's Degree</div>
          </motion.div>
          {/* coulm Two */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            viewport={{ once: true }}
          >
            <div className="text-gray-400 text-sm sm:text-base mb-2">Experiace Level</div>
            <div className="text-xl sm:text-2xl mb-6 sm:mb-10">Junior</div>
            <div className="text-gray-400 text-sm sm:text-base mb-2">Languages</div>
            <div className="text-xl sm:text-2xl">Arabic, English</div>
          </motion.div>
        </motion.div>
        <motion.div 
          className="flex flex-col sm:flex-row mt-8 sm:mt-10 gap-4 sm:gap-6 w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          viewport={{ once: true }}
        >
          <motion.a 
            href="/resume.pdf" download 
            className="bg-slate-100 px-4 sm:px-4 py-3 sm:py-4 rounded-3xl flex gap-3 text-lg sm:text-xl hover:bg-[#cacaca]
            focus:ring-2 focus:ring-accent focus:outline-none duration-500 transition
            font-bold text-zinc-700 justify-center items-center flex-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download /> Download Resume
          </motion.a>
          <motion.a 
            href={"#contact"}
            className="px-4 sm:px-4 py-3 sm:py-4 rounded-3xl flex gap-3 text-lg sm:text-xl font-bold
           hover:bg-[#5f5f5f] focus:ring-2 focus:ring-accent focus:outline-none duration-500 transition
           text-zinc-200 border-2 border-neutral-200 justify-center items-center flex-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircleMore /> Let's Talk
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
