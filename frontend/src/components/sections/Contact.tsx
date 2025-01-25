import React, { useState, FormEvent, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedinIn, FaWhatsapp, FaArrowLeft, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';
import emailjs from '@emailjs/browser';

// Types
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface SocialLink {
  icon: IconType;
  href: string;
  color: string;
  label: string;
}

// Constants
const INITIAL_FORM_STATE: FormData = {
  name: '',
  email: '',
  message: ''
};

const SOCIAL_LINKS: SocialLink[] = [
  { 
    icon: FaGithub, 
    href: "https://github.com/Kayes914", 
    color: "hover:text-[#2ea44f]",
    label: "GitHub Profile"
  },
  { 
    icon: FaLinkedinIn, 
    href: "https://www.linkedin.com/in/mahmudullah-kayes/", 
    color: "hover:text-[#0077b5]",
    label: "LinkedIn Profile"
  },
  { 
    icon: FaWhatsapp, 
    href: "https://wa.me/8801845901833", 
    color: "hover:text-[#25D366]",
    label: "WhatsApp Contact"
  },
  { 
    icon: FaFacebook, 
    href: "https://www.facebook.com/MahmudullahKayes914", 
    color: "hover:text-[#1877f2]",
    label: "Facebook Profile"
  }
];

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const email = "engrkayes914@gmail.com";

  // Form validation
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Map the EmailJS field names to our form state fields
    const fieldName = name === 'user_name' ? 'name' : 
                     name === 'user_email' ? 'email' : 
                     'message';
    
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    // Clear error when user starts typing
    if (formErrors[fieldName as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [fieldName]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      if (form.current) {
        // Initialize EmailJS
        emailjs.init("yYtGrbIr_Jiz9PcGs");
        
        // Prepare template parameters
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: "Mahmudullah Kayes",
          reply_to: formData.email
        };
        
        const result = await emailjs.send(
          'service_xpb0joj',
          'template_lwfd5uo',
          templateParams,
          'yYtGrbIr_Jiz9PcGs'
        );

        if (result.text === 'OK') {
          setFormData(INITIAL_FORM_STATE);
          alert('Message sent successfully! I will get back to you soon.');
        } else {
          throw new Error('Failed to send message');
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again or contact me directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <section 
      id="contact" 
      className="w-full min-h-screen bg-[#0B0F1E] relative overflow-hidden py-20"
      aria-label="Contact section"
    >
      {/* Add Schema markup for Contact Page */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Mahmudullah Kayes",
          "description": "Get in touch with Mahmudullah Kayes for web development projects and collaborations",
          "url": "/contact",
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "engrkayes914@gmail.com",
            "contactType": "customer service"
          }
        })}
      </script>
      {/* Return Button */}
      <div className="absolute top-8 left-8 z-20">
        <Link to="/" aria-label="Return to home page">
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 
              border border-blue-500/20 text-white hover:from-blue-500/30 hover:to-purple-500/30 
              hover:border-blue-500/30 transition-all duration-300"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaArrowLeft className="text-blue-400" aria-hidden="true" />
            <span className="font-medium">Return Home</span>
          </motion.div>
        </Link>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium tracking-[0.3em] text-blue-400 mb-3 block">GET IN TOUCH</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">Contact Me</h2>
          <div 
            className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"
            role="presentation"
          />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Let's discuss your project and bring your ideas to life.
          </p>
        </motion.header>

        {/* Contact Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="relative p-8 rounded-2xl bg-[#0c1221] border border-blue-500/20 
              backdrop-blur-sm shadow-[inset_0_0_20px_rgba(79,70,229,0.1)]"
            >
              <form ref={form} onSubmit={handleSubmit} className="space-y-6" noValidate>
                <input type="hidden" name="from_name" value={formData.name} />
                <input type="hidden" name="reply_to" value={formData.email} />
                <div>
                  <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="user_name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-[#0B0F1E] border ${
                      formErrors.name ? 'border-red-500/50' : 'border-blue-500/20'
                    } text-gray-300 focus:outline-none focus:border-blue-500/50 transition-colors`}
                    placeholder="Your name"
                    aria-describedby={formErrors.name ? "name-error" : undefined}
                    aria-invalid={!!formErrors.name}
                  />
                  {formErrors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-400">
                      {formErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="user_email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-[#0B0F1E] border ${
                      formErrors.email ? 'border-red-500/50' : 'border-blue-500/20'
                    } text-gray-300 focus:outline-none focus:border-blue-500/50 transition-colors`}
                    placeholder="your.email@example.com"
                    aria-describedby={formErrors.email ? "email-error" : undefined}
                    aria-invalid={!!formErrors.email}
                  />
                  {formErrors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-400">
                      {formErrors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-[#0B0F1E] border ${
                      formErrors.message ? 'border-red-500/50' : 'border-blue-500/20'
                    } text-gray-300 focus:outline-none focus:border-blue-500/50 transition-colors resize-none`}
                    placeholder="Your message..."
                    aria-describedby={formErrors.message ? "message-error" : undefined}
                    aria-invalid={!!formErrors.message}
                  />
                  {formErrors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-400">
                      {formErrors.message}
                    </p>
                  )}
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 
                    text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all
                    disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Contact Card */}
            <div className="relative p-8 rounded-2xl bg-[#0c1221] border border-blue-500/20 
              backdrop-blur-sm shadow-[inset_0_0_20px_rgba(79,70,229,0.1)]"
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
                  bg-clip-text text-transparent">Let's Connect</h3>
                <p className="text-gray-400">
                  Feel free to reach out for collaborations, opportunities, or just a friendly chat.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-gray-300 group">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <FaEnvelope className="text-xl" aria-hidden="true" />
                    </div>
                    <span className="flex-grow">{email}</span>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCopyEmail}
                      className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-sm font-medium hover:bg-blue-500/20 transition-colors"
                      aria-label={showCopied ? "Email copied" : "Copy email address"}
                    >
                      {showCopied ? "Copied!" : "Copy"}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="relative p-8 rounded-2xl bg-[#0c1221] border border-blue-500/20 
              backdrop-blur-sm shadow-[inset_0_0_20px_rgba(79,70,229,0.1)]"
            >
              <h3 className="text-xl font-bold text-white mb-6">Follow Me</h3>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 
                      flex items-center justify-center text-gray-400 ${social.color} transition-colors`}
                    whileHover={{ y: -2 }}
                  >
                    <social.icon className="text-xl" aria-hidden="true" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 