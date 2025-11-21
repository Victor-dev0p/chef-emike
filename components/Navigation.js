'use client';

import { useState } from 'react';
import { smoothScrollTo } from './FloatingButtons'; // <-- ADD THIS IMPORT

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    const top = element.getBoundingClientRect().top + window.scrollY;

    smoothScrollTo(top, 500); // <-- SAME SMOOTH SCROLL USED IN MOBILE MENU
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50 cursor-pointer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-3xl font-bold bg-gradient-to-r from-amber-900 to-orange-500 bg-clip-text text-transparent">
              Chef Emike
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-amber-900 hover:text-orange-500 transition-colors font-medium cursor-pointer"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-amber-900 hover:text-orange-500 transition-colors font-medium cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-amber-900 hover:text-orange-500 transition-colors font-medium cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-amber-900 hover:text-orange-500 transition-colors font-medium cursor-pointer"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:shadow-lg transition-shadow font-medium cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
