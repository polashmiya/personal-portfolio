import { motion } from 'framer-motion';
import {
  FaArrowUp,
  FaCode,
  FaEnvelope,
  FaGithub,
  FaHeart,
  FaLinkedin,
  FaMapMarkerAlt
} from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();
  
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];
  
  const socialLinks = [
    { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/md-polash-miya-726667193/', label: 'LinkedIn', color: 'hover:text-blue-500' },
    { icon: <FaGithub />, href: 'https://github.com/polashmiya', label: 'GitHub', color: 'hover:text-gray-300' }
  ];

  return (
  <footer className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-dark-900 dark:to-dark-950 text-white relative">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg width="100%" height="100%">
            <pattern id="footer-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" fill="white" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#footer-pattern)" />
          </svg>
        </div>
      </div>
      
      {/* Colored overlays for visual interest */}
  <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500 dark:bg-primary-900 filter blur-[150px] opacity-10 animate-blob"></div>
  <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-500 dark:bg-purple-900 filter blur-[150px] opacity-10 animate-blob animation-delay-4000"></div>
      
      {/* Back to top button */}
      <div className="container-custom px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 -top-6"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(59, 130, 246, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowUp />
          </motion.button>
        </motion.div>
      </div>
      
      {/* Footer content */}
      <div className="container-custom px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* About */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-white dark:text-primary-300 relative inline-block pb-2">
              Md. Polash
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: '3rem' }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute left-0 bottom-0 h-1 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
              ></motion.span>
            </h3>
            <p className="text-gray-300 dark:text-gray-400 text-sm">
              A passionate software engineer dedicated to creating elegant solutions to complex problems.
            </p>
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={`footer-social-${link.label}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center bg-gray-800 dark:bg-dark-800 text-gray-300 dark:text-primary-300 ${link.color} transition-all duration-300 hover:shadow-lg`}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-white dark:text-primary-300 relative inline-block pb-2">
              Quick Links
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: '3rem' }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute left-0 bottom-0 h-1 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
              ></motion.span>
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <motion.li 
                  key={`footer-nav-${link.name}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a 
                    href={link.href} 
                    className="text-gray-300 dark:text-primary-300 hover:text-primary-400 dark:hover:text-primary-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mr-2 transform scale-0 group-hover:scale-100 transition-all duration-300"></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-white dark:text-primary-300 relative inline-block pb-2">
              Contact
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: '3rem' }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute left-0 bottom-0 h-1 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
              ></motion.span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaEnvelope className="text-primary-400 mr-3 mt-1" />
                <div>
                  <p className="text-gray-300 dark:text-gray-400 text-sm">Email</p>
                  <a href="mailto:polashmiya2015@gmail.com" className="text-white dark:text-primary-300 hover:text-primary-400 dark:hover:text-primary-400 transition-colors duration-300">
                    polashmiya2015@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-primary-400 mr-3 mt-1" />
                <div>
                  <p className="text-gray-300 dark:text-gray-400 text-sm">Location</p>
                  <p className="text-white dark:text-primary-300">Dhaka , Bangladesh</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Newsletter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-white dark:text-primary-300 relative inline-block pb-2">
              Newsletter
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: '3rem' }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute left-0 bottom-0 h-1 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
              ></motion.span>
            </h3>
            <p className="text-gray-300 dark:text-gray-400 text-sm">
              Subscribe to my newsletter for the latest updates and articles.
            </p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-800 dark:bg-dark-800 text-white dark:text-primary-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                required
              />
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-700 dark:to-primary-500 text-white dark:text-primary-300 py-2 rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-medium"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>
        
        {/* Bottom Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 dark:border-dark-700 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex items-center mb-4 md:mb-0">
            <FaCode className="text-primary-400 dark:text-primary-300 mr-2" />
            <p className="text-gray-300 dark:text-primary-300 text-sm">
              &copy; {currentYear} Md. Polash Miya. All rights reserved.
            </p>
          </div>
          {/* <p className="text-gray-300 dark:text-primary-300 text-sm flex items-center">
            Made with <FaHeart className="text-red-500 mx-1 animate-pulse" />
          </p> */}
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
