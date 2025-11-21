// components/Services.jsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Services() {
  const [hoveredId, setHoveredId] = useState(null);

  const services = [
    {
      id: 1,
      icon: '👨‍🍳',
      title: 'Private Dinners',
      description: 'Exclusive multi-course dining experiences tailored to your preferences, hosted at your location with personalized service.',
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 2,
      icon: '🎓',
      title: 'Cooking Classes',
      description: 'Learn professional techniques and culinary secrets in an intimate, hands-on environment from an experienced chef.',
      color: 'from-amber-400 to-orange-500'
    },
    {
      id: 3,
      icon: '🎉',
      title: 'Event Catering',
      description: 'Customized menus for weddings, corporate events, birthdays, and celebrations of all sizes with impeccable execution.',
      color: 'from-yellow-400 to-amber-500'
    },
    {
      id: 4,
      icon: '🍽️',
      title: 'Pop-up Events',
      description: 'Unique dining experiences at curated venues, creating buzz and unforgettable memories for your guests.',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 5,
      icon: '📦',
      title: 'Meal Preparation',
      description: 'Custom meal prep services for busy professionals, ensuring healthy and delicious meals throughout your week.',
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 6,
      icon: '🎬',
      title: 'Culinary Consulting',
      description: 'Expert guidance for restaurants, hotels, and food businesses looking to elevate their culinary offerings.',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-orange-50/30 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-amber-900 to-orange-500 bg-clip-text text-transparent">
              Services
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-amber-800 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Comprehensive culinary solutions for every occasion
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              onHoverStart={() => setHoveredId(service.id)}
              onHoverEnd={() => setHoveredId(null)}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              {/* Card Background with Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-amber-400/20 to-orange-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              
              <div className="relative h-full p-6 sm:p-8 bg-white rounded-3xl border-2 border-orange-100 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Animated Background Gradient */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  animate={hoveredId === service.id ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, 0]
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Icon with floating animation */}
                <motion.div 
                  className="text-5xl sm:text-6xl mb-4 sm:mb-6 relative z-10"
                  animate={hoveredId === service.id ? {
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {service.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-amber-900 mb-3 sm:mb-4 relative z-10 group-hover:text-orange-600 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-amber-800 leading-relaxed relative z-10 mb-6">
                  {service.description}
                </p>

                {/* Animated Bottom Bar */}
                <div className="relative z-10 mt-auto">
                  <motion.div 
                    className={`h-1 bg-gradient-to-r ${service.color} rounded-full`}
                    initial={{ width: "0%" }}
                    whileInView={{ width: hoveredId === service.id ? "100%" : "30%" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Decorative Corner Element */}
                <motion.div 
                  className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${service.color} rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-500`}
                  animate={hoveredId === service.id ? {
                    scale: [1, 1.3, 1],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}