import React, { useState } from 'react'
import {NavLink } from "react-router-dom"
import { RiMenu3Fill } from "react-icons/ri";
import image from "../images/test.png"
import {  useCookies } from 'react-cookie'
import './navStyle.css'
function ClientNavBar(props) {
    const [isOpen,setIsOpen]=useState(false);
    const [cookies] = useCookies(['user']);
    const openNav = () =>{
        setIsOpen(!isOpen)
        window.scrollTo(0, 0)
    }
    const navTab=[
        ["/Main/accueil","Accueil"],
        ["/Main/events","Events"],
        ["/Main/ps","Programmes Sportif"],
        ["/Main/res","Reservation match"],

    ]

  return (
    <div>
    <div className='bg-white w-full h-12 text-black flex  place-content-around  items-center fixed top-0 z-10  md:drop-shadow-lg'>
        <div>
            <h1>Nouress</h1>
        </div>
        <div className='hidden md:flex space-x-10'>
            {navTab.map((navE)=>(
                 <NavLink key={navE[0]} to={navE[0]} className='text-gray-700' >{navE[1]}</NavLink>
            ))}
        </div>
        <div className='flex space-x-5 items-center'>
            <img className='h-[40px] w-[40px] rounded-full cursor-pointer'src={image} />
            <p className='text-gray-400 hidden md:block'> Welcome  {cookies.user}</p>
        </div>
        <div onClick={openNav} className='md:hidden rounded-full hover:bg-gray-500/20 p-2'>
            <RiMenu3Fill size={25}/>
        </div>
    </div>
    <div className={isOpen?"block md:hidden":"hidden md:hidden"}>
            {navTab.map((navE,index)=>(
                <div className='w-[100%]  bg-gray-200 px-8 py-4 text-center'>
                 <NavLink key={index} to={navE[0]} className='text-gray-900' onClick={openNav}>{navE[1]}</NavLink>
                </div>
            ))}
    </div>
    </div>
    );
}

export default ClientNavBar