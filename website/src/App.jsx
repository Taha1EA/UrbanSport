import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "/src/Home.jsx";
import Navbar from "./assets/Navbar.jsx";
import axios from "axios";
import { useEffect } from "react";
import DashboardC from "./assets/dashboardC.jsx";
import Log from "/src/Composent/regLog/Log.jsx"
import Reg from "/src/Composent/regLog/Reg.jsx"
const App = () => {
  return (
    <div>
      <Navbar/>
    <Router>
      <Routes >
        <Route exact path="/" Component={<Home/>} />
        <Route path="/cd" element={<DashboardC />} />
        <Route path="/Reg" element={<Reg />} />
        <Route path="/Log" element={<Log Admin="false"/>} />
        <Route path="/LogAdmin" element={<Log Admin="true"/>} />
      </Routes >
    </Router>
    </div>
  );
};

export default App;
