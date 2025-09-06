"use client";
import { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); 

  // Auto-hide status message after 5 seconds
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        "service_0f5irae",   
        "template_edl185g",    
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "GtnAZmY8HzMvpR4s_"      
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error.text);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "ashrafelgezery2014@gmail.com",
      link: "mailto:ashrafelgezery2014@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+20 1000 980 788",
      link: "tel:+201000980788"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Egypt, Damitta",
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      url: "https://github.com/ashraf-walid",
      color: "hover:bg-gray-800"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/ashrafelgezery",
      color: "hover:bg-blue-600"
    }
  ];

  return (
    <section id="contact" className="min-h-screen px-2 sm:px-4 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="bg-slate-200 w-fit text-stone-700 font-bold text-lg sm:text-xl px-4 sm:px-5 py-2 sm:py-3 rounded-3xl mx-auto mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.div>
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Let's Work Together
          </motion.h2>
          <motion.p 
            className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Ready to start your next project? I'm here to help bring your ideas to life.
            Let's discuss your requirements and create something amazing together.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-2 gap-8 lg:gap-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Contact Form */}
          <motion.div 
            className="bg-surface rounded-3xl p-6 sm:p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-accent mb-6">
              Send Me a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-accent mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  aria-label="Enter your full name"
                  className="w-full px-4 py-3 bg-[#1b1b1b] border border-gray-600 rounded-xl text-white placeholder-gray-400 
                  focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                  placeholder="Your full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-accent mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  aria-label="Enter your email address"
                  className="w-full px-4 py-3 bg-[#1b1b1b] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-accent mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  aria-label="Enter your message"
                  className="w-full px-4 py-3 bg-[#1b1b1b] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                aria-label="Send your message"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-zinc-700 font-semibold rounded-xl hover:bg-[#cacaca] focus:ring-2 focus:ring-accent focus:outline-none duration-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-zinc-700 border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} aria-hidden="true" />
                    Send Message
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400"
                >
                  <CheckCircle size={20} aria-hidden="true" />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}

              {submitStatus === "error" && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400"
                >
                  <AlertCircle size={20} aria-hidden="true" />
                  <span>Something went wrong. Please try again or contact me directly.</span>
                </div>
              )}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Contact Details */}
            <motion.div 
              className="bg-surface rounded-3xl p-6 sm:p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-accent mb-6">
                Contact Information
              </h3>

              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <motion.div 
                      key={index} 
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-12 h-12 bg-[#1b1b1b] rounded-xl flex items-center justify-center">
                        <IconComponent size={24} className="text-accent" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-accent">{info.label}</p>
                        {info.link ? (
                          <a
                            href={info.link}
                            aria-label={`Contact via ${info.label}`}
                            className="text-gray-300 hover:text-accent transition-colors duration-300"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-300">{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="bg-surface rounded-3xl p-6 sm:p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-accent mb-6">
                Follow Me
              </h3>

              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit my ${social.label}`}
                      className={`w-12 h-12 bg-[#1b1b1b] rounded-xl flex items-center justify-center text-accent hover:text-white transition-all duration-300 ${social.color}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconComponent size={24} aria-hidden="true" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick Response */}
            <motion.div 
              className="bg-surface rounded-3xl p-6 sm:p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-accent mb-4">
                Quick Response
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                I typically respond to messages within 24 hours. For urgent inquiries,
                feel free to call or send a direct email.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
