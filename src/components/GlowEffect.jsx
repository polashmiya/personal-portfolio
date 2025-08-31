import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const GlowEffect = () => {  // Initialize with negative values to prevent effect from showing before first mouse move
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isActive, setIsActive] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [isOverInteractive, setIsOverInteractive] = useState(false);
  const timeoutRef = useRef(null);
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {      // Only respond to genuine mouse movements, not synthetic events
      if (e.clientX > 0 && e.clientY > 0) {
        // Check if the mouse is over a button or an interactive element
        const targetElement = document.elementFromPoint(e.clientX, e.clientY);
        const isOverButton = targetElement?.closest('button, a, .btn-primary, .btn-container, [role="button"]');
        
        // Update state based on whether we're over an interactive element
        setIsOverInteractive(!!isOverButton);
        
        // Always update position but conditionally set active state
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsActive(!isOverButton);
        setHasMoved(true);
        
        // Clear previous timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        // If the mouse hasn't moved for a while, reduce the glow intensity
        timeoutRef.current = setTimeout(() => {
          setIsActive(false);
        }, 2000);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  // Don't render anything until first mouse movement
  if (!hasMoved) {
    return null;
  }
    return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" style={{ pointerEvents: 'none' }}>
      {/* Main combined glow effect */}
      <motion.div
        className="fixed rounded-full pointer-events-none z-40 mix-blend-screen"
        initial={{ opacity: 0 }}        animate={{
          x: mousePosition.x - 125,
          y: mousePosition.y - 125,
          opacity: isActive ? 0.85 : isOverInteractive ? 0.2 : 0,
          scale: isActive ? 1 : isOverInteractive ? 0.8 : 0.6,
        }}
        transition={{
          type: "tween", 
          ease: "linear",
          duration: 0.15
        }}
        style={{
          width: '250px',
          height: '250px',
          background: `
            radial-gradient(circle at center, 
              rgba(255, 160, 100, 0.8) 0%, 
              rgba(255, 140, 60, 0.6) 25%,
              rgba(80, 235, 100, 0.5) 50%, 
              rgba(40, 200, 80, 0.3) 75%, 
              transparent 100%)
          `,
          filter: 'blur(15px)',
          pointerEvents: 'none',
        }}
      />
      
      {/* Inner orange/pink glow */}
      <motion.div
        className="fixed rounded-full pointer-events-none z-41 mix-blend-screen"
        initial={{ opacity: 0 }}        animate={{
          x: mousePosition.x - 60,
          y: mousePosition.y - 60,
          opacity: isActive ? 0.85 : isOverInteractive ? 0.3 : 0,
          scale: isActive ? 1 : isOverInteractive ? 0.8 : 0.6,
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0.1
        }}
        style={{
          width: '120px',
          height: '120px',
          background: `
            radial-gradient(circle at center, 
              rgba(255, 140, 80, 0.9) 0%, 
              rgba(255, 110, 60, 0.7) 50%, 
              rgba(255, 100, 50, 0.4) 80%,
              transparent 100%)
          `,
          filter: 'blur(8px)',
        }}
      />
      
      {/* Outer green glow */}
      <motion.div
        className="fixed rounded-full pointer-events-none z-39 mix-blend-screen"
        initial={{ opacity: 0 }}        animate={{
          x: mousePosition.x - 175,
          y: mousePosition.y - 175,
          opacity: isActive ? 0.55 : isOverInteractive ? 0.15 : 0,
          scale: isActive ? 1 : isOverInteractive ? 0.9 : 0.6,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          duration: 0.2
        }}
        style={{
          width: '350px',
          height: '350px',
          background: `
            radial-gradient(circle at center, 
              rgba(100, 230, 120, 0.01) 0%,
              rgba(80, 220, 100, 0.2) 30%,
              rgba(60, 210, 80, 0.3) 60%, 
              rgba(40, 190, 60, 0.1) 80%,
              transparent 100%)
          `,
          filter: 'blur(18px)',
        }}
      />
    </div>
  );
};

export default GlowEffect;
