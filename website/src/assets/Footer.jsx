import React from 'react';
import { ImFacebook2 } from "react-icons/im";
import { FaInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer   '>
      <div className='sb__footer section__padding'>
          <div className='sb__footer-links'>
            <div className='sb__footer-links-div'>
                    <h4>For Business</h4>
                    <a href="##">
                      <p>About us</p>
                    </a>
                    <a href="##">
                      <p>Services</p>
                    </a>
                    <a href="##">
                      <p>Contact us</p>
                    </a>
            </div>
            <div className='sb__footer-links-div'>
                    <h4>For Business</h4>
                    <a href="##">
                      <p>About us</p>
                    </a>
                    <a href="##">
                      <p>Services</p>
                    </a>
                    <a href="##">
                      <p>Contact us</p>
                    </a>
            </div>
            <div className='sb__footer-links-div'>
                    <h4>For Business</h4>
                    <a href="##">
                      <p>About us</p>
                    </a>
                    
            </div>
            <div className='sb__footer-links-div'>
                    <h4>For Business</h4>
                    <a href="##">
                      <p>About us</p>
                    </a>
                    <a href="##">
                      <p>Services</p>
                    </a>
                    <a href="##">
                      <p>Contact us</p>
                    </a>
                    <a href="##">
                      <p>Contact us</p>
                    </a>
            </div>
            <div className='sb__footer-links-div'>
                    <h4>Coming soon on</h4>
                    <div className='socialmedia'>
                        <p><ImFacebook2 className='text-white w-12 h-8'/></p>
                        <p><FaInstagram className='text-white w-12 h-8'/></p>
                        <p><BsTwitterX className='text-white w-12 h-8'/></p>
                        <p><FaYoutube className='text-white w-12 h-8'/></p>
                       
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
