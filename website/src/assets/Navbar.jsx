import React, { useState } from "react";
import "./Navbar.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../icons/logo.png";
import logReg from "../logReg";
import { Link } from "react-router-dom";
import DashboardC from "./dashboardC";
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className="navbar-bg">
      <div className="sb__navbar">
        <div className="sb__navbar-links">
          <div className="sb__navbar-links_logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="sb__navbar-links_container">
            <p>
              <Link to="/">HOME</Link>
            </p>
            <p>
              <Link to="www.google.com">ABOUT</Link>
            </p>
            <p>
              <Link to="/dashbardC">Dashboard</Link>
            </p>
            <p>
              <Link to="www.google.com">TRAINERS</Link>
            </p>
            <p>
              <Link to="www.google.com">CONTACT</Link>
            </p>
          </div>
        </div>
        <div className="sb__navbar-button">
          <Link to={logReg}>
            <button type="button">Login </button>
          </Link>
        </div>
        <div className="sb__navbar-button">
          <Link to={logReg}>
            <button type="button">JOIN US</button>
          </Link>
        </div>

        <div className="sb__navbar-menu">
          {toggleMenu ? (
            <RiCloseLine
              color="#000"
              size={27}
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <RiMenu3Line
              color="#000"
              size={27}
              onClick={() => setToggleMenu(true)}
            />
          )}
          {toggleMenu && (
            <div className="sb__navbar-menu_container scale-up-center">
              <div className="sb__navbar-menu_container-links">
                <p>
                  <Link to="www.google.com">ABOUT</Link>
                </p>
                <p>
                  <Link to={DashboardC}>Dashboard</Link>
                </p>
                <p>
                  <Link to="www.google.com">INDIVIDUALS</Link>
                </p>
              </div>
              <div className="sb__navbar-menu_container-links-sign">
                <Link to="www.google.com">
                  <button type="button">JOIN US</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
