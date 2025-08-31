import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb } from 'react-icons/fa';

const GlowToggle = ({ isActive, toggleEffect }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.button
      className="fixed left-6 bottom-6 p-3 rounded-full bg-primary-600/80 text-white shadow-lg z-50 transition-all duration-300 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      onClick={toggleEffect}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={isActive ? "Disable glow cursor effect" : "Enable glow cursor effect"}
      aria-label={isActive ? "Disable glow cursor effect" : "Enable glow cursor effect"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isActive 
          ? '0 0 15px 5px rgba(59, 130, 246, 0.3), 0 4px 6px rgba(0, 0, 0, 0.1)' 
          : '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="relative">
        <FaLightbulb 
          className={`text-xl ${isActive ? 'animate-pulse' : ''}`} 
          style={{ 
            filter: isActive ? 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.7))' : 'none',
            transition: 'all 0.3s ease',
            color: isActive ? '#FFDD33' : 'white'
          }} 
        />
        
        {/* Small glow animation when hovered */}
        {isHovered && (
          <motion.div 
            className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-full bg-primary-400/20"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        )}
      </div>
    </motion.button>
  );
};

export default GlowToggle;
