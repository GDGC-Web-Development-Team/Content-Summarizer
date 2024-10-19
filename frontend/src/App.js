// src/App.js

import React from 'react';
import Homepage from './pages/Homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Summarizer from './components/Summarizer';
import Register from './pages/Register';
import Login from './pages/Login';
import About from './pages/About';

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Homepage />}></Route>
                    <Route exact path="/concise" element={<Summarizer/>}></Route>
                    <Route exact path="/register" element={<Register/>}></Route>
                    <Route exact path="/login" element={<Login/>}></Route>
                    <Route exact path="/about" element={<About/>}></Route>
                    

                </Routes>
            </Router>
        </div>
    );
};

export default App;
