import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaWhatsapp, FaFacebook, FaEnvelope } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

// Types
interface SocialLink {
  icon: IconType;
  href: string;
  label: string;
  color: string;
  hoverBg: string;
}

interface CTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

// Constants
const SOCIAL_LINKS: SocialLink[] = [
  { 
    icon: FaGithub, 
    href: "https://github.com/Kayes914", 
    label: "GitHub Profile", 
    color: "hover:text-[#2ea44f]",
    hoverBg: "hover:bg-[#2ea44f]/10" 
  },
  { 
    icon: FaLinkedinIn, 
    href: "https://www.linkedin.com/in/mahmudullah-kayes/", 
    label: "LinkedIn Profile", 
    color: "hover:text-[#0077b5]",
    hoverBg: "hover:bg-[#0077b5]/10" 
  },
  { 
    icon: FaWhatsapp, 
    href: "https://wa.me/8801845901833", 
    label: "WhatsApp Contact", 
    color: "hover:text-[#25D366]",
    hoverBg: "hover:bg-[#25D366]/10" 
  },
  { 
    icon: FaFacebook, 
    href: "https://www.facebook.com/MahmudullahKayes914", 
    label: "Facebook Profile", 
    color: "hover:text-[#1877f2]",
    hoverBg: "hover:bg-[#1877f2]/10" 
  },
  { 
    icon: FaEnvelope, 
    href: "mailto:engrkayes914@gmail.com", 
    label: "Email Contact", 
    color: "hover:text-[#EA4335]",
    hoverBg: "hover:bg-[#EA4335]/10" 
  }
];

const CTA_CONTENT: CTAProps = {
  title: "Let's Create Something Amazing Together",
  description: "Have a project in mind? I'd love to hear about it.",
  buttonText: "Let's Talk",
  buttonHref: "/contact"
};

// Components
const CTASection: React.FC<CTAProps> = ({ title, description, buttonText }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="relative p-8 sm:p-12 rounded-2xl bg-[#0c1221] border border-blue-500/20 
      backdrop-blur-sm shadow-[inset_0_0_20px_rgba(79,70,229,0.1)]"
  >
    <div 
      className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl"
      aria-hidden="true"
    />
    <div className="relative">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
          bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-gray-400 text-lg">
          {description}
        </p>
        <Link to="/contact">
          <motion.div
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r 
              from-blue-500 via-purple-500 to-pink-500 text-white font-medium
              hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0B0F1E]"
            aria-label="Contact me to discuss your project"
          >
            {buttonText}
            <span className="text-xl" aria-hidden="true">→</span>
          </motion.div>
        </Link>
      </div>
    </div>
  </motion.div>
);

const SocialLinks: React.FC = () => (
  <nav className="flex gap-4" aria-label="Social media links">
    {SOCIAL_LINKS.map((social, index) => (
      <motion.a
        key={index}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 
          flex items-center justify-center group ${social.hoverBg}
          transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500`}
        whileHover={{ y: -2 }}
        aria-label={social.label}
      >
        <social.icon 
          className={`text-base text-gray-400 ${social.color} transition-colors`}
          aria-hidden="true"
        />
      </motion.a>
    ))}
  </nav>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      id="footer" 
      className="relative w-full bg-[#0B0F1E] overflow-hidden"
      role="contentinfo"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10">
        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <CTASection {...CTA_CONTENT} />
        </div>

        {/* Main Footer */}
        <div className="border-t border-blue-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              {/* Logo and Title */}
              <div className="flex items-center gap-2">
                <span 
                  className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 
                    bg-clip-text text-transparent"
                  aria-label="Your Name initials"
                >
                  Frontend Developer
                </span>

              </div>

              {/* Social Links */}
              <SocialLinks />

              {/* Copyright */}
              <div className="text-gray-400 text-sm">
                <span aria-label={`Copyright ${currentYear} Your Name`}>
                  © {currentYear} <span className="text-white">Mahmudullah Kayes</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
