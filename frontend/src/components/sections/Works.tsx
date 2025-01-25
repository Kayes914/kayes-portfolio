import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IconType } from 'react-icons';
import { 
  FaReact, 
  FaHtml5, 
  FaJs,
  FaCss3Alt,
  FaPhp,
  FaDatabase
} from 'react-icons/fa';
import { 
  SiNextdotjs, 
  SiTailwindcss, 
  SiTypescript, 
  SiFirebase, 
  SiSocketdotio, 
  SiChartdotjs, 
  SiFramer
} from 'react-icons/si';

// Types
interface TechIcon {
  icon: IconType;
  color: string;
  name: string;
  label?: string;
}

interface Project {
  title: string;
  description: string;
  image: string;
  tech: TechIcon[];
  color: string;
  date: string;
  link?: string;
  category?: string;
}

interface TechIconProps {
  tech: TechIcon;
  className?: string;
}

interface PaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
  direction: 'prev' | 'next';
  ariaLabel: string;
}

// Tech stack icons configuration
const techIcons: Record<string, TechIcon> = {
  React: { 
    icon: FaReact, 
    color: '#61DAFB', 
    name: 'React',
    label: 'React.js Framework' 
  },
  Next: { 
    icon: SiNextdotjs, 
    color: '#FFFFFF', 
    name: 'Next.js',
    label: 'Next.js Framework' 
  },
  Tailwind: { 
    icon: SiTailwindcss, 
    color: '#38B2AC', 
    name: 'Tailwind',
    label: 'Tailwind CSS Framework' 
  },
  JavaScript: { 
    icon: FaJs, 
    color: '#F7DF1E', 
    name: 'JavaScript',
    label: 'JavaScript Programming Language' 
  },
  TypeScript: { 
    icon: SiTypescript, 
    color: '#3178C6', 
    name: 'TypeScript',
    label: 'TypeScript Programming Language' 
  },
  HTML: { 
    icon: FaHtml5, 
    color: '#E34F26', 
    name: 'HTML',
    label: 'HTML5 Markup Language' 
  },
  CSS: { 
    icon: FaCss3Alt, 
    color: '#2965f1', 
    name: 'CSS',
    label: 'CSS3 Styling' 
  },
  PHP: { 
    icon: FaPhp, 
    color: '#777BB3', 
    name: 'PHP',
    label: 'PHP Programming Language' 
  },
  MySQL: { 
    icon: FaDatabase, 
    color: '#00758F', 
    name: 'MySQL',
    label: 'MySQL Database' 
  },
  Firebase: { 
    icon: SiFirebase, 
    color: '#FFCA28', 
    name: 'Firebase',
    label: 'Firebase Backend Services' 
  },
  Socket: { 
    icon: SiSocketdotio, 
    color: '#FFFFFF', 
    name: 'Socket.io',
    label: 'Socket.io Real-time Communication' 
  },
  Chart: { 
    icon: SiChartdotjs, 
    color: '#FF6384', 
    name: 'Chart.js',
    label: 'Chart.js Data Visualization' 
  },
  Framer: { 
    icon: SiFramer, 
    color: '#0055FF', 
    name: 'Framer',
    label: 'Framer Motion Animation Library' 
  }
};

// Project data
const projects: Project[] = [
  {
    title: "Nike Shoes Landing Page",
    description: "A modern and interactive landing page for Nike shoes, featuring smooth and responsive design.",
    image: "/images/project1.png",
    tech: [techIcons.React],
    color: "from-orange-400 to-red-500",
    date: "2024-01-20",
    link: "https://kayes914.github.io/nike-shoes-landing-page-project/",
    category: "Landing Page"
  },
  {
    title: "Nyeem Personal Portfolio Website",
    description: "Personal portfolio website for Nyeem, showcasing his skills, projects, and achievements.",
    image: "/images/1.png",
    tech: [techIcons.HTML, techIcons.CSS, techIcons.PHP, techIcons.MySQL],
    color: "from-cyan-400 to-blue-500",
    date: "2024-01-15",
    link: "https://nyeem.xyz/",
    category: "Web Application"
  }
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// Components
const TechIcon: React.FC<TechIconProps> = ({ tech, className = "" }) => (
  <div className={`group/icon relative flex items-center justify-center ${className}`}>
    <tech.icon 
      style={{ color: tech.color }}
      className="w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 hover:scale-110"
      aria-label={tech.label || tech.name}
    />
    <span 
      className="absolute -bottom-8 bg-black/80 text-white text-[10px] sm:text-xs px-2 py-1 rounded
        opacity-0 group-hover/icon:opacity-100 transition-all duration-300 whitespace-nowrap"
      role="tooltip"
    >
      {tech.label || tech.name}
    </span>
  </div>
);

const PaginationButton: React.FC<PaginationButtonProps> = ({ 
  onClick, 
  disabled, 
  direction,
  ariaLabel 
}) => (
  <motion.button
    whileHover={{ x: direction === 'prev' ? -3 : 3 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    className={`w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 transition-all duration-300
      ${disabled 
        ? 'text-white/20 border-white/5 cursor-not-allowed' 
        : 'text-white hover:text-blue-400 hover:border-blue-400'}`}
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="16" 
      height="16" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
      aria-hidden="true"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d={direction === 'prev' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} 
      />
    </svg>
  </motion.button>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <motion.article
    className="relative group"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative p-6 rounded-2xl bg-[#0c1221] border border-blue-500/20 backdrop-blur-sm 
      shadow-[inset_0_0_20px_rgba(79,70,229,0.1)] group-hover:border-blue-500/40 transition-all duration-300">
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-6">
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
            aria-label={`View ${project.title} project`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            />
          </a>
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>

      <div className="space-y-4">
        <header>
          {project.category && (
            <span className="text-sm text-blue-400 mb-2 block">
              {project.category}
            </span>
          )}
          <div className="relative">
            <h3 className={`text-2xl font-bold bg-gradient-to-r ${project.color} 
              bg-clip-text text-transparent opacity-0 group-hover:opacity-100
              transition-opacity duration-300`}>
              {project.title}
            </h3>
            <h3 className="text-2xl font-bold text-white group-hover:opacity-0 
              transition-opacity duration-300 absolute inset-0">
              {project.title}
            </h3>
          </div>
        </header>

        <p className="text-gray-300/90 text-sm leading-relaxed font-medium">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-4 pt-3" role="list" aria-label="Technologies used">
          {project.tech.map((tech, i) => (
            <div key={i} className="transform-gpu" role="listitem">
              <TechIcon tech={tech} />
            </div>
          ))}
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl
              bg-gradient-to-r ${project.color} 
              border border-white/10
              transition-all duration-300 mt-6
              hover:shadow-lg hover:shadow-current/25 focus:ring-2 focus:ring-current/50 focus:outline-none`}
            aria-label={`View ${project.title} project details`}
          >
            <span className="font-semibold text-white/90">View Project</span>
            <span className="text-xl" aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </div>
  </motion.article>
);

const Works: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const currentProjects = projects.slice(
    (currentPage - 1) * projectsPerPage, 
    currentPage * projectsPerPage
  );

  return (
    <section 
      ref={sectionRef}
      id="works" 
      className="w-full min-h-screen bg-[#0B0F1E] relative overflow-hidden py-16 sm:py-20"
      aria-label="Portfolio Works"
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <header className="mb-12 sm:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative inline-flex flex-col items-center"
          >
            <span className="text-xs sm:text-sm font-medium tracking-[0.3em] text-blue-400 mb-3">
              PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Recent Works
            </h2>
            <div 
              className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
              role="presentation"
            />
          </motion.div>
        </header>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          role="region"
          aria-label="Projects showcase"
        >
          {currentProjects.map((project, index) => (
            <ProjectCard 
              key={`${project.title}-${index}`}
              project={project}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <nav 
            className="flex justify-center items-center mt-20 sm:mt-32"
            aria-label="Projects pagination"
          >
            <div className="flex items-center gap-6 sm:gap-8 px-4 sm:px-6 py-3 sm:py-4 
              bg-white/5 backdrop-blur-sm rounded-2xl">
              <PaginationButton 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                direction="prev"
                ariaLabel="Go to previous page"
              />

              <div className="flex items-center gap-3 text-base sm:text-lg font-medium">
                <span className="text-blue-400">
                  Page {currentPage}
                </span>
                <span className="text-white/30" aria-hidden="true">/</span>
                <span className="text-white/50">
                  {totalPages}
                </span>
              </div>

              <PaginationButton 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                direction="next"
                ariaLabel="Go to next page"
              />
            </div>
          </nav>
        )}
      </motion.div>
    </section>
  );
};

export default Works; 