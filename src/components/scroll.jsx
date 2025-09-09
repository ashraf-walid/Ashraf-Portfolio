"use client";
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  // Detect scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-50 p-2 rounded-full bg-gray-200 text-gray-800 shadow-lg hover:bg-gray-400
           transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7 pointer-events-none"}`}
        >
          <ChevronUp className="bounceArrow w-6 h-6" />
        </button>
    </>
  );
}
