import { motion } from "framer-motion";
import {
  Leaf,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Heart,
} from "lucide-react";

const navLinks = ["About", "Amenities", "Gallery", "Rooms", "Reviews"];
const sectionIds = ["#about", "#amenities", "#gallery", "#rooms", "#reviews"];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.footer
      id="contact"
      className="bg-gray-950 text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-xl bg-emerald-700">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display text-xl font-semibold block">
                  Casa Granada
                </span>
                <span className="text-emerald-400 text-xs tracking-widest uppercase">
                  Private Villa · Batangas
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              A private luxury villa retreat in the heart of Sto. Tomas,
              Batangas. Where nature, privacy, and refined comfort meet.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com/casagranada"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-700/30 border border-white/10 flex items-center justify-center transition-colors group"
              >
                <Instagram className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors" />
              </a>
              <a
                href="https://www.facebook.com/casagranadabatangas"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-700/30 border border-white/10 flex items-center justify-center transition-colors group"
              >
                <Facebook className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm tracking-widest uppercase text-gray-300 mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link, i) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(sectionIds[i])}
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-emerald-500 group-hover:w-3 transition-all duration-300" />
                    {link}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => scrollTo("#booking")}
                  className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors font-medium"
                >
                  Book Now →
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm tracking-widest uppercase text-gray-300 mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  Sto. Tomas, Batangas
                  <br />
                  Philippines
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <a
                  href="tel:+639XXXXXXXXX"
                  className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                >
                  +63 9XX XXX XXXX
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <a
                  href="mailto:hello@casagranada.ph"
                  className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                >
                  hello@casagranada.ph
                </a>
              </li>
            </ul>

            {/* Directions */}
            <a
              href="https://maps.google.com/?q=Sto+Tomas+Batangas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-xl bg-emerald-700/20 border border-emerald-700/30 text-emerald-400 text-xs font-medium hover:bg-emerald-700/30 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              Get Directions
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Casa Granada. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs flex items-center gap-1.5">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> in
            the Philippines
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
