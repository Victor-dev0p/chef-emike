"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const [shuffledImages, setShuffledImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);

  // Gallery items with both images and videos
  const galleryItems = [
    { type: "image", src: "/gallery/gal1.jpg", title: "Nautical Wedding Cake", description: "Elegant maritime-inspired design", height: 300 },
    { type: "image", src: "/gallery/gal.jpg", title: "Classic White Tiered", description: "Timeless sophistication", height: 200 },
    { type: "image", src: "/gallery/gal2.jpg", title: "Rustic Naked Cake", description: "Natural beauty with fresh florals", height: 250 },
    { type: "video", src: "/gallery/galv.mp4", thumbnail: "/gallery/gal3.jpg", title: "Cooking Process", description: "Watch the magic happen", height: 320 },
    { type: "image", src: "/gallery/gal3.jpg", title: "Anchor Theme Design", description: "Nautical charm and elegance", height: 220 },
    { type: "image", src: "/gallery/gal4.jpg", title: "Outdoor Naked Cake", description: "Perfect for garden celebrations", height: 200 },
    { type: "video", src: "/gallery/galvi.mp4", thumbnail: "/gallery/fish.jpg", title: "Plating Technique", description: "Culinary artistry in action", height: 350 },
    { type: "image", src: "/gallery/pan.jpg", title: "Rustic Display Setup", description: "Beautifully styled presentation", height: 350 },
    { type: "image", src: "/gallery/galbean.jpg", title: "Simple White Elegance", description: "Pure and minimalist design", height: 240 },
    { type: "image", src: "/gallery/creamy.jpg", title: "Minimalist Wedding", description: "Clean lines and sophistication", height: 190 },
    { type: "image", src: "/gallery/sereren.jpg", title: "Floral Buttercream", description: "Delicate buttercream artistry", height: 310 },
    { type: "image", src: "/gallery/galspagb.jpg", title: "Berry Topped Cake", description: "Fresh seasonal berries", height: 230 },
    { type: "image", src: "/gallery/likemoi.jpg", title: "Berry Topped ", description: "Fresh seasonal berries", height: 200 },
    { type: "video", src: "/gallery/galvid.mp4", thumbnail: "/gallery/thumbnail.jpg", title: "Berry Topped CakE", description: "Fresh seasonal berries", height: 300 },
    { type: "image", src: "/gallery/riceshape.jpg", title: "Berry Topped C", description: "Fresh seasonal berries", height: 280 },
  ];

  useEffect(() => {
    const shuffled = [...galleryItems].sort(() => Math.random() - 0.5);
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
      {/* GALLERY HEADER */}
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

        {/* MASONRY GRID */}
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
                {/* Display image or video thumbnail */}
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Play Icon for Videos */}
                    <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/30 transition-colors duration-300">
                      <div className="bg-orange-500 hover:bg-orange-600 rounded-full p-3 transform group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 text-white fill-white" />
                      </div>
                    </div>
                  </>
                )}

                {/* Overlay with gradient and description */}
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
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:text-orange-500 text-3xl md:text-4xl font-light z-[60] transition-colors"
              onClick={closeModal}
            >
              ×
            </button>

            {/* Prev */}
            <button
              aria-label="Previous item"
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-orange-500/20 hover:bg-orange-500/40 text-white text-2xl md:text-3xl p-2 rounded-full z-[60] transition-all"
              onClick={handlePrev}
            >
              &larr;
            </button>

            {/* Next */}
            <button
              aria-label="Next item"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-orange-500/20 hover:bg-orange-500/40 text-white text-2xl md:text-3xl p-2 rounded-full z-[60] transition-all"
              onClick={handleNext}
            >
              &rarr;
            </button>

            {/* Display Image or Video */}
            <motion.div
              className="relative w-full max-w-5xl h-[70vh] md:h-[80vh] mx-auto px-4 md:px-20"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              key={currentIndex}
            >
              {selected.type === "image" ? (
                <img
                  src={selected.src}
                  alt={selected.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <video
                  src={selected.src}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              )}
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