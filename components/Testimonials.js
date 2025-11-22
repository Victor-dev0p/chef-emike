// components/Testimonials.jsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  const [hoveredId, setHoveredId] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const testimonials = [
    {
      id: 1,
      name: 'Fejiro Bini',
      role: 'Corporate Executive',
      image: '/feji.jpg',
      text: 'As a busy executive, cooking was never an option. Chef Emike transformed my life by delivering fresh, healthy meals in bulk every week. No more takeout stress—just nutritious, delicious food ready to go. Game changer!',
      rating: 5,
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      id: 2,
      name: 'Kolade Kayode',
      role: 'Corporate Executive',
      image: '/kk.jpg',
      text: 'We hired Chef Emike for our company retreat. The private dinner experience was world-class. Professional, creative, and delicious—highly recommended!',
      rating: 5,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      name: 'Victor Anthony',
      role: 'Food Enthusiast',
      image: '/me.jpg',
      text: 'I took Chef Emike\'s cooking class and learned so much! The techniques, tips, and personalized attention made it one of the best investments in myself.',
      rating: 5,
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      id: 4,
      name: 'Michael & Queen',
      role: 'Anniversary Celebration',
      image: '/tee.jpg',
      text: 'Our anniversary dinner was the most romantic evening we\'ve had in years. Chef Emike\'s attention to detail and flavors created magic on our plates.',
      rating: 5,
      gradient: 'from-orange-500 to-amber-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="testimonials" 
      className="py-15 sm:py-18 lg:py-15 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50 via-white to-orange-50/50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block mb-4"
          >
            <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-orange-400 opacity-50" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-4xl font-bold mb-3 sm:mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-amber-900 to-orange-500 bg-clip-text text-transparent">
              What Clients Say
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg sm:text-xl text-amber-800 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Real stories from real moments of culinary excellence
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              onHoverStart={() => setHoveredId(testimonial.id)}
              onHoverEnd={() => setHoveredId(null)}
              whileHover={{ y: -12, scale: 1.02 }}
              className="relative group"
            >
              {/* Glowing Background Effect */}
              <motion.div 
                className={`absolute -inset-1 bg-gradient-to-r ${testimonial.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}
                animate={hoveredId === testimonial.id ? {
                  scale: [1, 1.1, 1],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <div className="relative h-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl group-hover:shadow-2xl transition-all duration-500 border-2 border-orange-100 group-hover:border-orange-300 overflow-hidden">
                {/* Decorative Quote Mark */}
                <motion.div 
                  className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity"
                  animate={hoveredId === testimonial.id ? {
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1]
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Quote className="w-20 h-20 sm:w-24 sm:h-24 text-orange-500" />
                </motion.div>

                {/* Stars with staggered animation */}
                <motion.div 
                  className="flex gap-1 mb-4 sm:mb-6 relative z-10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.span 
                      key={i}
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: index * 0.2 + 0.4 + (i * 0.1),
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ scale: 1.3, rotate: 360 }}
                      className="text-orange-500 text-lg sm:text-xl cursor-pointer"
                    >
                      ★
                    </motion.span>
                  ))}
                </motion.div>

                {/* Testimonial Text */}
                <motion.p 
                  className="text-amber-900 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 relative z-10 italic"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                >
                  "{testimonial.text}"
                </motion.p>

                {/* Client Info */}
                <motion.div 
                  className="flex items-center gap-4 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.6 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative"
                  >
                    {/* Gradient ring around image */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500`}></div>
                    
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-3 border-white shadow-lg"
                    />
                  </motion.div>
                  
                  <div>
                    <p className="font-bold text-amber-900 text-base sm:text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-orange-600 text-sm sm:text-base">
                      {testimonial.role}
                    </p>
                  </div>
                </motion.div>

                {/* Bottom accent line */}
                <motion.div 
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.gradient}`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: hoveredId === testimonial.id ? 1 : 0.3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}