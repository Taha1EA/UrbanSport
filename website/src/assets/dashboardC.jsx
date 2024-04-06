import React from "react";
// import facebook from "../images/facebook.png";
// import instagram from "../images/instagram.png";
// import twitter from "../images/twitter.png";
// import linkedin from "../images/linkedin.png";
import "./Footer.css";
import Navbar from "./Navbar"

const DashboardC = () => {
  
  return (
    <div>
      <Navbar/>
      <div className="flex ">
      <div className="flex flex-col w-52 h-screen bg-slate-800 items-center justify-around">
        <a href="##">
          <p>Programs</p>
        </a>
        <a href="##">
          <p>Events</p>
        </a>
        <a href="##">
          <p>Contact us</p>
        </a>
      </div>
      <div className="w-lvw h-screen bg-white"></div>
    </div>
    </div>
   
  );
};

export default DashboardC;
