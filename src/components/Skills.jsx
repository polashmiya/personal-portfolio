import { motion } from 'framer-motion';
import { 
  FaReact, 
  FaNode, 
  FaJs, 
  FaPython, 
  FaAws, 
  FaGitAlt,
  FaDatabase,
  FaServer,
  FaStar
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiMongodb,
  SiPostgresql, 
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiGraphql,
  SiTailwindcss
} from 'react-icons/si';
import { useState } from 'react';

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  
  const skillCategories = [
    {
      title: "Frontend",
      icon: <FaReact className="text-blue-500" size={24} />,
      skills: [
        { name: "React", icon: <FaReact className="text-blue-500" />, level: 95 },
        { name: "TypeScript", icon: <SiTypescript className="text-blue-600" />, level: 90 },
        { name: "JavaScript", icon: <FaJs className="text-yellow-500" />, level: 95 },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" />, level: 85 }
      ],
      color: "from-blue-500 to-blue-600",
      lightColor: "bg-blue-50",
      shadowColor: "shadow-blue-500/20"
    },
    {
      title: "Backend",
      icon: <FaServer className="text-green-500" size={24} />,
      skills: [
        { name: "Node.js", icon: <FaNode className="text-green-600" />, level: 90 },
        { name: "Python", icon: <FaPython className="text-blue-500" />, level: 85 },
        { name: "GraphQL", icon: <SiGraphql className="text-pink-500" />, level: 80 },
        { name: "REST APIs", icon: <FaServer className="text-gray-600" />, level: 95 }
      ],
      color: "from-green-500 to-green-600",
      lightColor: "bg-green-50",
      shadowColor: "shadow-green-500/20"
    },
    {
      title: "Database",
      icon: <FaDatabase className="text-purple-500" size={24} />,
      skills: [
        { name: "MongoDB", icon: <SiMongodb className="text-green-500" />, level: 85 },
        { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-600" />, level: 80 },
        { name: "Redis", icon: <SiRedis className="text-red-500" />, level: 75 },
        { name: "SQL", icon: <FaDatabase className="text-gray-600" />, level: 90 }
      ],
      color: "from-purple-500 to-purple-600",
      lightColor: "bg-purple-50",
      shadowColor: "shadow-purple-500/20"
    },
    {
      title: "DevOps & Tools",
      icon: <SiDocker className="text-blue-400" size={24} />,
      skills: [
        { name: "AWS", icon: <FaAws className="text-orange-500" />, level: 80 },
        { name: "Docker", icon: <SiDocker className="text-blue-500" />, level: 85 },
        { name: "Kubernetes", icon: <SiKubernetes className="text-blue-600" />, level: 70 },
        { name: "Git", icon: <FaGitAlt className="text-orange-600" />, level: 95 }
      ],
      color: "from-cyan-500 to-cyan-600",
      lightColor: "bg-cyan-50",
      shadowColor: "shadow-cyan-500/20"
    }
  ];

  const getRatingStars = (level) => {
    const stars = [];
    // Convert percentage to 5-star scale
    const rating = Math.round(level / 20); 
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={i < rating ? "text-yellow-400" : "text-gray-300"} 
          size={14} 
        />
      );
    }
    
    return stars;
  };

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
  
  const skillVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  return (
    <section id="skills" className="section-padding py-20 bg-gradient-to-b from-gray-50 dark:from-dark-900 to-white dark:to-dark-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 dark:bg-dark-700 rounded-full filter blur-3xl opacity-20 -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-100 dark:bg-dark-700 rounded-full filter blur-3xl opacity-20 -ml-48 -mb-48"></div>

      <div className="container-custom max-w-6xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-subtitle dark:text-primary-400">Expertise</span>
          <h2 className="section-title dark:text-white">
            Skills & Technologies
          </h2>
          <div className="section-divider dark:bg-gradient-to-r dark:from-primary-700 dark:to-secondary-700"></div>
          <p className="section-description dark:text-gray-300">
            Technologies I work with to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className={`bg-white dark:bg-dark-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${category.shadowColor} dark:shadow-black/30`}
            >
              <div className={`h-2 bg-gradient-to-r ${category.color} dark:from-primary-700 dark:to-secondary-700`}></div>
              <div className="p-6">
                <div className="flex items-center justify-center mb-6">
                  <div className={`p-3 rounded-full ${category.lightColor} dark:bg-dark-800 transform transition-transform duration-500 hover:rotate-12`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white ml-3">
                    {category.title}
                  </h3>
                </div>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div 
                      key={skillIndex} 
                      className="space-y-2"
                      variants={skillVariants}
                      initial="initial"
                      whileHover="hover"
                      onHoverStart={() => setHoveredSkill(`${categoryIndex}-${skillIndex}`)}
                      onHoverEnd={() => setHoveredSkill(null)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">
                            {skill.icon}
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {skill.name}
                          </span>
                        </div>
                        <div className="flex">
                          {getRatingStars(skill.level)}
                        </div>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 dark:bg-dark-700 rounded-full overflow-hidden shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ 
                            duration: 1.2, 
                            delay: 0.2 + (skillIndex * 0.1),
                            ease: "easeOut" 
                          }}
                          viewport={{ once: true }}
                          className={`h-full bg-gradient-to-r ${category.color} dark:from-primary-700 dark:to-secondary-700 ${hoveredSkill === `${categoryIndex}-${skillIndex}` ? 'animate-pulse' : ''}`}
                        />
                      </div>
                      <div className="text-xs text-right font-medium text-gray-500 dark:text-gray-300">
                        {skill.level}%
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg dark:shadow-black/30 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-b from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 rounded-full filter blur-3xl opacity-30 -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-t from-secondary-100 to-secondary-200 dark:from-secondary-900 dark:to-secondary-800 rounded-full filter blur-3xl opacity-30 -ml-32 -mb-32"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Other Technologies & Tools
              </h3>

              <div className="flex flex-wrap justify-center gap-4">
                {[
                  'Jest', 'Cypress', 'Webpack', 'Vite', 'Next.js', 'Express.js',
                  'Prisma', 'Jenkins', 'GitHub Actions', 'Figma', 'Postman', 'VS Code'
                ].map((tech, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ 
                      y: -5, 
                      boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)', 
                      transition: { duration: 0.3 } 
                    }}
                    viewport={{ once: true }}
                    className="px-4 py-2 bg-gradient-to-r from-gray-50 to-white dark:from-dark-800 dark:to-dark-700 text-gray-700 dark:text-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-dark-700"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
