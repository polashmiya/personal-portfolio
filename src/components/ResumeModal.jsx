import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import Resume from "./Resume";
// Import html2pdf.js via CDN for simplicity
// You can also install via npm: npm install html2pdf.js

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
};

const modalVariants = {
  hidden: { y: "-50px", opacity: 0, scale: 0.95 },
  visible: { y: 0, opacity: 1, scale: 1 }
};

const ResumeModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
        style={{ top: '64px' }} // Offset for fixed navbar (adjust if navbar height changes)
        onClick={onClose}
      >
        <motion.div
          className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-4 overflow-y-auto max-h-[90vh] border border-gray-200"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalVariants}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-primary-600 text-xl focus:outline-none"
            aria-label="Close Resume Modal"
          >
            <FaTimes />
          </button>
          {/* PDF-like Header */}
          <div className="bg-gradient-to-r from-primary-100 to-primary-50 px-8 py-4 rounded-t-xl border-b border-gray-200 flex items-center justify-between">
            <span className="text-lg font-semibold text-primary-700">Resume</span>
            <button
              onClick={() => {
                const element = document.getElementById('resume-pdf-content');
                // Remove padding and background for PDF
                const oldClass = element.className;
                element.className = 'pdf-export';
                import('html2pdf.js').then(html2pdf => {
                  html2pdf.default().from(element).set({
                    margin: 0,
                    filename: 'Polash_Miya_Resume.pdf',
                    html2canvas: { scale: 2, backgroundColor: '#fff' },
                    jsPDF: { orientation: 'portrait', unit: 'in', format: 'a4' }
                  }).save().then(() => {
                    element.className = oldClass;
                  });
                });
              }}
              className="ml-4 px-3 mr-2 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 text-sm font-medium shadow"
            >
              Download PDF
            </button>
          </div>
          {/* Resume Content */}
          <div className="p-6 bg-gray-50" id="resume-pdf-content">
            <Resume pdfMode={false} />
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ResumeModal;
