import React from 'react';
import { ImFacebook2 } from "react-icons/im";
import { FaInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import './Footer.css';
import LogoW from "../images/SportsWhite.png";
const Footer = () => {
  return (
    <div className='footer p-4'>
      <div className='sb_footer section_padding'>
          <div className='sb__footer-links'>
            <div className='sb__footer-links-div'>
                    <img src={LogoW} alt="logo" width={180} height={60}/>
                    
            </div>
            <div className='sb__footer-links-div'>
                    <h4>Home Page</h4>
                    <a href="#Book">
                      <p>Book NOw</p>
                    </a>
                    <a href="#Schedule">
                      <p>Class Schedule</p>
                    </a>
                    <a href="#Prices">
                      <p>Class Prices</p>
                    </a>
                    <a href="#Event">
                      <p>Event</p>
                    </a>
            </div>
            <div className='sb__footer-links-div'>
                    <h4>For Business</h4>
                    <a href="/aboutUs">
                      <p>About us</p>
                    </a>
                    
            </div>
            <div className='sb__footer-links-div'>
                    <h4>For Business</h4>
                    <a href="">
                      <p>05 77 88 99 10</p>
                    </a>
                    <a href="##">
                      <p>urbainSport@gmail.com</p>
                    </a>
                    <a href="##">
                      <p>azli lot industriel 2eme tranche lot n° 15 Près de l'usine Coca cola, Marrakech 40000</p>
                    </a>
                    
            </div>
            <div className='sb__footer-links-div'>
                    <h4>Coming soon on</h4>
                    <div className='socialmedia'>
                        <p><ImFacebook2 className='text-white w-8 h-4'/></p>
                        <p><FaInstagram className='text-white w-8 h-4'/></p>
                        <p><BsTwitterX className='text-white w-8 h-4'/></p>
                        <p><FaYoutube className='text-white w-8 h-4'/></p>
                    </div>
            </div>

          </div>
          <div className='sb__footer-below'>
            <div className='sb__footer-copyright'>
              
              <p>@{new Date().getFullYear()} UrabainFive. All rights reserved.</p>

            </div>
            <div className='sb__footer-below-links'>
            <a href="##"><div> <p>Terms & Conditions</p></div></a>
            <a href="##"><div> <p>Privacy</p></div></a>
            <a href="##"><div> <p>Security</p></div></a>
            <a href="##"><div> <p>Cookie Declarations</p></div></a>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Footer;