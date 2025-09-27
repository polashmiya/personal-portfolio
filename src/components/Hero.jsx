import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaArrowDown, FaCode, FaLaptopCode, FaMobileAlt } from 'react-icons/fa';
import profileImage from '../assets/profile.jpg';
import React, { useState } from "react";
import ResumeModal from "./ResumeModal";
import { heroSectionInfo } from '../dummyData';

const Hero = () => {
  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const [resumeOpen, setResumeOpen] = useState(false);
  const openResume = () => setResumeOpen(true);
  const closeResume = () => setResumeOpen(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-hero-pattern bg-white dark:bg-dark-900 pt-20 overflow-hidden">
      {/* Background Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-radial from-primary-50/50 dark:from-dark-800/60 to-transparent opacity-70"></div>
      
      {/* Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.07, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-primary-500 rounded-full filter blur-xl"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-secondary-500 rounded-full filter blur-xl"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.07, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
          className="absolute top-1/3 -right-20 w-64 h-64 bg-accent-500 rounded-full filter blur-xl"
        />

        {/* Floating Icons */}
        <motion.div 
          className="absolute top-1/4 left-[10%] text-primary-300"
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <FaCode size={40} className="opacity-40" />
        </motion.div>
        <motion.div 
          className="absolute bottom-1/4 right-[10%] text-secondary-300"
          animate={{ y: [0, -25, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
        >
          <FaLaptopCode size={50} className="opacity-40" />
        </motion.div>
        <motion.div 
          className="absolute top-1/2 right-[20%] text-accent-300"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
        >
          <FaMobileAlt size={30} className="opacity-40" />
        </motion.div>
      </div>

  <div className="container-custom px-4 z-10 flex flex-col lg:flex-row items-center justify-between">
        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-1 glass-effect rounded-full border border-primary-100 dark:border-dark-700 shadow-md mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 font-semibold">
              {heroSectionInfo?.designation} @ {heroSectionInfo?.company}
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-7xl font-bold font-serif mb-6 leading-tight text-dark-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {heroSectionInfo?.name}
          </motion.h1>
          
          <motion.p 
            className="text-lg text-dark-600 dark:text-gray-200 mb-8 max-w-xl lg:mx-0 mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {heroSectionInfo?.description}
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact" 
              className="btn btn-primary dark:bg-primary-600 dark:text-white"
            >
              Let's Work Together
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="btn btn-secondary dark:bg-dark-800 dark:text-primary-300 dark:border-primary-600"
            >
              View My Work
            </motion.a>
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="btn btn-secondary"
              onClick={openResume}
            >
              Resume
            </motion.button> */}
  {/* Resume Modal */}
  <ResumeModal isOpen={resumeOpen} onClose={closeResume} />
          </motion.div>
          
          <motion.div
            className="flex justify-center lg:justify-start space-x-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <motion.a
              whileHover={{ y: -5, color: '#171515' }}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-500 dark:text-gray-300 transition-colors text-2xl hover:text-primary-600 dark:hover:text-primary-400"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              whileHover={{ y: -5, color: '#0077b5' }}
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-500 transition-colors text-2xl hover:text-primary-600"
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              whileHover={{ y: -5, color: '#e4405f' }}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-500 transition-colors text-2xl hover:text-primary-600"
            >
              <FaInstagram />
            </motion.a>
          </motion.div>
        </motion.div>
        
        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex justify-center lg:justify-end"
        >          <div className="relative">
            {/* Glowing background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full blur-xl opacity-30 scale-110 animate-pulse"></div>
            
            <motion.div
              className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white dark:border-dark-700 shadow-2xl"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src={profileImage} 
                alt="Portfolio Profile" 
                className="w-full h-full object-cover filter brightness-110 contrast-110"
              />
              
              {/* Overlay gradient for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 dark:to-dark-900/10"></div>
            </motion.div>
            
            {/* Decorative Elements */}
            <motion.div 
              className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <motion.div 
                className="w-full h-full rounded-full flex items-center justify-center"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <span className="text-sm">React</span>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <motion.div 
                className="w-full h-full rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <span className="text-sm">Node</span>
              </motion.div>
            </motion.div>
            
            {/* New tech badge */}
            <motion.div 
              className="absolute top-1/2 -right-8 w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ 
                scale: { delay: 1, duration: 0.6 },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" } 
              }}
            >
              <span className="text-xs">Asp .NET</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.button
          onClick={scrollToAbout}
          className="flex flex-col items-center text-dark-500 hover:text-primary-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-sm font-medium mb-2">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <FaArrowDown />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
