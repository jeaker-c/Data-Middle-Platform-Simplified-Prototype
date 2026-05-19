import { useState } from 'react';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
      <HeroSection />
      <Footer />
    </div>
  );
}
