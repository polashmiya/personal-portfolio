
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhone,
  FaRegCheckCircle,
  FaUser
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    isError: false
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, isSubmitting: true });
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormStatus({ isSubmitting: false, isSubmitted: true, isError: false });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus({ isSubmitting: false, isSubmitted: false, isError: false });
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-primary-600" size={24} />,
      title: "Email",
      content: "polashmiya2015@gmail.com",
      link: "mailto:polashmiya2015@gmail.com"
    },
    {
      icon: <FaPhone className="text-primary-600" size={24} />,
      title: "Phone",
      content: "+88 01719623984",
      link: "tel:+8801719623984"
    },
    {
      icon: <FaMapMarkerAlt className="text-primary-600" size={24} />,
      title: "Location",
      content: "Uttara, Dhaka",
      link: "#"
    }
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin size={24} />,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/md-polash-miya-726667193/",
      color: "hover:text-blue-600",
      hoverBg: "hover:bg-blue-50"
    },
    {
      icon: <FaGithub size={24} />,
      name: "GitHub",
      url: "https://github.com/polashmiya",
      color: "hover:text-gray-900",
      hoverBg: "hover:bg-gray-50"
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="contact" className="section-padding py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-x-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-b from-primary-100 to-primary-50 rounded-full filter blur-3xl opacity-30 -mr-36 -mt-36 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-t from-primary-100 to-secondary-50 rounded-full filter blur-3xl opacity-30 -ml-36 -mb-36 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/4 w-56 h-56 bg-gradient-to-r from-secondary-100 to-secondary-50 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container-custom w-full max-w-4xl md:max-w-5xl mx-auto px-2 sm:px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-sm uppercase tracking-wider font-semibold text-primary-600 mb-3 block">Contact Me</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <div className="mx-auto w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full mb-6"></div>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 bg-white rounded-xl shadow-xl p-4 sm:p-6 md:p-8 relative overflow-hidden border border-gray-50 min-w-0"
          >
            <div className="absolute right-0 top-0 w-20 h-20 bg-gradient-to-b from-primary-50 to-transparent rounded-bl-full"></div>
            <div className="absolute left-0 bottom-0 w-20 h-20 bg-gradient-to-t from-secondary-50 to-transparent rounded-tr-full"></div>
            <div className="relative">
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-lg bg-primary-50 text-primary-600 mr-3 shadow-sm">
                  <FaEnvelope size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Send me a message</h3>
              </div>
              <AnimatePresence mode="wait">
                {formStatus.isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-6 text-center shadow-inner"
                  >
                    <div className="flex justify-center mb-4">
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                      >
                        <FaRegCheckCircle size={40} className="text-green-500" />
                      </motion.div>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Thank You!</h4>
                    <p>Your message has been sent successfully. I'll get back to you as soon as possible.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">Your Name</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FaUser className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-colors duration-200"
                            placeholder="Enter your name"
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FaEnvelope className="text-gray-400" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-colors duration-200"
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-xs font-medium text-gray-700 mb-1">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-colors duration-200"
                        placeholder="What's this about?"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-xs font-medium text-gray-700 mb-1">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-colors duration-200 resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={formStatus.isSubmitting}
                      className="w-full btn-primary flex items-center justify-center group text-base py-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {formStatus.isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <FaPaperPlane className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 flex flex-col gap-6 min-w-0"
          >
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Let's connect</h3>
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology and innovation. Feel free to reach out through any of the channels below.
              </p>
            </motion.div>
            {/* Contact Details */}
            <motion.div
              className="flex flex-col gap-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {contactInfo.map((info) => (
                <motion.a
                  key={`contact-${info.title}`}
                  href={info.link}
                  variants={itemVariants}
                  whileHover={{
                    y: -3,
                    scale: 1.02,
                    boxShadow: '0 6px 18px -4px rgba(0,0,0,0.08)',
                    transition: { duration: 0.18 }
                  }}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group border border-gray-50"
                >
                  <div className="p-2 bg-primary-50 rounded-lg group-hover:bg-primary-100 transition-colors duration-200 shadow-sm">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm md:text-base">{info.title}</h4>
                    <p className="text-gray-600 text-xs md:text-sm">{info.content}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
            {/* Social Links */}
            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-base font-semibold text-gray-900 mb-3">Follow me on social media</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={`social-link-${social.name}`}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{
                      y: -3,
                      scale: 1.1,
                      boxShadow: '0 8px 16px -4px rgba(0,0,0,0.08)',
                      transition: { duration: 0.18 }
                    }}
                    transition={{ duration: 0.25, delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className={`p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-gray-600 ${social.color} ${social.hoverBg} border border-gray-50`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 rounded-lg shadow-xl mt-4 border border-primary-500 text-sm md:text-base"
              whileHover={{
                scale: 1.01,
                boxShadow: '0 12px 20px -6px rgba(0,0,0,0.10)',
                transition: { duration: 0.18 }
              }}
            >
              <h4 className="text-base font-bold mb-1">Currently Available for Work</h4>
              <p className="text-primary-100">
                I'm open to freelance opportunities and interesting projects. Let's create something amazing together!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
