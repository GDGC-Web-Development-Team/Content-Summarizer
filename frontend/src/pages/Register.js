import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 
import './Login.css'; 
import robotImage from '../images/WhatsApp_Image_2024-10-18_at_20.51.05-removebg-preview.png'; 
import { FaUserAlt } from "react-icons/fa";

const Register = () => {
  return (
    <div className="register-page">
      <nav className="navbar">
        <div className="logos"><h2>AIConcise</h2></div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/api">API</Link></li>
          <li><Link to="/team">Team</Link></li>
          <li><FaUserAlt /></li>
        </ul>
      </nav>

      <div className="hero-section">
        <div className="text-content">
          <h1 className="title">Join the AI Revolution</h1>
          <h1 className="subtitle">Sign up to supercharge your summaries</h1>
          <form action="#">
            <div className="input-group">
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                required
              />
            </div>
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
            <div className="input-group">
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm Password"
                required
              />
            </div>
            <button type="submit" className="signup-btn">
              SIGNUP
            </button>
          </form>
          <p className="login-prompt">Already have an account? <Link to="/login" className="login-link">Login here</Link></p>
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

export default Register;
