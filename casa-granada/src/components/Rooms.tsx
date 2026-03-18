import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, BedDouble, Bath, Maximize, Check } from 'lucide-react';

const rooms = [
  {
    id: 'master',
    name: 'Master Suite',
    tagline: 'The Ultimate Retreat',
    description: 'The crown jewel of Casa Granada — a spacious master suite with en-suite bath, king bed, and private balcony overlooking the infinity pool.',
    capacity: 2,
    beds: '1 King Bed',
    baths: '1 En-suite',
    size: '45 sqm',
    image: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80&auto=format&fit=crop',
    features: ['Private balcony', 'King-size bed', 'En-suite rainfall shower', 'Smart TV', 'Mini bar', 'Air conditioning'],
    accent: 'bg-emerald-700',
  },
  {
    id: 'deluxe',
    name: 'Deluxe Room 1',
    tagline: 'Garden View Comfort',
    description: 'A well-appointed room with queen bed and garden views — ideal for couples or close friends seeking comfort and style.',
    capacity: 2,
    beds: '1 Queen Bed',
    baths: '1 Shared',
    size: '30 sqm',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80&auto=format&fit=crop',
    features: ['Garden view', 'Queen-size bed', 'Wardrobe & storage', 'Smart TV', 'Air conditioning', 'Reading nook'],
    accent: 'bg-teal-700',
  },
  {
    id: 'twin',
    name: 'Twin Bunk Room',
    tagline: 'For the Whole Squad',
    description: 'Spacious bunk-style room perfect for kids or a group of friends. Fun, functional, and fully air-conditioned.',
    capacity: 4,
    beds: '2 Bunk Beds (4 singles)',
    baths: '1 Shared',
    size: '35 sqm',
    image: 'https://images.unsplash.com/photo-1630699144867-37acec97df5a?w=800&q=80&auto=format&fit=crop',
    features: ['4 single bunks', 'Personal storage per bunk', 'Overhead lighting', 'Air conditioning', 'Charging stations', 'Blackout curtains'],
    accent: 'bg-amber-600',
  },
  {
    id: 'loft',
    name: 'Loft Room',
    tagline: 'Elevated Living',
    description: 'An airy second-floor loft with sweeping views over the garden and pool — a private perch for those who love light and open spaces.',
    capacity: 3,
    beds: '1 Queen + 1 Single',
    baths: '1 Shared',
    size: '40 sqm',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80&auto=format&fit=crop',
    features: ['Panoramic windows', 'Open loft layout', 'Queen + single bed', 'Private seating area', 'Air conditioning', 'Pool & garden view'],
    accent: 'bg-blue-700',
  },
];

export default function Rooms() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="rooms" className="section-padding" style={{ background: '#f8fffe' }} ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="luxury-divider mb-4">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-emerald-600">Accommodations</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Rest in
            <span className="text-emerald-700 italic"> Refined Comfort</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Four beautifully designed rooms that can accommodate up to 20 guests in total, perfect for families and barkadas alike.
          </p>
        </motion.div>

        {/* Room cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {rooms.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-400 border border-gray-100"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {/* Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1.5 ${room.accent} text-white text-xs font-semibold tracking-wider uppercase rounded-full`}>
                  {room.tagline}
                </div>
                {/* Capacity */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Users className="w-3.5 h-3.5 text-white" />
                  <span className="text-white text-xs font-medium">Up to {room.capacity} guests</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-gray-900 mb-2">{room.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{room.description}</p>

                {/* Room specs */}
                <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <BedDouble className="w-4 h-4 text-emerald-600" />
                    <span>{room.beds}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Bath className="w-4 h-4 text-emerald-600" />
                    <span>{room.baths}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Maximize className="w-4 h-4 text-emerald-600" />
                    <span>{room.size}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-y-2">
                  {room.features.map(feat => (
                    <div key={feat} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-emerald-700" />
                      </div>
                      <span className="text-gray-600 text-xs">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total capacity banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 rounded-3xl bg-emerald-700 text-white text-center"
        >
          <p className="font-display text-2xl font-semibold mb-1">Casa Granada sleeps up to <span className="text-emerald-200">20 guests</span></p>
          <p className="text-emerald-200/80 text-sm">Perfect for family reunions, barkada weekends, corporate retreats, and milestone celebrations.</p>
        </motion.div>
      </div>
    </section>
  );
}
