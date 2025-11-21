"use client";

import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX, Minus, Plus } from "lucide-react";

export default function SocialHandles({
  title = "Instagram",
  subtitle = "Follow us for more updates!",
  videoSrc = "/pizza.mp4",
  images = [],
  link = "#",
}) {
  const videoRef = useRef(null);
  const [volume, setVolume] = useState(0.5);

  // Fallback now supports *8 images*
  const fallbackImages = {
    instagram: [
      "/Chef.jpg",
      "/pizza.jpg",
      "/Dessert.jpg",
      "/soup.jpg",
      "/Chef.jpg",
      "/pizza.jpg",
      "/Dessert.jpg",
      "/soup.jpg",
    ],
    tiktok: [
      "/Chef.jpg",
      "/pizza.jpg",
      "/Dessert.jpg",
      "/soup.jpg",
      "/Chef.jpg",
      "/pizza.jpg",
      "/Dessert.jpg",
      "/soup.jpg",
    ],
    facebook: [
      "/Chef.jpg",
      "/pizza.jpg",
      "/Dessert.jpg",
      "/soup.jpg",
      "/Chef.jpg",
      "/pizza.jpg",
      "/Dessert.jpg",
      "/soup.jpg",
    ],
    default: [
      "/Chef.jpg",
      "/pizza.jpg",
      "/Dessert.jpg",
      "/soup.jpg",
      "/Chef.jpg",
      "/pizza.jpg",
      "/Dessert.jpg",
      "/soup.jpg",
    ],
  };

  const key = (title || "default").toLowerCase();
  const chosenImages =
    images && images.length >= 8 ? images : fallbackImages[key] || fallbackImages.default;

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.volume = volume;
    videoRef.current.muted = volume === 0;
  }, [volume]);

  const changeVolume = (delta) => {
    if (!videoRef.current) return;
    let newVol = Math.min(1, Math.max(0, Number((volume + delta).toFixed(2))));
    setVolume(newVol);
  };

  const toggleMute = () => {
    setVolume(volume === 0 ? 0.5 : 0);
  };

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: "#fffaf0" }}
      aria-labelledby={`social-${title}-heading`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 id={`social-${title}-heading`} className="text-4xl font-bold text-gray-900">
            {title}
          </h2>
          <p className="text-gray-700 mt-2">{subtitle}</p>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* LEFT 4 IMAGES (2x2 GRID) */}
          <div className="grid grid-cols-2 gap-6">
            {chosenImages.slice(0, 4).map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${title} image left-${i + 1}`}
                className="w-40 h-40 rounded-2xl object-cover shadow-lg ring-2 ring-yellow-400"
              />
            ))}
          </div>

          {/* VIDEO */}
          <div className="relative">
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              loop
              playsInline
              className="w-[320px] h-[420px] rounded-3xl shadow-2xl ring-4 ring-yellow-400 object-cover"
            />

            {/* VOLUME CONTROLS */}
            <div
              className="
                absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg border border-yellow-200
                px-4 py-2 flex items-center gap-3
                max-sm:px-2 max-sm:py-1 max-sm:gap-1.5
              "
            >
              <button onClick={() => changeVolume(-0.1)} className="p-1" type="button">
                <Minus className="text-yellow-600 max-sm:w-4 max-sm:h-4" />
              </button>

              <button onClick={toggleMute} className="p-1" type="button">
                {volume === 0 ? (
                  <VolumeX className="text-yellow-600 max-sm:w-4 max-sm:h-4" />
                ) : (
                  <Volume2 className="text-yellow-600 max-sm:w-4 max-sm:h-4" />
                )}
              </button>

              <button onClick={() => changeVolume(+0.1)} className="p-1" type="button">
                <Plus className="text-yellow-600 max-sm:w-4 max-sm:h-4" />
              </button>

              <div
                className="
                  w-36 h-2 bg-gray-200 rounded-full overflow-hidden ml-2
                  max-sm:w-20 max-sm:h-1.5 max-sm:ml-1
                "
              >
                <div
                  className="h-full bg-yellow-500 transition-all"
                  style={{ width: `${Math.round(volume * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT 4 IMAGES (2x2 GRID) */}
          <div className="grid grid-cols-2 gap-6">
            {chosenImages.slice(4, 8).map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${title} image right-${i + 1}`}
                className="w-40 h-40 rounded-2xl object-cover shadow-lg ring-2 ring-yellow-400"
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-full shadow-md transition"
          >
            Follow us on {title}
          </a>
        </div>
      </div>
    </section>
  );
}
