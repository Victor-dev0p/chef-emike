// components/FloatingButtons.jsx
'use client';

import { useState, useEffect } from 'react';
import { ChevronUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Smooth scroll utility function
export const smoothScrollTo = (targetPosition, duration = 500) => {
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  };

  const ease = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  requestAnimationFrame(animation);
};

export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    smoothScrollTo(0, 500);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (id) => {
        closeMenu();
        const element = document.getElementById(id);
        if (!element) return;

        const top = element.getBoundingClientRect().top + window.scrollY;
        smoothScrollTo(top, 500);
    };


  return (
    <>
      {/* Floating Action Buttons */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed right-4 sm:right-6 md:right-8 bottom-6 sm:bottom-8 z-50 flex flex-col gap-4"
          >
            {/* Chef Picture Button - Mobile & Tablet */}
            <motion.button
              onClick={toggleMenu}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl overflow-hidden border-4 border-orange-400 hover:shadow-xl transition-all duration-300 group"
              aria-label="Open menu"
            >
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop"
                alt="Chef Emike"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </motion.button>

            {/* Scroll to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full shadow-2xl hover:shadow-xl flex items-center justify-center transition-all duration-300 group"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-6 h-6 sm:w-7 sm:h-7 text-amber-900 group-hover:text-orange-500 transition-colors" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      {/* Bottom Slide-up Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-[70] lg:hidden"
          >
            {/* Handle Bar */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Menu Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-orange-200">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-400">
                  <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop"
                    alt="Chef Emike"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-amber-900">Chef Emike</h3>
                  <p className="text-xs text-orange-600">Culinary Excellence</p>
                </div>
              </motion.div>

              {/* Close Button */}
              <motion.button
                onClick={closeMenu}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-orange-50 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-amber-900" />
              </motion.button>
            </div>

            {/* Menu Navigation */}
            <nav className="px-6 pt-4 pb-6">
              <ul className="flex flex-col gap-2">
                {[
                  { label: 'Gallery', id: 'gallery' },
                  { label: 'About', id: 'about' },
                  { label: 'Services', id: 'services' },
                  { label: 'Testimonials', id: 'testimonials' },
                ].map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="w-full text-left py-3 px-4 rounded-lg hover:bg-orange-100 hover:text-orange-600 transition-all duration-300 text-amber-900 font-medium"
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button in Menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-6"
              >
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-4 rounded-full hover:shadow-lg transition-all duration-300 text-white font-semibold hover:scale-105"
                >
                  Book Now
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}