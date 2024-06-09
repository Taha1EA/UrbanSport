import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
// import logo from "../icons/logo.png";
import { Link } from "react-router-dom";
import Button from "./button";
import "./Navbar.css";
import Logo from "../images/Sports.png"

const Navbar = () => {
  let Links = [
    {name : "HOME",link : "/"},
    {name : "Events",link : "/"},
    {name : "Coaches",link : "/"},
    {name : "Offers",link : "/"},
    {name : "Dashboard",link : "/Dashboard"}
  ]
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-40">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
      <div>
                    <img src={Logo} width={180} height={60} className='cursor-pointer' />
                </div>
      {/* <div onClick={()=>setOpen(!open)} className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden">
        < RiMenu3Line name={open ? 'close' : 'menu'} />
      </div> */}
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
            <div className="sb__navbar-menu_container scale-up-center">
              <div className="sb__navbar-menu_container-links">
                <p>
                  <Link to="www.google.com">ABOUT</Link>
                </p>
                <p>
                  <Link to="/Dashboard">Dashboard</Link>
                </p>
                <p>
                  <Link to="www.google.com">INDIVIDUALS</Link>
                </p>
              </div>
              <div className="sb__navbar-menu_container-links-sign">
              
                  <button type="button">  <Link to="/reg">JOIN US  </Link></button>
              
              </div>
            </div>
          )}
        </div>

      <ul className="md:flex md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 hidden">
        {
          Links.map((Linko)=>(

            <li key={Linko.name} className="md:ml-8 text-xl md:my-0 my-7">
              <Link to={Linko.link} className="text-gray-500 hover:text-gray-400 duration-500">{Linko.name}</Link>
            </li>

          ))
        }
        <Button >  <Link to="/reg">JOIN US  </Link></Button>
        <Button><Link to="/log">LOG IN  </Link></Button>
      </ul></div>
    </div>
  );
};

export default Navbar;
