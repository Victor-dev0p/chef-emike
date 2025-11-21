// components/Footer.jsx
'use client';

import { motion } from 'framer-motion';
import { FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa6';

export default function Footer() {
  const socials = [
    { icon: FaInstagram, url: 'https://www.instagram.com/_chefeukay?igsh=cGY1dTE3eXo2bWQy&utm_source=qr' },
    { icon: FaTiktok, url: 'https://www.tiktok.com/@_chefeukay?_r=1&_t=ZS-91aYyLYZH5c' },
    { icon: FaFacebook, url: 'https://www.facebook.com/share/1FcowsRq6s/?mibextid=wwXIfr' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-amber-950 text-orange-100 py-12">
      <div className="max-w-5xl mx-auto text-center px-4 space-y-6">
        <motion.h2
          className="text-xl sm:text-2xl font-semibold text-white"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Chef Emike
        </motion.h2>

        <motion.p
          className="text-sm sm:text-base leading-relaxed text-wrap break-words"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Crafting culinary excellence and unforgettable dining experiences through 
          passion, innovation, and the finest ingredients. Let's celebrate life's 
          special moments together, one delicious plate at a time.
        </motion.p>

        <motion.div
          className="flex justify-center space-x-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {socials.map(({ icon: Icon, url }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-200 hover:text-orange-400 transition duration-300"
            >
              <Icon size={24} />
            </a>
          ))}
        </motion.div>

        <motion.span
          className="text-xs sm:text-sm block"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          © {currentYear} Chef Emike. All rights reserved.
        </motion.span>
      </div>
    </footer>
  );
}