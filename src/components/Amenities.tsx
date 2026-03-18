import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Waves,
  Wind,
  Trees,
  Flame,
  ChefHat,
  Car,
  Wifi,
  Music,
  Dumbbell,
  Coffee,
} from "lucide-react";

const amenities = [
  {
    icon: Waves,
    name: "Infinity Pool",
    description:
      "Stunning horizon-edge pool with mountain views — perfect for sunset dips.",
    color: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-600",
  },
  {
    icon: Wind,
    name: "Private Jacuzzi",
    description: "Relax in our heated jacuzzi under the stars, day or night.",
    color: "bg-purple-50 border-purple-100",
    iconBg: "bg-purple-600",
  },
  {
    icon: Trees,
    name: "Tropical Garden",
    description:
      "Lush landscaped gardens with native flora and shaded lounging areas.",
    color: "bg-emerald-50 border-emerald-100",
    iconBg: "bg-emerald-700",
  },
  {
    icon: Flame,
    name: "Bonfire Area",
    description:
      "Dedicated fire pit area for evening gatherings and starlit conversations.",
    color: "bg-orange-50 border-orange-100",
    iconBg: "bg-orange-500",
  },
  {
    icon: ChefHat,
    name: "Outdoor Kitchen",
    description:
      "Fully equipped al fresco kitchen with grill, prep space, and dining area.",
    color: "bg-amber-50 border-amber-100",
    iconBg: "bg-amber-600",
  },
  {
    icon: Car,
    name: "Private Parking",
    description:
      "Secure, gated parking for multiple vehicles within the property.",
    color: "bg-gray-50 border-gray-200",
    iconBg: "bg-gray-700",
  },
  {
    icon: Wifi,
    name: "High-Speed WiFi",
    description:
      "Fiber-grade internet throughout the property for seamless connectivity.",
    color: "bg-sky-50 border-sky-100",
    iconBg: "bg-sky-600",
  },
  {
    icon: Music,
    name: "Sound System",
    description:
      "Premium Bluetooth speakers indoors and by the pool for your playlist.",
    color: "bg-pink-50 border-pink-100",
    iconBg: "bg-pink-500",
  },
  {
    icon: Coffee,
    name: "Fully Stocked Kitchen",
    description:
      "Modern appliances, cookware, and a coffee station ready for your use.",
    color: "bg-yellow-50 border-yellow-100",
    iconBg: "bg-yellow-600",
  },
  {
    icon: Dumbbell,
    name: "Recreation Area",
    description:
      "Open space for games, yoga, or casual sports with the whole group.",
    color: "bg-teal-50 border-teal-100",
    iconBg: "bg-teal-600",
  },
];

export default function Amenities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="amenities"
      className="section-padding bg-sand-50"
      style={{ background: "#fdfaf5" }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="luxury-divider mb-4">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-emerald-600">
              What's Included
            </span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Everything You Need,
            <span className="block text-emerald-700 italic">
              Nothing You Don't
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Casa Granada is equipped with all the amenities for the perfect
            private retreat — from sunrise swims to bonfire nights.
          </p>
        </motion.div>

        {/* Featured amenity banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative rounded-3xl overflow-hidden mb-12 h-64 md:h-80"
        >
          <img
            src="/images/pool.jpg"
            alt="Infinity Pool"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8 md:px-16">
            <div>
              <div className="text-emerald-300 text-sm font-semibold tracking-widest uppercase mb-2">
                Featured
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-semibold text-white mb-2">
                Infinity Pool
              </h3>
              <p className="text-white/70 max-w-sm">
                Overlooking the lush Batangas landscape — our centerpiece pool
                is made for golden-hour moments.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Amenities grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {amenities.map((amenity, i) => (
            <motion.div
              key={amenity.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`p-5 rounded-2xl border card-lift ${amenity.color} cursor-default`}
            >
              <div
                className={`w-10 h-10 rounded-xl ${amenity.iconBg} flex items-center justify-center mb-3 shadow-sm`}
              >
                <amenity.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">
                {amenity.name}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                {amenity.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
