import React from 'react';
import './Team.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 
import robotImage from '../images/WhatsApp_Image_2024-10-18_at_20.51.05-removebg-preview.png'; 
import { FaUserAlt } from "react-icons/fa";

const Team = () => {
  const teamMembers = [
    {name: 'Lalit', contribution: 'Backend API Integration'}, 
    {name: 'Amruthavalli', contribution: 'Team Page'}, 
    {name: 'Suryatej', contribution: ''}, 
    {name: 'Mrigank', contribution: ''}, 
    {name: 'Shamish', contribution: ''}, 
    {name: 'Harshith', contribution: ''}, 
    {name: 'Revanth', contribution: ''}, 
    {name: 'Ritesh', contribution: ''}, 
    {name: '', contribution: ''}, 
  ];

  return (
    <div className = "aboutpage">
        <nav className="navbar">
        <div className="logo"><h2>AIConcise</h2></div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/api">API</Link></li>
          <li><Link to="/team">Team</Link></li>
          <li><FaUserAlt /></li>
        </ul>
        </nav>

        <h1 className="about-title">Meet Our Team</h1>
        <div className="about-content">
        <ul>
          {teamMembers.map((member, index) => (
            <li key={index} className="step-label">{member}
                <span>{index + 1}. <strong>{member.name}</strong> - {member.contribution}</span>
            </li>
          ))}
        </ul>

        <motion.div
          className="robot-image"
          initial={{ y: 50 }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 1, -1, 0],
            transition: {
              duration: 5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
          }}
        >
          <img src={robotImage} alt="AI Robot" />
        </motion.div>

      </div>
    </div>
  );
};

export default Team
