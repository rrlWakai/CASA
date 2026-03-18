import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import BookingForm from './BookingForm';
import InquiryForm from './InquiryForm';
import { CalendarDays, MessageCircle } from 'lucide-react';

export default function BookingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeTab, setActiveTab] = useState<'booking' | 'inquiry'>('booking');

  return (
    <section id="booking" className="section-padding" style={{ background: '#f8fffe' }} ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="luxury-divider mb-4">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-emerald-600">Reservations</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Book Your
            <span className="text-emerald-700 italic"> Escape</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Fill out the form below to reserve your dates or send us a message. We respond within 24 hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-luxury overflow-hidden border border-gray-100"
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('booking')}
              className={`flex-1 flex items-center justify-center gap-2.5 py-5 text-sm font-semibold transition-all ${
                activeTab === 'booking'
                  ? 'text-emerald-700 border-b-2 border-emerald-700 bg-emerald-50/50'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              Book a Stay
            </button>
            <button
              onClick={() => setActiveTab('inquiry')}
              className={`flex-1 flex items-center justify-center gap-2.5 py-5 text-sm font-semibold transition-all ${
                activeTab === 'inquiry'
                  ? 'text-emerald-700 border-b-2 border-emerald-700 bg-emerald-50/50'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              Send Inquiry
            </button>
          </div>

          {/* Form content */}
          <div className="p-8 md:p-10">
            {activeTab === 'booking' ? <BookingForm /> : <InquiryForm />}
          </div>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-400"
        >
          {['✅ No booking fees', '🔒 Secure & private', '📞 24hr response', '🌴 Direct confirmation'].map(item => (
            <span key={item}>{item}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
