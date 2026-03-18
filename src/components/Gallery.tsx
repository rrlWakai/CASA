import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const galleryImages = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80&auto=format&fit=crop",
    caption: "Infinity Pool at Dusk",
    category: "Pool",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80&auto=format&fit=crop",
    caption: "Master Bedroom Suite",
    category: "Rooms",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80&auto=format&fit=crop",
    caption: "Evening Pool Ambiance",
    category: "Pool",
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80&auto=format&fit=crop",
    caption: "Open Air Lounge",
    category: "Outdoor",
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80&auto=format&fit=crop",
    caption: "Jacuzzi Corner",
    category: "Pool",
  },
];

const categories = ["All", "Pool", "Outdoor", "Rooms"];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigate = (dir: "prev" | "next") => {
    if (lightboxIndex === null) return;
    const total = filtered.length;
    setLightboxIndex(
      dir === "prev"
        ? (lightboxIndex - 1 + total) % total
        : (lightboxIndex + 1) % total,
    );
  };

  return (
    <section id="gallery" className="section-padding bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="luxury-divider mb-4">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-emerald-600">
              Photo Gallery
            </span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            See It to
            <span className="text-emerald-700 italic"> Believe It</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-lg mx-auto mb-8">
            Every corner of Casa Granada tells a story of beauty, comfort, and
            nature's finest.
          </p>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-emerald-700 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Masonry grid */}
        <motion.div layout className="columns-2 md:columns-3 gap-4 space-y-0">
          {filtered.map((image, i) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="break-inside-avoid mb-4 group relative rounded-2xl overflow-hidden cursor-pointer shadow-card"
              onClick={() => openLightbox(i)}
            >
              <img
                src={image.url}
                alt={image.caption}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium">
                  {image.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-10"
              onClick={closeLightbox}
            >
              <X className="w-7 h-7" />
            </button>

            <button
              className="absolute left-4 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigate("prev");
              }}
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <button
              className="absolute right-4 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigate("next");
              }}
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-5xl w-full max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].url}
                alt={filtered[lightboxIndex].caption}
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
              <p className="text-center text-white/70 mt-3 text-sm">
                {filtered[lightboxIndex].caption} · {lightboxIndex + 1} /{" "}
                {filtered.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
