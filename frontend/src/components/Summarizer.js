import React, { useState, useEffect } from "react";
import { BsStars } from "react-icons/bs";
import "./Summarizer.css";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Summarizer = () => {
  const [text, setText] = useState("");
  const [maxLength, setMaxLength] = useState(200);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [displayedSummary, setDisplayedSummary] = useState("");

  const handleSummarizeText = async () => {
    setError("");
    setSummary("");
    setLoading(true);
    setShowContent(false);

    if (!text.trim()) {
      setError("Please enter text to summarize.");
      setLoading(false);
      setShowContent(true);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKENDURL}/api/summarize`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to summarize text");
      }

      const data = await response.json();
      setSummary(data.summary || "No summary available.");
    } catch (error) {
      setError("Failed to summarize text. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (summary) {
      typeWriterEffect(summary);
    }
  }, [summary]);

  const typeWriterEffect = (text) => {
    let index = 0;
    setDisplayedSummary("");
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedSummary((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 25);
  };

  return (
    <div className="summarizer">
      <nav className="navbar">
        <div className="logos">
          <h2>::AIConcise</h2>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">API</Link>
          </li>
          <li>
            <Link to="/team">Team</Link>
          </li>
          <li>
            <FaUserAlt />
          </li>
        </ul>
      </nav>

      <div className="summarizer-container">
        {showContent && (
          <div className="text-content">
            <h1 className="summarizer-title">
              Transform Your Text with our AI-Powered Tool using
            </h1>
            <div
              className="log"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <h1>Gemini</h1>
              <BsStars className="star-icon" />
            </div>

            <textarea
              className="summarizer-text-area"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="10"
              cols="50"
              placeholder="Enter text/URL to summarize"
            />

            <div className="button-container">
              <button
                className="summarizer-button"
                onClick={handleSummarizeText}
                disabled={loading}
              >
                {loading ? <div className="loader"></div> : "Summarize"}
              </button>
            </div>

            {error && <p className="summarizer-error-text">{error}</p>}
          </div>
        )}

        {!showContent && loading && (
          <div className="loader-container">
            <div
              className="log"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <h1>Gemini</h1>
              <BsStars className="stars-icon" />
            </div>
            <div className="loader"></div>
          </div>
        )}

        {!showContent && !loading && displayedSummary && (
          <div className="summary-container">
            <div
              className="logo"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <h1>Here is your Summary</h1>
              <BsStars className="stars-icon" />
            </div>
            <div className="summarizer-summary-box">
              <p className="summarizer-summary-text">{displayedSummary}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summarizer;
