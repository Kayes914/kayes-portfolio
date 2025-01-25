import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Laura Bennett",
    role: "Marketing Manager",
    company: "BrightWave Solutions",
    content: "It was a pleasure working with this developer. Their ability to take our complex requirements and create a seamless solution was nothing short of amazing."
  },
  {
    name: "David Ramirez",
    role: "Founder & CEO",
    company: "EcoStream Innovations",
    content: "This developer's expertise and professionalism stood out throughout the project. They built a reliable and intuitive platform that exceeded our expectations."
  },
  {
    name: "Sophia Patel",
    role: "Design Lead",
    company: "Creatix Studio",
    content: "I've collaborated with many developers, but their dedication and precision in bringing designs to life were unmatched. Highly recommend!"
  }
];

const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-[#0c1221] p-6 rounded-xl border border-blue-500/10 hover:border-blue-500/20 transition-colors"
    role="article"
    aria-label={`Testimonial from ${testimonial.name}`}
  >
    <FaQuoteLeft 
      className="text-2xl text-blue-400/40 mb-4" 
      aria-hidden="true"
    />
    <blockquote>
      <p className="text-gray-300 text-sm leading-relaxed mb-6">
        "{testimonial.content}"
      </p>
      <footer className="mt-4">
        <cite className="not-italic">
          <h3 className="text-white font-medium">
            {testimonial.name}
          </h3>
          <p className="text-sm text-gray-400">
            {testimonial.role} • {testimonial.company}
          </p>
        </cite>
      </footer>
    </blockquote>
  </motion.div>
);

const Testimonials: React.FC = () => {
  return (
    <section 
      id="testimonials" 
      className="w-full py-20 bg-[#0B0F1E] relative overflow-hidden"
      aria-label="Client Testimonials"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              What Clients Say
            </h2>
            <div 
              className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
              role="presentation"
            />
          </motion.div>

          {/* Testimonials Grid */}
          <div 
            className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            role="region"
            aria-label="Client testimonials grid"
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={`${testimonial.name}-${index}`}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 