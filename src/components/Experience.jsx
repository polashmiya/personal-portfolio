import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaQuoteLeft } from 'react-icons/fa';

const Experience = () => {
  const experiences = [
    {
      title: "Software Engineer I",
      company: "AKIJ iBOS Limited | An AKIJ Company",
      period: "June 2024 – Present",
      location: "Dhaka, Bangladesh",
      description: [
        "Created/maintained responsive React JS apps for cross-browser suitability.",
        "Integrated front-end with RESTful APIs for seamless data flow.",
        "Collaborated with UX designers for consistent user experience on all devices."
      ],
      technologies: ["React JS", "RESTful API", "ERP", "Tailwind CSS", "Redux"],
    },
    {
      title: "Junior Software Engineer",
      company: "AKIJ iBOS Limited | An AKIJ Company",
      period: "April 2022 – June 2024",
      location: "Dhaka, Bangladesh",
      description: [
        "Built responsive web interfaces using HTML, CSS, JavaScript, React JS.",
        "Assisted in debugging, issue resolution, and performance optimization."
      ],
      technologies: ["React JS", "HTML", "CSS", "JavaScript", "ERP"],
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8
      }
    }
  };

  return (
    <section id="experience" className="section-padding py-20 bg-white dark:bg-dark-900 relative overflow-hidden">      {/* Decorative Elements with reduced opacity */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-100/20 rounded-full filter blur-3xl -ml-32 -mt-32 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-100/20 rounded-full filter blur-3xl -mr-32 -mb-32 pointer-events-none"></div>
      
      <div className="container-custom max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-wider font-semibold text-primary-600 mb-3 block">Career Path</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Work Experience
          </h2>
          <div className="mx-auto w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            My professional journey and the impact I've made at each step
          </p>
        </motion.div>        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-4xl mx-auto relative z-10"
        >{/* Timeline vertical line */}          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-1 bg-primary-400 rounded-full hidden md:block"></div>
            {experiences.map((exp, index) => (
            <motion.div
              key={`experience-${exp.company}-${index}`}
              variants={itemVariants}
              className="relative mb-16 last:mb-0"
            >              {/* Timeline circle marker */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -top-3 w-6 h-6 rounded-full shadow-md bg-white border-4 border-primary-400 z-10 hidden md:block"></div>
              
              {/* Content */}
              <div className={`md:w-5/12 relative ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>                <motion.div 
                  className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 backdrop-blur-sm"
                  whileHover={{ 
                    y: -5, 
                    transition: { duration: 0.3 },
                    boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.1), 0 10px 20px -15px rgba(0, 0, 0, 0.05)"
                  }}
                >
                  <span className="absolute top-10 md:top-12 left-0 md:left-auto md:right-full transform translate-x-4 md:-translate-x-4 w-8 h-8 bg-white rotate-45 hidden md:block border-l border-t border-gray-100" 
                    style={{ display: index % 2 === 0 ? 'none' : 'block' }}></span>
                  <span className="absolute top-10 md:top-12 right-full md:right-auto md:left-full transform -translate-x-4 md:translate-x-4 w-8 h-8 bg-white rotate-45 hidden md:block border-r border-b border-gray-100" 
                    style={{ display: index % 2 === 0 ? 'block' : 'none' }}></span>
                    
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-full bg-primary-50 text-primary-600 mr-4 shadow-sm">
                      <FaBriefcase size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                        {exp.title}
                      </h3>
                      <h4 className="text-lg font-semibold text-primary-600">
                        {exp.company}
                      </h4>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 text-sm">
                    <div className="flex items-center mb-2 sm:mb-0 text-gray-600">
                      <FaCalendarAlt className="mr-2" />
                      {exp.period}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-2" />
                      {exp.location}
                    </div>
                  </div>

                  <div className="mb-6">
                    <ul className="space-y-2">                      {exp.description.map((item, i) => (
                        <li key={`desc-${exp.company}-${i}`} className="text-gray-600 flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                    {exp.testimonial && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-6 relative shadow-sm border border-gray-100">
                      <FaQuoteLeft className="text-primary-300 absolute top-2 left-2" size={16} />
                      <p className="text-gray-600 italic text-sm pl-6">"{exp.testimonial}"</p>
                    </div>
                  )}<div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={`tech-${exp.company}-${tech}`}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-gray-50 text-primary-600 border border-gray-100 transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>          <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center group py-3 px-6 rounded-lg bg-primary-600 text-white font-medium transition-all duration-300 shadow-md"
          >
            Ready to collaborate? <span className="ml-2 text-lg group-hover:translate-x-1 transition-all duration-300">→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
