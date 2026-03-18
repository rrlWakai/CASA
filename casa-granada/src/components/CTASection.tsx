import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative overflow-hidden py-24 px-4">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1800&q=85&auto=format&fit=crop"
          alt="Villa background"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-emerald-800/80 to-black/70" />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/80 text-sm font-medium tracking-wide">Limited dates available</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
            Don't Just Dream
            <span className="block text-emerald-300 italic">of Paradise</span>
          </h2>

          <p className="text-white/70 text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Secure your exclusive stay at Casa Granada before your dates are taken. Direct bookings get priority confirmation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-white text-emerald-800 font-bold text-lg rounded-2xl hover:bg-emerald-50 transition-colors shadow-2xl flex items-center justify-center gap-2"
            >
              Reserve Your Dates
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.a
              href="tel:+639XXXXXXXXX"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-2xl border border-white/20 backdrop-blur-sm transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </motion.a>
          </div>

          <p className="text-white/40 text-sm mt-8">
            No booking fees · Direct reservation · Instant response
          </p>
        </motion.div>
      </div>
    </section>
  );
}
