
import Footer from "./Footer.jsx";
import AboutUp from"./AboutUp.jsx"

import Navbar from "./Navbar.jsx";

import { useState } from "react";
function About(props) {
  const [loading,setLoading]=useState(false)
  setTimeout(() => setLoading(true), 2500)
  return (
      
    <div className="dark:bg-blue-gray-800 " >
      {loading ? 
    
    (<div >
      <Navbar/>
      <AboutUp/>
      {/* <Offers /> */}
     <div className="flex py-12 pl-8 justify-between w-full">
      <p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1698.6292603801376!2d-8.046542538406255!3d31.626771377396345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafe94a941672ed%3A0xde67cdd2a606be45!2sUrbain%205!5e0!3m2!1sar!2sma!4v1718182540802!5m2!1sar!2sma"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </p>   
          <p className="mx-4 text-2xl w-[55%] ">"Transform your body, elevate your mind, and unleash your potential. At UrbainFive, we believe that fitness is not just a destination; it's a way of life. Our mission is to empower you to achieve your goals, whether you're just starting your fitness journey or are an experienced athlete.

Fitness encompasses more than just physical strength. It’s about fostering mental resilience, building confidence, and improving overall well-being. We provide the tools, support, and community you need to succeed. Our state-of-the-art facilities, experienced trainers, and comprehensive programs are designed to cater to all fitness levels and aspirations.</p>
      </div>
      <Footer />
    </div>)
    :(  <div className="flex items-center justify-center min-h-screen">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-900 h-24 w-24">
        
      </div>
        </div>)
    }
  </div>
  );
}

export default About;

