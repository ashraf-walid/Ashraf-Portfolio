"use client";
import { useState } from "react";
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
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

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
      // Simulate EmailJS submission
      // In a real implementation, you would use EmailJS here
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus('error');
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
      url: "https://github.com/ashraf",
      color: "hover:bg-gray-800"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: "https://linkedin.com/in/ashraf",
      color: "hover:bg-blue-600"
    }
  ];

  return (
    <section id="contact" className="min-h-screen px-2 sm:px-4 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="bg-slate-200 w-fit text-stone-700 font-bold text-lg sm:text-xl px-4 sm:px-5 py-2 sm:py-3 rounded-3xl mx-auto mb-6">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-4">
            Let's Work Together
          </h2>
          <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to start your next project? I'm here to help bring your ideas to life. 
            Let's discuss your requirements and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Form */}
          <div className="bg-surface rounded-3xl p-6 sm:p-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-accent mb-6">
              Send Me a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full px-4 py-3 bg-[#1b1b1b] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-zinc-700 font-semibold rounded-xl hover:bg-[#cacaca] focus:ring-2 focus:ring-accent focus:outline-none duration-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-zinc-700 border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400">
                  <CheckCircle size={20} />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                  <AlertCircle size={20} />
                  <span>Something went wrong. Please try again or contact me directly.</span>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-surface rounded-3xl p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-accent mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#1b1b1b] rounded-xl flex items-center justify-center">
                        <IconComponent size={24} className="text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-accent">{info.label}</p>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-gray-300 hover:text-accent transition-colors duration-300"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-300">{info.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-surface rounded-3xl p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-accent mb-6">
                Follow Me
              </h3>
              
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-[#1b1b1b] rounded-xl flex items-center justify-center text-accent hover:text-white transition-all duration-300 ${social.color}`}
                      aria-label={`Visit ${social.label}`}
                    >
                      <IconComponent size={24} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Response */}
            <div className="bg-surface rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-accent mb-4">
                Quick Response
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                I typically respond to messages within 24 hours. For urgent inquiries, 
                feel free to call or send a direct email.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16">
          <div className="bg-surface rounded-3xl p-6 sm:p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-accent mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-300 text-base sm:text-lg mb-6">
              Whether you have a specific project in mind or just want to discuss possibilities, 
              I'm here to help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:ashrafelgezery2014@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 text-zinc-700 font-semibold rounded-xl hover:bg-[#cacaca] focus:ring-2 focus:ring-accent focus:outline-none duration-500 transition"
              >
                <Mail size={18} />
                Send Email
              </a>
              <a
                href="tel:+201000980788"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-neutral-200 text-zinc-200 font-semibold rounded-xl hover:bg-[#5f5f5f] focus:ring-2 focus:ring-accent focus:outline-none duration-500 transition"
              >
                <Phone size={18} />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
