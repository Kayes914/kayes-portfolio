import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Types
interface LoadingScreenProps {
  message?: string;
}

interface StarBackgroundProps {
  count?: number;
  size?: number;
  color?: string;
}

interface BackgroundEffectProps {
  className?: string;
  delay?: string;
}

// Loading component with customizable message
const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Loading..." }) => (
  <div 
    className="w-full h-full flex items-center justify-center bg-black"
    role="alert"
    aria-label="Loading content"
  >
    <div className="text-white text-lg md:text-2xl">{message}</div>
  </div>
);

// Star Background Component with customizable properties
const StarBackground: React.FC<StarBackgroundProps> = ({ 
  count = 1500,
  size = 0.01,
  color = "#ffffff" 
}) => {
  const ref = useRef<THREE.Points>(null);
  
  const stars = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 15;
      positions[i + 1] = (Math.random() - 0.5) * 15;
      positions[i + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 25;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={stars} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

// Scene Component with error boundary
const Scene: React.FC = () => (
  <Suspense fallback={null}>
    <StarBackground />
    <ambientLight intensity={0.5} />
    <OrbitControls
      enableZoom={false}
      autoRotate
      autoRotateSpeed={0.5}
      enableDamping
      dampingFactor={0.05}
      minPolarAngle={Math.PI / 2.5}
      maxPolarAngle={Math.PI / 2.1}
    />
  </Suspense>
);

// Background Effect Component
const BackgroundEffect: React.FC<BackgroundEffectProps> = ({ className = "", delay = "" }) => (
  <div 
    className={`absolute rounded-full blur-[120px] animate-float ${className} ${delay}`}
    aria-hidden="true"
  />
);

// Profile Image Component
const ProfileImage: React.FC = () => (
  <div className="hidden md:flex items-center justify-center absolute right-0 w-[500px] h-[500px]">
    <div className="relative w-[450px] h-[450px] overflow-hidden rounded-full">
      <img
        src="/images/profile.jpeg"
        alt="Kayes - Frontend Developer"
        className="w-full h-full object-cover object-center"
        loading="lazy"
        draggable="false"
        decoding="async"
        style={{
          imageRendering: '-webkit-optimize-contrast',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden'
        }}
      />
    </div>
  </div>
);

// Hero Component
const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/contact');
  };

  return (
    <section 
      id="home"
      className="h-screen w-full overflow-hidden relative bg-[#0B0F1E]"
      aria-label="Hero section"
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <BackgroundEffect 
          className="top-[20%] left-[10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-500/20" 
        />
        <BackgroundEffect 
          className="bottom-[10%] right-[20%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-purple-500/20"
          delay="animate-float-delay" 
        />
        <BackgroundEffect 
          className="top-[40%] right-[15%] w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-indigo-500/20"
          delay="animate-float-slow" 
        />
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Suspense fallback={<LoadingScreen />}>
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            dpr={[1, 2]}
            gl={{
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
            }}
          >
            <Scene />
          </Canvas>
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-full relative">
          <motion.div 
            className="max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span 
              className="text-blue-400 font-medium tracking-widest mb-4 text-sm md:text-base block"
              aria-label="Welcome message"
            >
              WELCOME TO MY PORTFOLIO
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Kayes
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-300 mb-8">
              Frontend Developer
            </h2>
            <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed max-w-lg">
              I create exceptional digital experiences that combine innovative design with cutting-edge technology.
            </p>
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={handleContactClick}
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 
                  text-white rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25
                  focus:ring-2 focus:ring-purple-500 focus:outline-none"
                aria-label="Get in touch with Kayes"
              >
                Get In Touch
              </button>
            </motion.div>
          </motion.div>

          <ProfileImage />
        </div>
      </div>
    </section>
  );
};

export default Hero; 