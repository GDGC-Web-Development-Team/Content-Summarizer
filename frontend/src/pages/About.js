import React, { useState } from "react";
import "../pages/About.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const steps = [
  "Input Text",
  "Connect to AI Model",
  "Generate Summary",
  "Deliver Output",
];

const stepsDetails = [
  "Users provide large blocks of text, typically between 1000 to 1500 characters. This input can come from various sources such as articles, reports, or personal notes.",
  "The input text and the specified summary length are sent to the Hugging Face Text Summarizer API. This involves constructing a well-defined API call.",
  "The AI processes the input text using advanced NLP techniques to distill the information into a coherent summary.",
  "Once generated, the summary is returned to the user in a user-friendly format, allowing easy reading, copying, or editing.",
];

const CustomizedSteppers = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((_step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted({ ...completed, [activeStep]: true });
    handleNext();
  };

  return (
    <Box className="stepper-container" sx={{ width: "100%", color: "white" }}>
      <Stepper nonLinear activeStep={activeStep} sx={{ color: "white" }}>
        {steps.map((label, index) => (
          <Step
            key={label}
            sx={{ color: "purple" }}
            completed={completed[index]}
          >
            <StepButton className="step-button" onClick={handleStep(index)}>
              <p className="step-label">{label}</p>
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div className="step-details">
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ color: "white", textAlign: "center", mt: 2 }}>
              All steps completed!
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography
              sx={{ mt: 2, mb: 1, py: 1, color: "white", textAlign: "center" }}
            >
              <p className="step-description">{stepsDetails[activeStep]}</p>
            </Typography>
            {activeStep !== steps.length &&
              (completed[activeStep] ? (
                <Typography
                  variant="caption"
                  sx={{ display: "inline-block", color: "white" }}
                >
                  Step {activeStep + 1} already completed
                </Typography>
              ) : (
                <Button className="complete-button" onClick={handleComplete}>
                  Complete
                </Button>
              ))}
          </React.Fragment>
        )}
      </div>
    </Box>
  );
};

const About = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    if (isLoggedIn) {
      setShowDropdown(!showDropdown);
    } else {
      navigate("/register");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <div className="homepage">
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
            <FaUserAlt
              onClick={handleUserIconClick}
              style={{ cursor: "pointer" }}
            />
            {showDropdown && isLoggedIn && (
              <ul className="dropdown">
                <li onClick={handleLogout}>Logout</li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
      <div className="about-content flex justify-center items-center flex-col">
        <h1 className="about-title">About and How the API is used?</h1>
        <div className="stepper-wrapper">
          <CustomizedSteppers />
        </div>
      </div>
    </div>
  );
};

export default About;
