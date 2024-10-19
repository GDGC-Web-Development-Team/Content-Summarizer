import React from 'react';
import { motion } from 'framer-motion';
import './Login.css'; 
import robotImage from '../images/WhatsApp_Image_2024-10-18_at_20.51.05-removebg-preview.png'; 
import { BsStars } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { Link } from 'react-router-dom'; 

const Login = () => {
  return (
    <div className="register-page">
      <nav className="navbar">
        <div className="logo"><h2>AIConcise</h2></div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/api">API</Link></li>
          <li><Link to="/team">Team</Link></li>
          <li><FaUserAlt /></li>
        </ul>
      </nav>

      <div className="hero-section">
        <div className="text-content">
          <h1 className="title">Welcome Back to AIConcise</h1>
          <h1 className="subtitle">Log in to continue your summarization journey</h1>
          <form action="#">
            <div className="input-group">
              <input
                type="email"
                id="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="signup-btn">
              LOGIN
            </button>
            <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link> 
          </form>
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
          <img src={robotImage} alt="AI Robot" />
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
