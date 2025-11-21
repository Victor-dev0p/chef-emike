"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const [shuffledImages, setShuffledImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);

  // Sample images with descriptions added
  const galleryImages = [
    { src: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400&h=600", title: "Nautical Wedding Cake", description: "Elegant maritime-inspired design", height: 300 },
    { src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300", title: "Classic White Tiered", description: "Timeless sophistication", height: 200 },
    { src: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&h=400", title: "Rustic Naked Cake", description: "Natural beauty with fresh florals", height: 250 },
    { src: "/services/Naked1.jpg", title: "Garden Wedding Cake", description: "Organic garden-inspired creation", height: 320 },
    { src: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&h=350", title: "Anchor Theme Design", description: "Nautical charm and elegance", height: 220 },
    { src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300", title: "Outdoor Naked Cake", description: "Perfect for garden celebrations", height: 200 },
    { src: "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=400&h=600", title: "Rustic Display Setup", description: "Beautifully styled presentation", height: 350 },
    { src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=400", title: "Simple White Elegance", description: "Pure and minimalist design", height: 240 },
    { src: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300", title: "Minimalist Wedding", description: "Clean lines and sophistication", height: 190 },
    { src: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=550", title: "Floral Buttercream", description: "Delicate buttercream artistry", height: 310 },
    { src: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=350", title: "Berry Topped Cake", description: "Fresh seasonal berries", height: 230 },
    { src: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&h=400", title: "White Rose Cake", description: "Classic romance and beauty", height: 260 },
  ];

  useEffect(() => {
    const shuffled = [...galleryImages].sort(() => Math.random() - 0.5);
    setShuffledImages(shuffled);
  }, []);

  const handleSelect = (item, index) => {
    setSelected(item);
    setCurrentIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelected(null);
    setCurrentIndex(null);
    document.body.style.overflow = "";
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (!shuffledImages.length) return;
    const nextIndex = (currentIndex + 1) % shuffledImages.length;
    setCurrentIndex(nextIndex);
    setSelected(shuffledImages[nextIndex]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (!shuffledImages.length) return;
    const prevIndex = (currentIndex - 1 + shuffledImages.length) % shuffledImages.length;
    setCurrentIndex(prevIndex);
    setSelected(shuffledImages[prevIndex]);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (!selected) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") handleNext({ stopPropagation: () => {} });
      if (e.key === "ArrowLeft") handlePrev({ stopPropagation: () => {} });
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, currentIndex, shuffledImages]);

  return (
    <div id="gallery" className="min-h-screen bg-white">
      {/* 1. GALLERY HEADER - Updated */}
      <div className="py-16 px-4 md:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-900 to-orange-500 bg-clip-text text-transparent">
              Featured Dishes
            </span>
          </h1>
          <p className="text-xl text-amber-800">A showcase of culinary artistry and passion</p>
        </motion.div>

        {/* 2. MASONRY GRID */}
        <div className="max-w-4xl mx-auto">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
            {shuffledImages.map((item, index) => (
              <motion.div
                key={index}
                className="break-inside-avoid-column mb-2 relative cursor-pointer group overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-out"
                style={{ height: `${item.height}px` }}
                onClick={() => handleSelect(item, index)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Updated Overlay with gradient and description */}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/90 via-orange-900/50 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white text-lg md:text-xl font-bold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-orange-100 text-sm">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && currentIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              aria-label="Close"
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:text-[#FA812F] text-3xl md:text-4xl font-light z-[60] transition-colors"
              onClick={closeModal}
            >
              ×
            </button>

            {/* Prev */}
            <button
              aria-label="Previous image"
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-[#FA812F]/20 hover:bg-[#FA812F]/40 text-white text-2xl md:text-3xl p-2 rounded-full z-[60] transition-all"
              onClick={handlePrev}
            >
              &larr;
            </button>

            {/* Next */}
            <button
              aria-label="Next image"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-[#FA812F]/20 hover:bg-[#FA812F]/40 text-white text-2xl md:text-3xl p-2 rounded-full z-[60] transition-all"
              onClick={handleNext}
            >
              &rarr;
            </button>

            {/* Image */}
            <motion.div
              className="relative w-full max-w-5xl h-[70vh] md:h-[80vh] mx-auto px-4 md:px-20"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              key={currentIndex}
            >
              <img
                src={selected.src}
                alt={selected.title}
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Title and Description */}
            <motion.div
              className="absolute bottom-6 md:bottom-8 left-0 right-0 text-center z-[60] px-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                {selected.title}
              </h3>
              <p className="text-orange-200 text-base md:text-lg">{selected.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}