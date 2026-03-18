import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = '639XXXXXXXXX';
  const message = encodeURIComponent('Hi! I\'m interested in booking Casa Granada. Can you send me more details?');

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-luxury p-4 max-w-[220px] border border-gray-100"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <div className="font-semibold text-gray-900 text-sm">Casa Granada</div>
                <div className="text-emerald-500 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Typically replies in minutes
                </div>
              </div>
              <button onClick={() => setShowTooltip(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-500 text-xs mb-3">Chat with us to check availability, pricing, or ask any questions!</p>
            <a
              href={`https://wa.me/${phoneNumber}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-2.5 bg-[#25D366] text-white text-sm font-semibold rounded-xl hover:bg-[#22c55e] transition-colors"
            >
              Start Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowTooltip(prev => !prev)}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg whatsapp-pulse hover:bg-[#22c55e] transition-colors"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </motion.button>
    </div>
  );
}
