import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "/src/Home.jsx";
import Navbar from "./assets/Navbar.jsx";

const App = () => {
  return (
    <Router>
      
      <div className='App'>
        <Navbar />  
        <Routes>
          <Route path="/" element={<Home />} />
                    
        </Routes>
      </div>
    </Router>
  );
};

export default App;
