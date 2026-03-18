import { motion } from 'framer-motion';
import { ChevronDown, MapPin, Star } from 'lucide-react';

export default function Hero() {
  const scrollToBooking = () => {
    document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=2000&q=90&auto=format&fit=crop"
          alt="Casa Granada Infinity Pool"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      </div>

      {/* Floating ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/40"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.7,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 mb-6"
        >
          <MapPin className="w-3.5 h-3.5 text-emerald-300" />
          <span className="text-white/90 text-sm font-medium tracking-wide">Sto. Tomas, Batangas, Philippines</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-semibold leading-[1.1] max-w-4xl mb-4"
        >
          Your Private
          <span className="block italic text-emerald-300">Tropical Escape</span>
          in Batangas
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-white/80 text-lg md:text-xl max-w-xl mb-3 font-light"
        >
          An exclusive villa sanctuary where lush nature meets refined luxury
        </motion.p>

        {/* Rating */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="flex items-center gap-2 mb-10"
        >
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-sand-400 text-sand-400" style={{ color: '#c09a52', fill: '#c09a52' }} />
            ))}
          </div>
          <span className="text-white/70 text-sm">Rated 5.0 by guests</span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToBooking}
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-lg rounded-2xl shadow-2xl shadow-emerald-900/40 transition-colors"
          >
            Book Your Stay
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white/15 hover:bg-white/25 text-white font-semibold text-lg rounded-2xl backdrop-blur-md border border-white/25 transition-colors"
          >
            Explore Villa
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex gap-8 mt-12 sm:mt-16 text-center"
        >
          {[
            { value: '20+', label: 'Guests Max' },
            { value: '5★', label: 'Rating' },
            { value: '2hr', label: 'From Manila' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-2xl font-semibold text-white">{stat.value}</div>
              <div className="text-white/60 text-xs tracking-widest uppercase mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
