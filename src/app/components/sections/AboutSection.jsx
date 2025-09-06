import { BadgeCheck, Mail, Phone, MapPin, Download, MessageCircleMore } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen grid flex-col-reverse md:grid-cols-2 px-2 sm:px-4 py-10 sm:py-16">
      {/* Card */}
      <div className="w-fit max-w-md sm:max-w-lg md:max-w-none h-fit bg-[#232323] rounded-3xl flex flex-col justify-between items-center gap-8 p-6 sm:p-8 mx-auto md:mx-0">
        {/* Image & BadgeCheck*/}
        <div className="relative">
          <Image
            src="/profile/profile-2.jpg"
            alt="Portrait of Ashraf Elgezery, Frontend Developer"
            className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover border-4"
            width={200}
            height={200}
          />
          {/* BadgeCheck */}
          <div className="absolute right-4 bottom-3 md:right-5 md:bottom-6 flex justify-center items-center w-5 h-5 rounded-full bg-white ">
            <BadgeCheck className="text-green-800 font-extrabold" />
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold">Ashraf Elgezery</h2>
        <h3 className="text-sm sm:text-base font-medium">Front End Develober</h3>
        <div className="bg-[#1b1b1b] w-full rounded-xl px-4 py-2 flex gap-2 text-sm sm:text-base items-center"> <Mail aria-hidden="true"/>ashrafelgezery2014@gmail.com</div>
        <div className="bg-[#1b1b1b] w-full rounded-xl px-4 py-2 flex gap-2 text-sm sm:text-base items-center"> <Phone aria-hidden="true"/>+20 1000 980 788 </div>
        <div className="bg-[#1b1b1b] w-full rounded-xl px-4 py-2 flex gap-2 text-sm sm:text-base items-center"> <MapPin aria-hidden="true"/>Egypt, Damitta </div>
      </div>
      {/* Get to know me */}
      <div className="w-full flex flex-col gap-6 mt-10 md:mt-0">
        <div className="bg-slate-200 w-fit text-stone-700 font-bold text-lg sm:text-xl px-4 sm:px-5 py-2 sm:py-3 rounded-3xl">Get to know me</div>
        <div className="text-3xl sm:text-4xl md:text-5xl max-w-full md:max-w-[470px] font-bold">Passionate About Creating Web Applications</div>
        <div className="text-base sm:text-xl text-gray-300">
          Enthusiastic Frontend Developer with experience building responsive, user-friendly web applications using React.js, 
          Next.js, and modern JavaScript (ES6+). Skilled in integrating REST APIs, collaborating with cross-functional teams, and writing clean, reusable code.
        </div>
        <div className="text-base sm:text-xl text-gray-300">
          Developed and deployed multiple web applications using React.js and Next.js.
        </div>
        <div className="flex flex-col sm:flex-row bg-[#232323] p-6 sm:p-8 justify-between rounded-3xl gap-6 sm:gap-0">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">5+</div>
            <div className="text-gray-400 text-base sm:text-lg">projects</div>
            <div className="text-gray-400 text-base sm:text-lg">completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">2+</div>
            <div className="text-gray-400 text-base sm:text-lg">Years</div>
            <div className="text-gray-400 text-base sm:text-lg">Experience</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">98%</div>
            <div className="text-gray-400 text-base sm:text-lg">Client</div>
            <div className="text-gray-400 text-base sm:text-lg">Satisfaction</div>
          </div>
        </div>
        {/* Details */}
        <div className="flex flex-col sm:flex-row justify-between w-full gap-8">
          {/* coulm One */}
          <div className="flex-1">
            <div className="text-gray-400 text-sm sm:text-base mb-2">Specialization</div>
            <div className="text-xl sm:text-2xl mb-6 sm:mb-10">Wep Develpment</div>
            <div className="text-gray-400 text-base sm:text-lg mb-2">Education</div>
            <div className="text-xl sm:text-2xl">Bachelor’s Degree</div>
          </div>
          {/* coulm Two */}
          <div className="flex-1">
            <div className="text-gray-400 text-sm sm:text-base mb-2">Experiace Level</div>
            <div className="text-xl sm:text-2xl mb-6 sm:mb-10">Junior</div>
            <div className="text-gray-400 text-sm sm:text-base mb-2">Languages</div>
            <div className="text-xl sm:text-2xl">Arabic, English</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row mt-8 sm:mt-10 gap-4 sm:gap-6 w-full">
          <a 
            href="/resume.pdf" download 
            className="bg-slate-100 px-4 sm:px-4 py-3 sm:py-4 rounded-3xl flex gap-3 text-lg sm:text-xl hover:bg-[#cacaca]
            focus:ring-2 focus:ring-accent focus:outline-none duration-500 transition
            font-bold text-zinc-700 justify-center items-center flex-1">
            <Download /> Download Resume
          </a>
          <a 
            href={"#contact"}
            className="px-4 sm:px-4 py-3 sm:py-4 rounded-3xl flex gap-3 text-lg sm:text-xl font-bold
           hover:bg-[#5f5f5f] focus:ring-2 focus:ring-accent focus:outline-none duration-500 transition
           text-zinc-200 border-2 border-neutral-200 justify-center items-center flex-2">
            <MessageCircleMore /> Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
}
