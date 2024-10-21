import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import robotImage from "../images/WhatsApp_Image_2024-10-18_at_20.51.05-removebg-preview.png";
import { FaUserAlt } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKENDURL}/user/login-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mail: email,
            password: password,
          }),
        }
      );

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setSuccess(true);

        setTimeout(() => {
          navigate("/concise");
        }, 2000);
      } else {
        setError(
          data.message || "Login failed. Please check your credentials."
        );
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
          <h1 className="title">Welcome Back to AIConcise</h1>
          <h1 className="subtitle">
            Log in to continue your summarization journey
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            {success && (
              <p className="success-message">
                Login successful! Redirecting...
              </p>
            )}{" "}
            {/* Success message */}
            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? "Logging in..." : "LOGIN"}
            </button>
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot Password?
            </Link>
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
