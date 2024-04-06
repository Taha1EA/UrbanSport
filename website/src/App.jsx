<<<<<<< HEAD
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "/src/Home.jsx";
import Navbar from "./assets/Navbar.jsx";
import axios from "axios";
import { useEffect } from "react";
import DashboardC from "./assets/dashboardC.jsx";
=======
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "/src/Home.jsx"
import Log from "/src/Composent/regLog/Log.jsx"
import Reg from "/src/Composent/regLog/Reg.jsx"
>>>>>>> taha01
const App = () => {
  useEffect(() => {
    axios
      .get(
        "http://localhost/PFE_Backend/UrbanSport-Backend-/UrbanSport/Clientside/test.php"
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Router>
<<<<<<< HEAD
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cd" element={<DashboardC />} />
        </Routes>
      </div>
=======
      <Routes >
        <Route exact path="/" Component={<Home/>} />
        <Route path="/Reg" element={<Reg />} />
        <Route path="/Log" element={<Log Admin="false"/>} />
        <Route path="/LogAdmin" element={<Log Admin="true"/>} />
        
      </Routes >
>>>>>>> taha01
    </Router>
  );
};

export default App;
