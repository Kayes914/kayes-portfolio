import { lazy, Suspense, Component, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Lazy load components for better performance
const Hero = lazy(() => import('./components/sections/Hero'));
const Works = lazy(() => import('./components/sections/Works'));
const About = lazy(() => import('./components/sections/About'));
const Footer = lazy(() => import('./components/sections/Footer'));
const Testimonials = lazy(() => import('./components/sections/Testimonials'));
const Navbar = lazy(() => import('./components/sections/Navbar'));
const Contact = lazy(() => import('./components/sections/Contact'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#0B0F1E]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Error Boundary Component
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B0F1E] text-white p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Home component with SEO
const Home = () => (
  <>
    <Helmet>
      <title>Mahmudullah Kayes | Portfolio</title>
      <meta name="description" content="Frontend Developer specializing in React, Next.js, and modern web technologies. Creating exceptional digital experiences with innovative design." />
      <meta name="keywords" content="Mahmudullah Kayes, Frontend Developer, React Developer, Web Development, UI/UX, JavaScript, TypeScript, Portfolio, Bangladesh Developer" />
      <meta property="og:title" content="Mahmudullah Kayes - Frontend Developer Portfolio" />
      <meta property="og:description" content="Creating exceptional digital experiences with innovative design and modern web technologies." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="/" />
      <meta property="og:image" content="/images/profile.jpeg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Mahmudullah Kayes - Frontend Developer" />
      <meta name="twitter:description" content="Frontend Developer specializing in React and modern web technologies." />
      <meta name="twitter:image" content="/images/profile.jpeg" />
      <link rel="canonical" href="/" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Mahmudullah Kayes" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0B0F1E" />
    </Helmet>
    <Suspense fallback={<LoadingSpinner />}>
      <Navbar />
      <main>
        <Hero />
        <Works />
        <About />
        <Testimonials />
      </main>
      <Footer />
    </Suspense>
  </>
);

// Contact page with SEO
const ContactPage = () => (
  <>
    <Helmet>
      <title>Contact | Mahmudullah Kayes</title>
      <meta name="description" content="Get in touch with Mahmudullah Kayes for web development projects, collaborations, or professional opportunities." />
      <meta property="og:title" content="Contact Mahmudullah Kayes - Frontend Developer" />
      <meta property="og:description" content="Let's discuss your project and create something amazing together." />
      <meta property="og:url" content="https://kayes-portfolio.netlify.app/contact" />
      <meta name="robots" content="index, follow" />
    </Helmet>
    <Suspense fallback={<LoadingSpinner />}>
      <Contact />
    </Suspense>
  </>
);

const App = () => (
  <HelmetProvider>
    <ErrorBoundary>
      <Router>
        <div className="relative min-h-screen bg-[#0B0F1E]" role="application">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  </HelmetProvider>
);

export default App;
