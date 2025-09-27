import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaLaptopCode, FaSun, FaMoon } from 'react-icons/fa';
import TalkButton from './TalkButton';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Default to normal (light) mode
    setIsDarkMode(false);
    updateTheme(false);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateTheme = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
    updateTheme(!isDarkMode);
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-visible isolate header-wrapper ${
        isScrolled 
          ? 'bg-white/95 dark:bg-dark-900/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`bg-gradient-to-r from-primary-600 to-primary-700 text-white p-2 rounded-lg shadow-md transition-all duration-300 ${isScrolled ? 'scale-90' : ''}`}>
              <FaLaptopCode size={24} />
            </div>
            <div className={`text-2xl font-bold font-serif transition-all duration-300 ${isScrolled ? 'text-xl' : 'text-2xl'}`}>
              <span className="text-dark-900 dark:text-white">Md.</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-500">POLASH</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.li 
                    key={item.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className={`relative text-lg font-medium ${
                        isActive 
                          ? 'text-primary-600 dark:text-primary-400' 
                          : 'text-dark-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                      } transition-colors duration-200`}
                    >
                      {item.name}
                      {isActive && (
                        <motion.span
                          layoutId="navIndicator"
                          className="absolute bottom-[-5px] left-0 right-0 h-[3px] bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </div>          {/* Theme Toggle & Contact Button (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors duration-200"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </motion.button>
            <div className="flex-shrink-0 isolate relative z-10">
              <TalkButton 
                onClick={() => scrollToSection('#contact')}
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors duration-200"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-800/40 transition-colors duration-200 shadow-sm"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </motion.button>
          </div>        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, x: 100 }}
              animate={{ opacity: 1, height: 'auto', x: 0 }}
              exit={{ opacity: 0, height: 0, x: 100 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-full right-4 mt-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden min-w-[200px] z-50"
            >
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
                className="py-2"
              >                {navItems.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <motion.li 
                      key={item.name}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <button
                        onClick={() => scrollToSection(item.href)}
                        className={`block w-full text-left px-4 py-3 ${
                          isActive 
                            ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                            : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                        } transition-colors duration-200`}
                      >
                        {item.name}
                      </button>
                    </motion.li>
                  );
                })}
                <motion.li
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="mt-2 px-4 pb-4"
                >                  <button
                    onClick={() => scrollToSection('#contact')}
                    className="w-full btn-primary text-sm py-2 relative overflow-hidden isolation-auto"
                  >
                    Let's Talk
                  </button>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
