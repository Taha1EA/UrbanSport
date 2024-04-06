import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "/src/Home.jsx";
import Navbar from "./assets/Navbar.jsx";
import axios from "axios";
import { useEffect } from "react";
import DashboardC from "./assets/dashboardC.jsx";
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
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cd" element={<DashboardC />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
