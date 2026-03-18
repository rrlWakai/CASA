import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Rooms", href: "#rooms" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
    setActiveSection(href);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
            >
              {/* Logo Image */}
              <div
                className={`overflow-hidden rounded-xl transition-colors ${
                  isScrolled
                    ? "bg-white p-1.5 shadow-sm"
                    : "bg-white/20 backdrop-blur-sm p-1.5"
                }`}
              >
                <img
                  src="/images/logocasa.png" // 🔁 replace with actual logo path
                  alt="Casa Granada Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>

              {/* Text (optional: you can remove this if logo already has text) */}
              <div>
                <span
                  className={`font-display text-xl font-semibold tracking-wide block leading-none ${
                    isScrolled ? "text-emerald-900" : "text-white"
                  }`}
                >
                  Casa Granada
                </span>
                <span
                  className={`text-[10px] tracking-[0.2em] uppercase font-body font-medium ${
                    isScrolled ? "text-emerald-600" : "text-white/70"
                  }`}
                >
                  Private Villa · Batangas
                </span>
              </div>
            </motion.a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 ${
                    isScrolled
                      ? "text-gray-600 hover:text-emerald-700 hover:bg-emerald-50"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  } ${activeSection === link.href ? (isScrolled ? "text-emerald-700 bg-emerald-50" : "text-white bg-white/10") : ""}`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("#booking")}
                className="px-5 py-2.5 bg-emerald-700 text-white text-sm font-semibold rounded-xl hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-900/20"
              >
                Book Now
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"}`}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[70px] z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl lg:hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.href)}
                  className="w-full text-left px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="pt-2 pb-1">
                <button
                  onClick={() => scrollTo("#booking")}
                  className="w-full py-3 bg-emerald-700 text-white font-semibold rounded-xl hover:bg-emerald-800 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
