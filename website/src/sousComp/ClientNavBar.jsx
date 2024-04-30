import React, { useState } from 'react'
import {NavLink } from "react-router-dom"
import { RiMenu3Fill } from "react-icons/ri";
import image from "../images/test.png"
function ClientNavBar() {
    const [isOpen,setIsOpen]=useState(false);
    const openNav = () =>{
        setIsOpen(!isOpen)
    }
  return (
    <div className='bg-white w-full h-12 text-black flex  place-content-around  items-center fixed top-0 z-10'>
        <div>
            <h1>Nouress</h1>
        </div>
        <div className='hidden md:flex space-x-10'>
            <NavLink to="/Main/accueil" className='text-gray-700'>Accueil</NavLink>
            <NavLink to="/Main/events" className='text-gray-700'>Events</NavLink>
            <NavLink to="/Main/ps" className='text-gray-700'>Programmes Sportif</NavLink>
            <NavLink to="/Main/res" className='text-gray-700'>Reservation match</NavLink>
        </div>
        <div className='flex space-x-5 items-center'>
            <img className='h-[40px] w-[40px] rounded-full'src={image}/>
            <p className='text-gray-400 hidden md:block'> Welcome  name</p>
        </div>
        <div onClick={openNav} className='md:hidden rounded-full hover:bg-gray-500/20 p-2'>
            <RiMenu3Fill size={25}/>
        </div>
    </div>
    );
}

export default ClientNavBar