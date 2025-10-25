import React, { useEffect, useRef } from "react";
/* eslint-disable no-unused-vars */
import * as fm from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaTimes, FaCheckCircle } from "react-icons/fa";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { y: -20, opacity: 0, scale: 0.98 },
  visible: { y: 0, opacity: 1, scale: 1 },
};

const ProjectModal = ({ isOpen, onClose, project }) => {
  const closeBtnRef = useRef(null);

  // Close on ESC and focus close button on open
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    // Focus close button for accessibility
    const t = setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      clearTimeout(t);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <fm.AnimatePresence>
      {isOpen && (
        <fm.motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onClick={onClose}
        >
          <fm.motion.dialog
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 my-8 md:my-10 h-[90vh] overflow-hidden border border-gray-200 flex flex-col"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            aria-labelledby="project-modal-title"
            open
          >
            {/* Header with image */}
            <div className="relative">
              {project.image && (
                <div className="h-56 md:h-72 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              {/* Close */}
              <button
                ref={closeBtnRef}
                onClick={onClose}
                className="absolute top-4 right-4 text-white/90 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white/70"
                aria-label="Close project details"
              >
                <FaTimes />
              </button>
              {/* Title and category */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {project.category && (
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white/90 text-primary-700 uppercase tracking-wide">
                      {project.category}
                    </span>
                  )}
                </div>
                <h3
                  id="project-modal-title"
                  className="text-white text-2xl md:text-3xl font-bold drop-shadow-sm"
                >
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-white">
              {/* Links */}
              <div className="flex flex-wrap gap-3 mb-5">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors shadow"
                  >
                    <FaGithub />
                    View Code
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow"
                  >
                    <FaExternalLinkAlt />
                    Live Demo
                  </a>
                )}
              </div>

              {/* Description */}
              {project.description && (
                <p className="text-gray-700 leading-relaxed mb-6">{project.description}</p>
              )}

              {/* Details list */}
              {Array.isArray(project.details) && project.details.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Key details</h4>
                  <ul className="space-y-2">
                    {project.details.map((item, idx) => (
                      <li key={`${project.id}-detail-${idx}`} className="flex items-start gap-3">
                        <FaCheckCircle className="mt-1 text-primary-600 flex-shrink-0" size={16} />
                        <span className="text-gray-700 leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech stack */}
              {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                <div className="mb-2">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={`${project.id}-${tech}`}
                        className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full border border-primary-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </fm.motion.dialog>
        </fm.motion.div>
      )}
    </fm.AnimatePresence>
  );
};

export default ProjectModal;
