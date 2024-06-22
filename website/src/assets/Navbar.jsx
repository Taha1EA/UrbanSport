import React, { useState, useEffect } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Button from "./button";
import Logo from "../images/Sports.png";
import LogoW from "../images/SportsWhite.png";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('dark-mode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('dark-mode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const Links = [
    { name: "HOME", link: "/" },
    { name: "About US", link: "/aboutUs" },
    { name: "Dashboard", link: "/dashboard" },
  ];

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-40">
      <div className="navbar bg-white dark:bg-gray-900 text-black dark:text-white py-4 md:px-10 px-7 flex items-center justify-between">
        <div>
          <img src={darkMode ? LogoW : Logo} width={180} height={60} className="cursor-pointer" alt="Logo" />
        </div>
        <div className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden">
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
            <div className="sb__navbar-menu_container scale-up-center bg-white dark:bg-gray-900 text-black dark:text-white p-5">
                <p className="py-2">
                  <Link to="/">HOME</Link>
                </p>
                <p className="py-2">
                  <HashLink smooth to="#Book">Match Reservation</HashLink>
                </p>
                <p className="py-2">
                  <HashLink smooth to="#Event">Events</HashLink>
                </p>
                <p className="py-2">
                  <Link to="/aboutUs">About us</Link>
                </p>
                <p className="py-2">
                  <Link to="/dashboard">Admin Side</Link>
                </p>
              <div className="sb__navbar-menu_container-links-sign mt-4">
                <button type="button">
                  <Link to="/reg">JOIN US</Link>
                </button>
              </div>
            </div>
          )}
        </div>
        <ul className="hidden md:flex items-center space-x-8">
          {Links.map((Linko) => (
            <li key={Linko.name} className="text-xl">
              <Link
                to={Linko.link}
                className="text-gray-500 hover:text-gray-400 dark:text-gray-200 dark:hover:text-gray-300"
              >
                {Linko.name}
              </Link>
            </li>
          ))}
          <Button>
            <Link to="/reg">JOIN US</Link>
          </Button>
          <Button>
            <Link to="/log">LOG IN</Link>
          </Button>
          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
