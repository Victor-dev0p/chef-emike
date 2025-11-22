// components/Hero.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

export default function Hero() {
  // 2 images and 1 video
  const media = [
    { type: 'image', src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop' },
    { type: 'video', src: '/hero.mp4' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop' },
  ];

  const [index, setIndex] = useState(0);
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });

  // Counter animation hook
  const useCounter = (end, duration = 2000, shouldStart) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!shouldStart) return;

      let startTime;
      let animationFrame;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        setCount(Math.floor(progress * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, shouldStart]);

    return count;
  };

  const yearsCount = useCounter(4, 2000, isInView);
  const clientsCount = useCounter(20, 2500, isInView);
  const dishesCount = useCounter(100, 2800, isInView);

  // Auto-cycle every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % media.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [media.length]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center overflow-hidden">
      
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          {media[index].type === 'image' ? (
            <motion.div
              key={`image-${index}`}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${media[index].src})` }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            />
          ) : (
            <motion.video
              key={`video-${index}`}
              className="absolute inset-0 w-full h-full object-cover"
              src={media[index].src}
              autoPlay
              muted
              loop
              playsInline
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            />
          )}
        </AnimatePresence>
        
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white drop-shadow-2xl">
              Culinary Excellence
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Crafting unforgettable experiences through innovative cuisine and passion for food
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('gallery')}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all"
            >
              Explore Gallery
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-white/90 backdrop-blur-sm text-amber-900 rounded-full font-semibold hover:bg-white hover:shadow-xl hover:scale-105 transition-all"
            >
              Book a Consultation
            </button>
          </div>
        </motion.div>

        {/* Stats - Decorative element */}
        <motion.div 
          ref={statsRef}
          className="mt-16 sm:mt-20 grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div 
            className="text-center backdrop-blur-sm bg-white/10 p-3 sm:p-4 md:p-6 rounded-lg border border-white/20"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-400 mb-1 sm:mb-2 drop-shadow-lg">
              {yearsCount}+
            </div>
            <p className="text-xs sm:text-sm md:text-base text-white drop-shadow">Years Experience</p>
          </motion.div>
          
          <motion.div 
            className="text-center backdrop-blur-sm bg-white/10 p-3 sm:p-4 md:p-6 rounded-lg border border-white/20"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-400 mb-1 sm:mb-2 drop-shadow-lg">
              {clientsCount}+
            </div>
            <p className="text-xs sm:text-sm md:text-base text-white drop-shadow">Happy Clients</p>
          </motion.div>
          
          <motion.div 
            className="text-center backdrop-blur-sm bg-white/10 p-3 sm:p-4 md:p-6 rounded-lg border border-white/20"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-400 mb-1 sm:mb-2 drop-shadow-lg">
              {dishesCount}+
            </div>
            <p className="text-xs sm:text-sm md:text-base text-white drop-shadow">Dishes Created</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}