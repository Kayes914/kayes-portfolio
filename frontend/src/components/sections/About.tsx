import React from 'react';
import { motion } from 'framer-motion';
import { HiCode, HiLightBulb, HiGlobe } from 'react-icons/hi';
import { SiReact, SiTailwindcss, SiJavascript, SiTypescript, SiNextdotjs } from 'react-icons/si';
import { IconType } from 'react-icons';

// Types
interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TechStack {
  icon: IconType;
  name: string;
  color: string;
}

// Timeline Component
const TimelineItem: React.FC<TimelineItem> = ({ year, title, description }) => (
  <div className="relative pl-8">
    {/* Connecting Line */}
    <div 
      className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-pink-500/30"
      role="presentation"
    />
    
    {/* Timeline Dot */}
    <div 
      className="absolute left-[-4px] top-[2.1rem]"
      aria-hidden="true"
    >
      <div className="relative w-3 h-3">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400" />
        <div className="absolute inset-[-4px] rounded-full border-2 border-blue-400/20 animate-[spin_3s_linear_infinite]" />
      </div>
    </div>
    
    {/* Content */}
    <div className="mb-8">
      <div className="relative p-6 rounded-2xl bg-[#0c1221] border border-blue-500/20 backdrop-blur-sm shadow-[inset_0_0_20px_rgba(79,70,229,0.1)]">
        <time className="text-sm font-medium text-blue-400 block mb-2">{year}</time>
        <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
          {title}
        </h3>
        <p className="text-gray-400/90">{description}</p>
      </div>
    </div>
  </div>
);

// Tech Card Component
const TechCard: React.FC<{ tech: TechStack; index: number }> = ({ tech, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -5 }}
    className="relative p-5 rounded-xl bg-[#0c1221]/50 border border-blue-500/10 backdrop-blur-sm group"
  >
    <div 
      className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" 
      aria-hidden="true"
    />
    <div className="relative flex flex-col items-center gap-2 text-center">
      <tech.icon 
        className={`text-4xl ${tech.color} transition-transform group-hover:scale-110`}
        aria-label={tech.name}
      />
      <span className="text-sm font-medium text-gray-300">{tech.name}</span>
    </div>
  </motion.div>
);

// Timeline data
const timelineItems: TimelineItem[] = [
  {
    year: "2021",
    title: "Started Web Development",
    description: "Began my journey in web development, focusing on modern JavaScript and React."
  },
  {
    year: "2022",
    title: "Frontend Specialist",
    description: "Specialized in frontend development with React, Next.js, and modern web technologies."
  },
  {
    year: "2024",
    title: "Full Stack Development",
    description: "Expanded skills to include backend development and database management."
  }
];

// Stats data
const stats = [
  { number: "6+", label: "Months Experience" },
  { number: "4+", label: "Projects Completed" },
  { number: "100%", label: "Client Satisfaction" }
];

// Tech stack data
const techStack: TechStack[] = [
  { icon: SiReact, name: "React", color: "text-[#61DAFB]" },
  { icon: SiTailwindcss, name: "Tailwind CSS", color: "text-[#38B2AC]" },
  { icon: SiJavascript, name: "JavaScript", color: "text-[#F7DF1E]" },
  { icon: SiTypescript, name: "TypeScript", color: "text-[#3178C6]" },
  { icon: SiNextdotjs, name: "Next.js", color: "text-white" }
];

const About: React.FC = () => {
  return (
    <section 
      id="about" 
      className="w-full bg-[#0B0F1E] relative overflow-hidden"
      aria-label="About section"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 pb-20 mt-20">
          <div className="space-y-20">
            {/* Section Title */}
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative flex flex-col items-center"
              >
                <span className="text-sm font-medium tracking-[0.3em] text-blue-400 mb-3">INTRODUCTION</span>
                <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">About Me</h2>
                <div 
                  className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  role="presentation"
                />
              </motion.div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Column - Content */}
              <div className="md:col-span-6 space-y-8">
                {/* Introduction Card */}
                <div className="relative p-6 rounded-2xl bg-[#0c1221] border border-blue-500/20 backdrop-blur-sm shadow-[inset_0_0_20px_rgba(79,70,229,0.1)]">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 bg-blue-500/10 rounded-xl mt-1">
                      <HiLightBulb className="text-2xl text-blue-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Who I Am</h3>
                      <p className="text-gray-400 leading-relaxed">
                        A passionate frontend developer with a keen eye for design and a love for creating 
                        seamless user experiences. I transform ideas into reality through clean code and 
                        modern technologies.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* What I Do Card */}
                  <div className="relative p-6 rounded-2xl bg-[#0c1221] border border-purple-500/20 backdrop-blur-sm shadow-[inset_0_0_20px_rgba(168,85,247,0.1)]">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0 p-2 bg-purple-500/10 rounded-lg mt-1">
                        <HiCode className="text-2xl text-purple-400" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">What I Do</h3>
                    </div>
                    <ul className="space-y-2 text-gray-400">
                      <li>• Build responsive web applications</li>
                      <li>• Create interactive user interfaces</li>
                      <li>• Optimize performance</li>
                      <li>• Implement modern solutions</li>
                    </ul>
                  </div>

                  {/* Focus Areas Card */}
                  <div className="relative p-6 rounded-2xl bg-[#0c1221] border border-pink-500/20 backdrop-blur-sm shadow-[inset_0_0_20px_rgba(236,72,153,0.1)]">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0 p-2 bg-pink-500/10 rounded-lg mt-1">
                        <HiGlobe className="text-2xl text-pink-400" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Focus Areas</h3>
                    </div>
                    <ul className="space-y-2 text-gray-400">
                      <li>• Modern Web Applications</li>
                      <li>• Interactive Experiences</li>
                      <li>• Clean Architecture</li>
                      <li>• Performance & SEO</li>
                    </ul>
                  </div>
                </div>

                {/* Stats Grid */}
                <div 
                  className="grid grid-cols-3 gap-3"
                  role="region"
                  aria-label="Achievement statistics"
                >
                  {stats.map((stat, index) => (
                    <div key={index} className="relative p-3 rounded-2xl bg-[#0c1221] border border-blue-500/20 backdrop-blur-sm shadow-[inset_0_0_20px_rgba(79,70,229,0.1)] text-center">
                      <div 
                        className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                        aria-label={`${stat.number} ${stat.label}`}
                      >
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Journey Timeline */}
              <div className="md:col-span-6 md:col-start-7">
                <div 
                  className="relative w-full max-w-lg mx-auto pl-[14px]"
                  role="region"
                  aria-label="Professional journey timeline"
                >
                  {timelineItems.map((item, index) => (
                    <TimelineItem 
                      key={index}
                      year={item.year}
                      title={item.title}
                      description={item.description}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Stack Section */}
            <div className="mt-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative p-12 rounded-2xl bg-[#0c1221] border border-blue-500/20 backdrop-blur-sm shadow-[inset_0_0_20px_rgba(79,70,229,0.1)]"
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl"
                  aria-hidden="true"
                />
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-2 mb-12"
                  >
                    <span className="text-sm font-medium tracking-[0.3em] text-blue-400 block">TECHNOLOGIES</span>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">Tech Stack</h3>
                    <div 
                      className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"
                      role="presentation"
                    />
                    <p className="text-gray-400 max-w-2xl mx-auto">
                      Proficient in modern web technologies, focusing on building scalable and performant 
                      applications with clean, maintainable code.
                    </p>
                  </motion.div>
                  
                  <div 
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6"
                    role="list"
                    aria-label="Technology stack"
                  >
                    {techStack.map((tech, index) => (
                      <TechCard key={index} tech={tech} index={index} />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 