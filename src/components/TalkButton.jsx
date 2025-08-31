import { motion } from 'framer-motion';

const TalkButton = ({ onClick, className = "", fullWidth = false }) => {
  return (
    <div className="btn-container isolate">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`btn-primary text-sm px-6 py-2 relative overflow-hidden ${fullWidth ? 'w-full' : ''} ${className}`}
        onClick={onClick}
      >
        Let's Talk
      </motion.button>
    </div>
  );
};

export default TalkButton;
