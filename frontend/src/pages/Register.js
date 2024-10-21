import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import robotImage from "../images/WhatsApp_Image_2024-10-18_at_20.51.05-removebg-preview.png";
import { FaUserAlt } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // State for success message

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for password confirmation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKENDURL}/user/register-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
            mail: formData.email,
          }),
        }
      );

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setSuccess(true);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        // Show error message
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="register-page">
      <nav className="navbar">
        <div className="logos">
          <h2>AIConcise</h2>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/api">API</Link>
          </li>
          <li>
            <Link to="/team">Team</Link>
          </li>
          <li>
            <FaUserAlt />
          </li>
        </ul>
      </nav>

      <div className="hero-section">
        <div className="text-content">
          <h1 className="title">Join the AI Revolution</h1>
          <h1 className="subtitle">Sign up to supercharge your summaries</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                id="username"
                placeholder="Full Name"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            {success && (
              <p className="success-message">
                Registration successful! Redirecting to login...
              </p>
            )}{" "}
            {/* Success message */}
            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? "Signing up..." : "SIGNUP"}
            </button>
          </form>

          <p className="login-prompt">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Login here
            </Link>
          </p>
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
