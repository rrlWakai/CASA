import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Amenities from '../components/Amenities';
import Gallery from '../components/Gallery';
import Rooms from '../components/Rooms';
import Reviews from '../components/Reviews';
import CTASection from '../components/CTASection';
import BookingSection from '../components/BookingSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Casa Granada | Private Luxury Villa in Sto. Tomas, Batangas</title>
        <meta name="description" content="Escape to Casa Granada, a fully private luxury villa in Sto. Tomas, Batangas. Featuring an infinity pool, jacuzzi, garden, bonfire area, and outdoor kitchen — perfect for families, barkadas, and corporate retreats." />
        <meta name="keywords" content="Casa Granada, luxury villa Batangas, private villa rental Philippines, villa with pool Batangas, Sto Tomas resort, exclusive villa Philippines" />
        <meta property="og:title" content="Casa Granada | Private Luxury Villa in Batangas" />
        <meta property="og:description" content="A fully private tropical villa retreat near Manila. Infinity pool, jacuzzi, garden, and more." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://casagranada.ph" />
      </Helmet>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Amenities />
        <Gallery />
        <Rooms />
        <Reviews />
        <CTASection />
        <BookingSection />
      </main>
      <Footer />
    </>
  );
}
