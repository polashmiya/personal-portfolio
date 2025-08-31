import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GlowEffect from './components/GlowEffect';
import GlowToggle from './components/GlowToggle';
import './custom.css';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showGlowEffect, setShowGlowEffect] = useState(true); // Enabled by default

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Check for dark mode preference
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (userPrefersDark) {
      document.documentElement.classList.add('dark');
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="App min-h-screen bg-white dark:bg-dark-900 transition-colors duration-300">
      {showGlowEffect && <GlowEffect />}
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      
      {/* Glow effect toggle button */}
      <GlowToggle 
        isActive={showGlowEffect} 
        toggleEffect={() => setShowGlowEffect(!showGlowEffect)} 
      />
      
      {/* Glow effect tooltip - appears when the effect is first enabled */}
      {showGlowEffect && (
        <div 
          className="fixed right-6 bottom-28 p-3 bg-white/90 dark:bg-dark-800/90 text-primary-700 dark:text-primary-300 rounded-lg shadow-lg z-50 max-w-xs backdrop-blur-sm animate-fade-in-up"
          style={{
            animation: 'fadeIn 0.5s ease-out forwards, fadeOut 0.5s ease-in forwards 5s',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}
        >
          <p className="text-sm font-medium">
            ✨ Glow effect enabled! Move your cursor to see the colorful glow following your mouse.
          </p>
        </div>
      )}
      
      {/* Scroll to top button */}
      <button
        className={`fixed right-6 bottom-6 p-3 rounded-full bg-primary-600 text-white shadow-lg z-50 transition-all duration-300 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>
    </div>
  );
}

export default App;
