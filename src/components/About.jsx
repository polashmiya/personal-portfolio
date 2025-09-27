import { motion } from 'framer-motion';
import { FaCode, FaCoffee, FaDownload, FaLaptopCode, FaLightbulb, FaMobile, FaRocket, FaServer, FaUsers } from 'react-icons/fa';
import profileImage from '../assets/profile.jpg';

const About = () => {
  const stats = [
    { number: "5+", label: "Years Experience" },
    { number: "50+", label: "Projects Completed" },
    { number: "30+", label: "Happy Clients" },
    { number: "15+", label: "Tech Stack" },
  ];
  
  const strengths = [
    {
      icon: <FaCode size={24} />,
      title: "Clean Code",
      description: "Writing maintainable, efficient, and well-documented code following best practices."
    },
    {
      icon: <FaLaptopCode size={24} />,
      title: "Modern Development",
      description: "Utilizing latest frameworks and tools to build state-of-the-art web applications."
    },
    {
      icon: <FaServer size={24} />,
      title: "Backend Systems",
      description: "Designing robust server architectures and databases that scale with your business."
    },
    {
      icon: <FaMobile size={24} />,
      title: "Responsive Design",
      description: "Creating interfaces that provide seamless experiences across all device sizes."
    },
    {
      icon: <FaUsers size={24} />,
      title: "Team Collaboration",
      description: "Working effectively with cross-functional teams to achieve project goals."
    },
    {
      icon: <FaLightbulb size={24} />,
      title: "Creative Solutions",
      description: "Finding innovative approaches to solve complex technical challenges."
    },
    {
      icon: <FaRocket size={24} />,
      title: "Performance Optimization",
      description: "Enhancing application speed and efficiency for better user experiences."
    },
    {
      icon: <FaCoffee size={24} />,
      title: "Continuous Learning",
      description: "Constantly expanding knowledge and adapting to new technologies and methods."
    }
  ];

  return (
  <section id="about" className="section-padding py-20 bg-gradient-to-b from-white dark:from-dark-900 to-gray-50 dark:to-dark-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-blue-50 rounded-full filter blur-3xl opacity-70 -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-green-50 rounded-full filter blur-3xl opacity-70 -ml-20 -mb-20"></div>
      
      <div className="container-custom max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-subtitle">About Me</span>
          <h2 className="section-title">
            Know Me Better
          </h2>
          <div className="section-divider"></div>
          <p className="section-description">
            Passionate software engineer dedicated to creating intuitive and powerful digital experiences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* About Image and Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative background */}
            <div className="absolute -top-6 -left-6 w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-dark-800 dark:to-dark-700 rounded-2xl -z-10 transform rotate-3 opacity-70"></div>            {/* Main image */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl border-2 border-white dark:border-dark-700 bg-white dark:bg-dark-900">
              <img 
                src={profileImage} 
                alt="Portfolio Profile - Software Engineer" 
                className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105 filter brightness-105"
              />
              
              {/* Stats overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-900/80 dark:from-dark-900/90 to-transparent p-6"><div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {stats.map((stat) => (
                    <motion.div
                      key={`stat-${stat.label}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <motion.div 
                        className="text-2xl md:text-3xl font-bold text-white dark:text-primary-300"
                        initial={{ scale: 1 }}
                        whileInView={{ 
                          scale: [1, 1.2, 1],
                          transition: { 
                            times: [0, 0.5, 1], 
                            duration: 0.8, 
                            delay: 0.5
                          }
                        }}
                        viewport={{ once: true }}
                      >
                        {stat.number}
                      </motion.div>
                      <div className="text-sm text-gray-300 dark:text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-serif font-bold text-dark-900 dark:text-white mb-6">
              I'm a <span className="text-gradient">Software Engineer</span> specializing in ERP & React JS
            </h3>
            <div className="space-y-4 text-dark-600 dark:text-gray-200 text-lg leading-relaxed">
              <p>
                With 3+ years of experience, I have contributed to major ERP projects like Managerium, APON ERP, and AKIJ ERP, focusing on front-end development and business module delivery.
              </p>
              <p>
                My expertise includes React JS, RESTful API integration, and collaborating with UX designers and backend teams to deliver seamless user experiences.
              </p>
              <p>
                I am dedicated to solving business challenges through technology and continuous learning, holding a Diploma in Engineering (CMT) from Dhaka Polytechnic Institute.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 my-6">
              <motion.span 
                whileHover={{ y: -3, boxShadow: '0 10px 20px -5px rgba(59, 130, 246, 0.3)' }}
                className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium shadow-sm border border-primary-100 transition-all duration-300"
              >
                Front-end Development
              </motion.span>
              <motion.span 
                whileHover={{ y: -3, boxShadow: '0 10px 20px -5px rgba(16, 185, 129, 0.3)' }}
                className="px-4 py-2 bg-secondary-50 text-secondary-700 rounded-full text-sm font-medium shadow-sm border border-secondary-100 transition-all duration-300"
              >
                Back-end Systems
              </motion.span>
              <motion.span 
                whileHover={{ y: -3, boxShadow: '0 10px 20px -5px rgba(245, 158, 11, 0.3)' }}
                className="px-4 py-2 bg-accent-50 text-accent-700 rounded-full text-sm font-medium shadow-sm border border-accent-100 transition-all duration-300"
              >
                UI/UX Design
              </motion.span>
              <motion.span 
                whileHover={{ y: -3, boxShadow: '0 10px 20px -5px rgba(15, 23, 42, 0.3)' }}
                className="px-4 py-2 bg-gray-50 text-gray-700 rounded-full text-sm font-medium shadow-sm border border-gray-100 transition-all duration-300"
              >
                Project Management
              </motion.span>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <motion.a
                href="#contact"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Work Together
              </motion.a>
              
              <motion.a
                href="#"
                className="btn btn-secondary flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload className="mr-2" /> Download Resume
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Strengths/Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h3 className="text-2xl font-bold text-center mb-16">My Areas of Expertise</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {strengths.map((strength) => (
              <motion.div
                key={`strength-${strength.title}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: '0 15px 30px rgba(0,0,0,0.1)', 
                  backgroundColor: '#f8fafc'
                }}
                className="bg-white dark:bg-dark-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-dark-700 transition-all duration-300 hover:border-transparent"
              >
                <div className="p-4 bg-primary-50 dark:bg-dark-800 text-primary-600 dark:text-primary-300 rounded-lg inline-block mb-4">
                  {strength.icon}
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {strength.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {strength.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
