import React from 'react'
import Tab from "../../sousComp/tabReservation"
import foot from "../../images/football.jpg"
import Footer from "../../assets/Footer.jsx"
function ResMatch() {
  return (
    <div className='bg-gray-200'>
        <div className='w-full h-[300px]  relative lg:h-[620px] group '>
        <div style={{ backgroundImage: `url(${foot})` }} className='w-full h-full  bg-center bg-cover duration-700 flex items-end justify-center p-8'>
          <h2 className='p-4 bg-white/50 text-xl rounded-lg'>RESEREVE AND ENJOY </h2>
        </div>
        </div>
        <div className='mb-12 mt-3'>
          <Tab/>
        </div>
        <Footer/>
    </div>
  )
}

export default ResMatch