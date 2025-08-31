import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode, FaChevronRight, FaFilter } from 'react-icons/fa';
import { useState } from 'react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const projects = [
    {
      id: "ecommerce-platform",
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce application with user authentication, payment processing, and admin dashboard. Built with modern technologies for optimal performance.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
      github: "#",
      live: "#",
      featured: true,
      category: "fullstack"
    },
    {
      id: "task-management-app",
      title: "Task Management App",
      description: "Collaborative task management tool with real-time updates, drag-and-drop interface, and team collaboration features.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
      technologies: ["Vue.js", "Express.js", "Socket.io", "PostgreSQL"],
      github: "#",
      live: "#",
      featured: true,
      category: "fullstack"
    },
    {
      id: "weather-dashboard",
      title: "Weather Dashboard",
      description: "Beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop",
      technologies: ["React", "TypeScript", "OpenWeather API", "Chart.js"],
      github: "#",
      live: "#",
      featured: false,
      category: "frontend"
    },
    {
      id: "social-media-analytics",
      title: "Social Media Analytics",
      description: "Analytics dashboard for social media metrics with data visualization and reporting capabilities.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      technologies: ["Next.js", "D3.js", "Redis", "Python"],
      github: "#",
      live: "#",
      featured: false,
      category: "data"
    },
    {
      id: "recipe-platform",
      title: "Recipe Sharing Platform",
      description: "Community-driven recipe sharing platform with user profiles, ratings, and advanced search functionality.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop",
      technologies: ["React", "GraphQL", "MongoDB", "Cloudinary"],
      github: "#",
      live: "#",
      featured: false,
      category: "fullstack"
    },
    {
      id: "portfolio-website",
      title: "Portfolio Website",
      description: "Responsive portfolio website showcasing projects and skills with modern design and smooth animations.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop",
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      github: "#",
      live: "#",
      featured: false,
      category: "frontend"
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const filterCategories = [
    { name: 'all', label: 'All Projects' },
    { name: 'frontend', label: 'Frontend' },
    { name: 'fullstack', label: 'Full Stack' },
    { name: 'data', label: 'Data & Analytics' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="projects" className="section-padding py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50 rounded-full filter blur-3xl opacity-70 -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-green-50 rounded-full filter blur-3xl opacity-70 -ml-20 -mb-20"></div>
      
      <div className="container-custom max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-subtitle">My Work</span>
          <h2 className="section-title">
            Featured Projects
          </h2>
          <div className="section-divider"></div>
          <p className="section-description">
            A showcase of my recent work and personal projects
          </p>
        </motion.div>

        {/* Project Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <div className="bg-white p-1 rounded-full shadow-md flex flex-wrap justify-center gap-1 border border-gray-100">
            {filterCategories.map((category) => (
              <motion.button
                key={category.name}
                onClick={() => setActiveFilter(category.name)}
                className={`px-5 py-2 rounded-full transition-all duration-300 flex items-center space-x-1 ${
                  activeFilter === category.name
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeFilter === category.name && category.name !== 'all' && (
                  <FaFilter className="mr-1" size={12} />
                )}
                <span>{category.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-10 mb-16"
        >
          {filteredProjects.filter(p => p.featured).map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 card-hover bg-white"
            >
              {/* Project Image with Overlay */}
              <div className="relative aspect-video overflow-hidden rounded-t-xl">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary-900/50 backdrop-blur-sm">
                  <div className="flex space-x-4">
                    <motion.a
                      href={project.github}
                      className="p-3 bg-white rounded-full text-gray-900 hover:bg-gray-100 transition-colors shadow-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub size={20} />
                    </motion.a>
                    <motion.a
                      href={project.live}
                      className="p-3 bg-white rounded-full text-gray-900 hover:bg-gray-100 transition-colors shadow-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaExternalLinkAlt size={20} />
                    </motion.a>
                  </div>
                </div>
                
                {/* Project Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white bg-opacity-90 text-primary-600 text-xs font-medium rounded-full uppercase tracking-wider shadow-sm">
                    {project.category}
                  </span>
                </div>
              </div>
              
              {/* Project Content */}
              <div className="p-6 bg-white rounded-b-xl">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={`${project.id}-${tech}`}
                      className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="pt-2 flex justify-end">
                  <motion.a 
                    href="#" 
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    whileHover={{ x: 3 }}
                  >
                    View Details <FaChevronRight className="ml-1" size={14} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Other Projects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Other Notable Projects
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.filter(p => !p.featured).map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)', transition: { duration: 0.3 } }}
                className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 h-full flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-white bg-opacity-90 text-primary-600 text-xs font-medium rounded-full uppercase tracking-wider shadow-sm">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-gray-900 hover:text-primary-600 transition-colors">
                      {project.title}
                    </h4>
                    <div className="flex space-x-3">
                      <motion.a
                        href={project.github}
                        className="text-gray-500 hover:text-primary-600 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaGithub size={18} />
                      </motion.a>
                      <motion.a
                        href={project.live}
                        className="text-gray-500 hover:text-primary-600 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaExternalLinkAlt size={18} />
                      </motion.a>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={`${project.id}-${tech}`}
                        className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-100"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-100">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary inline-flex items-center px-8 py-3 rounded-full shadow-md"
            whileHover={{ 
              y: -5, 
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FaCode className="mr-2" />
            View More on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
