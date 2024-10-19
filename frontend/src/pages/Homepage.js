import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { BsStars } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import './Homepage.css';
import ban from '../images/WhatsApp_Image_2024-10-18_at_20.51.05-removebg-preview.png';

const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [showDropdown, setShowDropdown] = useState(false); 
  const navigate = useNavigate();

  
  const handleUserIconClick = () => {
    if (isLoggedIn) {
      setShowDropdown(!showDropdown); 
    } else {
      navigate('/register'); 
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); 
    setShowDropdown(false); 
    navigate('/'); 
  };

  
  const handleStartCreating = () => {
    navigate('/concise'); 
  };

  const handleGuide = () => {
    navigate('/about'); 
  };

  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="logo"><h2>::AIConcise</h2></div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">API</Link></li>
          <li><Link to="/team">Team</Link></li>
          <li>
            <FaUserAlt onClick={handleUserIconClick} style={{ cursor: 'pointer' }} />
            {showDropdown && isLoggedIn && (
              <ul className="dropdown">
                <li onClick={handleLogout}>Logout</li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
      <div className="hero-section">
        <div className="text-content">
          <p className="tagline">Lightning-fast.</p>
          <h1>Your AI-Powered Content Summarizer using</h1>
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1>Gemini API</h1>
            <BsStars className="stars-icon" />
          </div>
          <p>Sum up your big essays or articles right away!</p>
          <div className="buttons">
            <button className="start-button" onClick={handleStartCreating}>Start creating</button>
            <button className="guide-button" onClick={handleGuide}>Guide</button>
          </div>
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
          <img src={ban} alt="AI Robot" />
        </motion.div>
      </div>
    </div>
  );
};

export default Homepage;
