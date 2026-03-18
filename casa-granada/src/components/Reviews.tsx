import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const reviews = [
  {
    id: '1',
    author: 'Andrea & Migz Santos',
    location: 'Makati City',
    rating: 5,
    text: "Casa Granada exceeded every expectation. The infinity pool at sunset was absolutely surreal — we didn't want to leave. The house is pristine, the garden is lush, and the whole place felt like a five-star resort. Already planning our return trip!",
    date: 'December 2024',
    avatar: 'AS',
    occasion: 'Anniversary Getaway',
  },
  {
    id: '2',
    author: 'The Reyes Family',
    location: 'Quezon City',
    rating: 5,
    text: "We booked Casa Granada for our family reunion and it was the best decision we made. The villa easily accommodated all 18 of us! The outdoor kitchen was a hit, and the kids loved the pool. The property is immaculate and the hosts were super responsive.",
    date: 'November 2024',
    avatar: 'RF',
    occasion: 'Family Reunion',
  },
  {
    id: '3',
    author: 'Marco Villanueva',
    location: 'BGC, Taguig',
    rating: 5,
    text: "Our barkada trip here was legendary. The bonfire area, the jacuzzi at night, the outdoor BBQ — everything was perfect. Honestly rivals some Bali villas we've been to, and it's only 2 hours from Manila. Incredible value for the experience.",
    date: 'October 2024',
    avatar: 'MV',
    occasion: 'Barkada Weekend',
  },
  {
    id: '4',
    author: 'Sophia Lim-Cruz',
    location: 'Alabang',
    rating: 5,
    text: "We hosted a small intimate wedding celebration at Casa Granada and it was magical. The tropical garden was a perfect backdrop, the pool area was stunning for photos, and the whole villa had such an elegant yet relaxed feel. 10/10 would highly recommend.",
    date: 'January 2025',
    avatar: 'SL',
    occasion: 'Wedding Celebration',
  },
  {
    id: '5',
    author: 'Team Pixel Creative',
    location: 'Mandaluyong',
    rating: 5,
    text: "We used Casa Granada for our company offsite and it was transformative. Having a private space to brainstorm away from the city, with that view and the pool breaks — our team's creativity went through the roof. Perfect for work and play.",
    date: 'February 2025',
    avatar: 'TP',
    occasion: 'Corporate Retreat',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent(c => (c + 1) % reviews.length);

  const visibleCount = 3;
  const visibleReviews = Array.from({ length: visibleCount }, (_, i) =>
    reviews[(current + i) % reviews.length]
  );

  return (
    <section id="reviews" className="section-padding bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="luxury-divider mb-4">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-emerald-600">Guest Stories</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Words from Our
            <span className="text-emerald-700 italic"> Happy Guests</span>
          </h2>

          {/* Overall rating */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-display text-2xl font-bold text-gray-900">5.0</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-500 text-sm">{reviews.length}+ reviews</span>
          </div>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {visibleReviews.map((review, i) => (
            <motion.div
              key={`${review.id}-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-gray-50 rounded-3xl p-6 border border-gray-100 relative overflow-hidden"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-emerald-100 absolute top-4 right-4" />

              {/* Occasion badge */}
              <div className="inline-flex px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-xs font-medium text-emerald-700 mb-4">
                {review.occasion}
              </div>

              <StarRating rating={review.rating} />
              <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-5">
                "{review.text}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {review.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{review.author}</div>
                  <div className="text-gray-400 text-xs">{review.location} · {review.date}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="p-3 rounded-full border border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-emerald-700 w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-3 rounded-full border border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
