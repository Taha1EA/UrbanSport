import React from "react";
import facebook from "../images/facebook.png";
import instagram from "../images/instagram.png";
import twitter from "../images/twitter.png";
import linkedin from "../images/linkedin.png";
import "./Footer.css";

const DashboardC = () => {
  return (
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
      <div className="w-lvw h-screen bg-orange-600"></div>
    </div>
  );
};

export default DashboardC;
