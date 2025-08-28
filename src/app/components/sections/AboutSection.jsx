import { BadgeCheck, Mail, Phone, MapPin, Download, MessageCircleMore } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex gap-16 px-7 py-16">
      {/* Card */}
      <div className="relative max-h-[550px] w-[75%] bg-[#232323] rounded-3xl flex flex-col justify-between items-center gap-2 p-8">
        <Image
          src="/profile/profile-2.jpg"
          alt="Profile photo"
          className=" w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4"
          width={200}
          height={200}
        />
        {/* BadgeCheck */}
        <div className="absolute right-[125px] top-[135px] flex justify-center items-center w-5 h-5 rounded-full bg-white ">
          <BadgeCheck className="text-green-800 font-extrabold" />
        </div>
        <h2 className="text-2xl font-bold">Ashraf Elgezery</h2>
        <h3 className="text-base font-medium">Front End Develober</h3>
        <div className="bg-[#1b1b1b] w-full rounded-xl px-4 py-2 flex gap-2 text-base"> <Mail /> ashrafelgezery2014@gmail.com </div>
        <div className="bg-[#1b1b1b] w-full rounded-xl px-4 py-2 flex gap-2 text-base"> <Phone /> +20 1000 980 788 </div>
        <div className="bg-[#1b1b1b] w-full rounded-xl px-4 py-2 flex gap-2 text-base"> <MapPin /> Egypt, Damitta </div>
      </div>
      {/* Get to know me */}
      <div className="w-auto flex flex-col gap-6">
        <div className="bg-slate-200 w-fit text-stone-700 font-bold text-xl px-5 py-3 rounded-3xl">Get to know me</div>
        <div className="text-6xl max-w-[470px] font-bold">Pasionate about creating web applacation</div>
        <div className="text-xl text-gray-300">
          Enthusiastic Front-End Developer with hands-on experience building responsive and user-friendly web
          applications using React.js, Next.js, and modern JavaScript (ES6+). Skilled in integrating REST
          APIs and collaborating with in cross-functional teams. Passionate about learning, problem-solving, and
          delivering clean, reusable code.
        </div>
        <div className="text-xl text-gray-300">
          Developed and deployed multiple web applications using React.js and Next.js.
        </div>
        <div className="flex bg-[#232323] p-12 justify-between rounded-3xl">
          <div className="text-center">
            <div className="text-5xl font-bold mb-4">5+</div>
            <div className="text-gray-400 text-xl">projects</div>
            <div className="text-gray-400 text-xl">completed</div>
          </div>

          <div className="text-center">
            <div className="text-5xl font-bold mb-4">2+</div>
            <div className="text-gray-400 text-xl">Years</div>
            <div className="text-gray-400 text-xl">Experience</div>
          </div>

          <div className="text-center">
            <div className="text-5xl font-bold mb-4">98%</div>
            <div className="text-gray-400 text-xl">Client</div>
            <div className="text-gray-400 text-xl">Satisfaction</div>
          </div>
        </div>
        {/* Details */}
        <div className="flex justify-between w-[600px]">
          {/* coulm One */}
          <div className="">
            <div className="text-gray-400 text-lg mb-2">
              Specialization
            </div>
            <div className="text-3xl mb-10">
              Wep Develpment
            </div>

            <div className="text-gray-400 text-lg mb-2">
              Education
            </div>
            <div className="text-3xl">
              Bacaloriace Degree
            </div>
          </div>
          {/* coulm Two */}
          <div className="">
            <div className="text-gray-400 text-lg mb-2">
              Experiace Level
            </div>
            <div className="text-3xl mb-10">
              Junior 
            </div>
            
            <div className="text-gray-400 text-lg mb-2">
              Languages
            </div>
            <div className="text-3xl">
              Arabic, English
            </div>
          </div>
        </div>
        <div className="flex mt-10 gap-6 w-[600px]">
          <button className="bg-slate-100 px-8 py-5 rounded-3xl flex gap-3 text-xl font-bold text-zinc-700 justify-center items-center flex-1">
            <Download/> Download Resume
          </button>
          <button className="px-8 py-5 rounded-3xl flex gap-3 text-xl font-bold text-zinc-200 border bourder-2 border-neutral-200 justify-center items-center flex-2">
            <MessageCircleMore/> Let's Talk
          </button>
        </div>
      </div>
    </section>
  );
}
