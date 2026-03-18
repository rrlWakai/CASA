import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, TreePine, Sparkles, Clock } from "lucide-react";

const highlights = [
  {
    icon: Shield,
    title: "Complete Privacy",
    desc: "Exclusively yours — no shared spaces, just your group and the lush surroundings.",
  },
  {
    icon: TreePine,
    title: "Immersed in Nature",
    desc: "Surrounded by tropical gardens with mountain views and fresh Batangas air.",
  },
  {
    icon: Sparkles,
    title: "Curated Luxury",
    desc: "Every detail crafted for comfort — premium linens, modern amenities, artful spaces.",
  },
  {
    icon: Clock,
    title: "2 Hours from Manila",
    desc: "Effortlessly close, yet a world away from the city's noise and rush.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Images collage */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-luxury">
              <img
                src="/images/featured.jpg"
                alt="Casa Granada Villa"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-card w-48"
            >
              <div className="text-3xl font-display font-bold text-emerald-700">
                4 km
              </div>
              <div className="text-gray-500 text-sm mt-1">
                from SLEX Sto. Tomas exit
              </div>
              <div
                className="w-8 h-0.5 bg-sand-400 mt-2"
                style={{ background: "#c09a52" }}
              />
            </motion.div>

            {/* Second image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="absolute -top-6 -left-6 w-36 h-36 rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&q=80&auto=format&fit=crop"
                alt="Pool view"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="luxury-divider mb-6">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-emerald-600">
                About Casa Granada
              </span>
            </div>

            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight mb-6">
              Where Every
              <em className="text-emerald-700 not-italic"> Moment</em> Becomes a
              Memory
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Nestled in the verdant hills of Sto. Tomas, Batangas, Casa Granada
              is a fully private luxury villa retreat designed for those who
              seek the extraordinary. Here, infinity pools merge with mountain
              horizons, and evenings glow under open skies.
            </p>

            <p className="text-gray-500 leading-relaxed mb-10">
              Whether you're celebrating a milestone, hosting an intimate
              gathering, or simply escaping the everyday — Casa Granada offers a
              sanctuary where nature, privacy, and refined comfort coexist
              beautifully.
            </p>

            {/* Highlights grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center mb-3">
                    <item.icon className="w-4.5 h-4.5 text-white" size={18} />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
