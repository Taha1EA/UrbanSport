import React, { useState } from "react";
import "./Navbar.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../icons/logo.png";
import logReg from "../logReg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className="navbar-bg">
      <div className="sb__navbar">
        <div className="sb__navbar-links">
          <div className="sb__navbar-links_logo">
            <a href="www.google.com">
              <img src={logo} alt="logo" />
            </a>
          </div>
          <div className="sb__navbar-links_container">
            <p>
              <a href="www.google.com">HOME</a>
            </p>
            <p>
              <a href="www.google.com">ABOUT</a>
            </p>
            <p>
              <a href="www.google.com">CLASSES</a>
            </p>
            <p>
              <a href="www.google.com">TRAINERS</a>
            </p>
            <p>
              <a href="www.google.com">CONTACT</a>
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
                  <a href="www.google.com">ABOUT</a>
                </p>
                <p>
                  <a href="www.google.com">ORGANIZATIONS</a>
                </p>
                <p>
                  <a href="www.google.com">INDIVIDUALS</a>
                </p>
              </div>
              <div className="sb__navbar-menu_container-links-sign">
                <a href="www.google.com">
                  <button type="button">JOIN US</button>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
