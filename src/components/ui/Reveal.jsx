import { motion } from 'framer-motion';
import { EASE } from '../../lib/motion';

/** Fades and lifts its children into place the first time they scroll on screen. */
export default function Reveal({ children, delay = 0, y = 16, className = '', as = 'div', ...rest }) {
  const Component = motion[as] ?? motion.div;
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
