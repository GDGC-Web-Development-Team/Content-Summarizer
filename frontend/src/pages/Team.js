import React from 'react';
import './Team.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 
import { FaUserAlt } from "react-icons/fa";

// Placeholder images from the internet for team members
const teamMembers = [
    { name: 'Lalit', role: 'Full Stack Developer', contribution: 'Backend API Integration', image: '' },
    { name: 'Amruthavalli', role: 'Web Developer', contribution: 'Team Page Design', image: '' },
    { name: 'Suryatej', role: 'Web Developer', contribution: 'Website Design', image: '' },
    { name: 'Mrigank', role: 'Web Developer', contribution: 'Backend API Integration', image: '' },
    { name: 'Shamish', role: 'Web Developer', contribution: 'Website Design', image: '' },
    { name: 'Harshith', role: 'Web Developer', contribution: 'Backend', image: '' },
    { name: 'Aashwika', role: 'UI/UX Designer', contribution: 'Login Page Design', image: '' },
    { name: 'Ritesh', role: 'UI/UX Designer', contribution: 'UI/UX Improvement', image: '' },
];

const Team = () => {
    return (
        <div className="aboutpage">
            <nav className="navbar">
                <div className="logos"><h2>AIConcise</h2></div>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/api">API</Link></li>
                    <li><Link to="/team">Team</Link></li>
                    <li><FaUserAlt /></li>
                </ul>
            </nav>

            <h1 className="about-title">Meet Our Professional Team</h1>
            <div className="team-section">
                {teamMembers.map((member, index) => (
                    <div key={index} className="team-card">
                        <img src={member.image} alt={`${member.name}`} className="team-photo" />
                        <h3>{member.name}</h3>
                        <p className="team-role">{member.role}</p>
                        <p className="team-contribution">{member.contribution}</p>
                    </div>
                ))}
            </div>

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
            </motion.div>
        </div>
    );
};

export default Team;
