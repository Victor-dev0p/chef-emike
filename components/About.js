// components/About.jsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Counter animation hook
function useCounter(end, duration = 2, shouldStart = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, shouldStart]);

  return count;
}

export default function About() {
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  
  const yearsCount = useCounter(4, 1, isStatsInView);
  const starsCount = useCounter(5, 1, isStatsInView);

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Content */}
          <motion.div
            className="lg:pt-12"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-5xl sm:text-6xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-amber-900 to-orange-500 bg-clip-text text-transparent">
                About Chef Eucharia
              </span>
            </motion.h2>

            <div className="space-y-6 text-lg text-amber-900 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                My name is Eucharia, a chef with over four years of professional experience — but my love for food began at age seven, following my mum to her canteen in the barracks. The sights and aromas of those early days sparked the passion that still drives me.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Cooking is more than a skill for me; it’s my creative outlet. The kitchen is where I blend culture, flavor, and emotion into dishes that tell a story and make people feel something special.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Over the years, I’ve developed a strong command of different culinary styles, consistently crafting meals that are flavorful and visually appealing. My goal is simple: to create memorable, heartfelt dining experiences through every plate I serve.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div 
              ref={statsRef}
              className="mt-12 grid grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div 
                className="border-l-4 border-orange-500 pl-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-4xl font-bold text-orange-600 mb-2">
                  {yearsCount}+
                </p>
                <p className="text-amber-900">Years of Excellence</p>
              </motion.div>
              <motion.div 
                className="border-l-4 border-orange-500 pl-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-4xl font-bold text-orange-600 mb-2">
                  {starsCount}⭐
                </p>
                <p className="text-amber-900">Client Satisfaction</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div 
            className="relative order-first lg:order-last"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl transform rotate-3 opacity-20"
              animate={{ rotate: [3, 5, 3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
            <motion.img
              src="/Chef.jpg"
              alt="Chef Emike"
              className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover object-center rounded-2xl shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}