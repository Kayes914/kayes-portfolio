import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

// Types
interface NavLink {
  name: string;
  href: string;
  ariaLabel?: string;
}

interface NavLinkItemProps {
  link: NavLink;
  isActive: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

// Constants
const NAV_LINKS: NavLink[] = [
  { name: "Home", href: "#home", ariaLabel: "Go to home section" },
  { name: "Works", href: "#works", ariaLabel: "View my works" },
  { name: "About", href: "#about", ariaLabel: "Learn about me" },
  { name: "Testimonials", href: "#testimonials", ariaLabel: "Read testimonials" },
];

const SCROLL_THRESHOLD = 20;
const SCROLL_HIDE_THRESHOLD = 100;
const VIEWPORT_SECTION_THRESHOLD = 0.3;

// Animation variants
const navAnimation = {
  initial: { y: -100 },
  animate: { y: 0 },
  transition: { duration: 0.5 }
};

// Components
const NavLinkItem: React.FC<NavLinkItemProps> = ({ link, isActive, onClick }) => {
  const baseClasses = `text-gray-300 hover:text-white transition-colors text-xs sm:text-sm md:text-base ${
    isActive ? 'text-white' : ''
  }`;

  if (link.href.startsWith('#')) {
    return (
      <motion.a
        href={link.href}
        onClick={onClick}
        className={`${baseClasses} relative group px-2 sm:px-3 md:px-4`}
        whileHover={{ y: -2 }}
        aria-label={link.ariaLabel}
        aria-current={isActive ? 'page' : undefined}
      >
        {link.name}
        <span 
          className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 
            transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
          aria-hidden="true"
        />
      </motion.a>
    );
  }

  return (
    <Link
      to={link.href}
      className={`${baseClasses} relative group px-2 sm:px-3 md:px-4`}
      aria-label={link.ariaLabel}
      aria-current={isActive ? 'page' : undefined}
    >
      <motion.span
        whileHover={{ y: -2 }}
        className="inline-block"
      >
        {link.name}
      </motion.span>
      <span 
        className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 
          transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
        aria-hidden="true"
      />
    </Link>
  );
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll effect
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    setIsScrolled(currentScrollY > SCROLL_THRESHOLD);
    
    if (currentScrollY > lastScrollY && currentScrollY > SCROLL_HIDE_THRESHOLD) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    
    setLastScrollY(currentScrollY);

    const sections = NAV_LINKS.map(link => link.href.substring(1));
    const viewportHeight = window.innerHeight;
    
    for (const section of sections.reverse()) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= viewportHeight * VIEWPORT_SECTION_THRESHOLD && 
            rect.bottom >= viewportHeight * VIEWPORT_SECTION_THRESHOLD) {
          setActiveSection(section);
          break;
        }
      }
    }
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setActiveSection(targetId);
    }
  };

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-2 sm:px-4 md:px-6 pt-4 sm:pt-6
        transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      role="banner"
    >
      <motion.header
        {...navAnimation}
        className={`relative rounded-2xl transition-all duration-300 
          ${isScrolled 
            ? 'py-2 sm:py-3 px-2 sm:px-3 bg-[#0B0F1E]/80 backdrop-blur-xl border border-blue-500/20 shadow-lg shadow-blue-500/5' 
            : 'py-3 sm:py-4 px-3 sm:px-4 bg-[#0B0F1E]/60 backdrop-blur-lg'
          }`}
      >
        <nav className="relative flex items-center justify-center gap-2 sm:gap-4 md:gap-8" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <NavLinkItem
              key={link.name}
              link={link}
              isActive={activeSection === link.href.substring(1)}
              onClick={link.href.startsWith('#') ? (e) => handleNavClick(e, link.href) : undefined}
            />
          ))}
          <Link to="/contact">
            <motion.div
              className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 
                text-white text-xs sm:text-sm md:text-base font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0B0F1E]
                ${location.pathname === '/contact' ? 'shadow-lg shadow-blue-500/25' : ''}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Contact me"
            >
              Let's Talk
            </motion.div>
          </Link>
        </nav>
      </motion.header>
    </div>
  );
};

export default Navbar; 