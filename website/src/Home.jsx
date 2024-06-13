import MainContent from "./assets/Maincontent.jsx";
import Footer from "./assets/Footer.jsx";
import Offers from "./assets/Offers.jsx";
import Events from "./assets/Event.jsx";
import Tab from "./sousComp/tabReservation"
import Navbar from "./assets/Navbar.jsx";
import Class from "../src/Composent/ClientsCom/ClassS.jsx";
import PriceCard from "../src/Composent/ClientsCom/priceCard.jsx"
import { useState } from "react";
function Home(props) {
  const [loading,setLoading]=useState(false)
  setTimeout(() => setLoading(true), 2500)
  return (
      
    <div className="dark:bg-blue-gray-800" >
      {loading ? 
    
    (<>
      <Navbar/>
      <MainContent/>
      {/* <Offers /> */}
      <div className="mt-36 " >
          <Tab/>
      </div>
      <Class />
      <h1 className="text-2xl font-bold text-center mb-8 mt-5">Our Class Prices</h1>
      <div className="p-6   lg:flex lg:flex-row lg:justify-between flex flex-col justify-center items-center	w-full ">
      <div className='max-w-[70%] md:max-w-2xl rounded-xl border-8 border-gray-200 hover:border-red-100 '>
        <PriceCard  daysnumber='7' title="Weekly " price="60"  discount="5%"/>
      </div>
      <div className='max-w-[70%] md:max-w-2xl rounded-xl border-8 border-gray-200 hover:border-red-100'>
          <PriceCard  daysnumber='30' title="Monthly " price="200"  discount="10%"/>
      </div>
      <div className='max-w-[70%] md:max-w-2xl rounded-xl border-8 border-gray-200 hover:border-red-100'>
          <PriceCard  daysnumber='180' title="Semi Annual " price="1100"  discount="15%"/>
      </div>
      <div className='max-w-[70%] md:max-w-2xl rounded-xl border-8 border-gray-200 hover:border-red-100'>
          <PriceCard  daysnumber='360' title="Annual " price="2000"  discount="20%"/>
      </div>
      </div>
      <Events />
      <Footer />
    </>)
    :(  <div className="flex items-center justify-center min-h-screen">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-900 h-24 w-24">
        
      </div>
        </div>)
    }
  </div>
  );
}

export default Home;

