import React, { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaBriefcase, FaCode, FaProjectDiagram, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJsSquare, FaGitAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Loading from './Loading';  // Pastikan mengimpor komponen Loading
import daffa from "../assets/daffa.jpg"

const About = () => {
  // State untuk mengelola loading
  const [isLoading, setIsLoading] = useState(true);

  // Simulasi loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Setelah 2 detik, loading selesai
    }, 2000);
    return () => clearTimeout(timer); // Clear timeout saat komponen di-unmount
  }, []);

  // Variants for animation
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const data = {
    name: "Daffa Khairy Almayrizq",
    about: {
      description: `Hi, I'm Daffa Khairy Almayrizq, a passionate web developer with a love for building intuitive and beautiful websites. 
      I specialize in creating responsive, user-friendly websites that provide a seamless user experience.`,
      profileImage: "https://via.placeholder.com/150"
    },
    socialLinks: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      twitter: "https://twitter.com"
    },
    workExperience: [
      {
        title: "Fullstack web developer at KPK",
        duration: "Mar 2024 - Present",
        description: "Developed responsive websites using React and JavaScript."
      },
    ],
    skills: [
      { name: "JavaScript", icon: FaJsSquare, color: "text-yellow-500" },
      { name: "React", icon: FaReact, color: "text-blue-500" },
      { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
      { name: "CSS3", icon: FaCss3Alt, color: "text-blue-600" },
      { name: "HTML5", icon: FaHtml5, color: "text-orange-500" },
      { name: "Git", icon: FaGitAlt, color: "text-red-500" }
    ],
    projects: [
      {
        title: "Personal Portfolio Website",
        description: "Created a portfolio using React and Tailwind CSS."
      },
      {
        title: "Public Relation Dashboard Application",
        description: "Built a dashboard application to keep data from Public Information Services. I use this tech stack. React.Js, Express.Js, Node.js, and MySQL."
      },
      {
        title: "PPID KPK Official Website",
        description: "I developed a website for the PPID KPK using Vue.js and Laravel to serve as an accessible platform for the public to obtain vital information. This website aims to enhance transparency and promote accountability by providing easy access to documents, announcements, and data related to the activities of the KPK. Through this initiative, we strive to empower citizens with knowledge and ensure that they can engage with our services effectively."
      }
    ]
  };

  // Render loading jika isLoading true
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
        <div id="about"></div>
    <div className="bg-red-500 min-h-screen py-12">
      {/* About Section */}
      <motion.div
        className="max-w-6xl mx-auto p-6 bg-white/30 backdrop-blur-xl rounded-lg shadow-lg mb-12"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">About Me</h1>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <img
            src={daffa}
            alt="Profile"
            className="w-48 h-48 object-cover rounded-full mb-6 md:mb-0 md:mr-6"
          />
          <div className="text-center md:text-left">
            <p className="text-lg text-gray-700 leading-relaxed max-w-[500px]">{data.about.description}</p>
          </div>
        </div>
        {/* Social Media Icons */}
        <div className="mt-8 flex justify-center space-x-6">
          <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-3xl">
            <FaLinkedin />
          </a>
          <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-900 text-3xl">
            <FaGithub />
          </a>
          <a href={data.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-3xl">
            <FaTwitter />
          </a>
        </div>
      </motion.div>

      {/* Work Experience Section */}
      <motion.div
        className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg mb-12"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <FaBriefcase className="mr-2" /> Work Experience
        </h2>
        <div className="space-y-4">
          {data.workExperience.map((job, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
              <p className="text-gray-600">{job.duration}</p>
              <p className="text-gray-700 mt-2">{job.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg mb-12"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <FaCode className="mr-2" /> Skills
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {data.skills.map((skill, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded-lg text-center">
              <skill.icon className={`${skill.color} text-5xl mx-auto mb-2`} />
              <p className="text-lg font-semibold">{skill.name}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Projects Section */}
      <motion.div
        className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <FaProjectDiagram className="mr-2" /> Projects
        </h2>
        <div className="space-y-4">
          {data.projects.map((project, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold text-gray-800">{project.title}</h3>
              <p className="text-gray-700 mt-2">{project.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
    </div>
  );
};

export default About;
