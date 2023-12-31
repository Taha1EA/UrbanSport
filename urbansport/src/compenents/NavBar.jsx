import React from 'react'
import '../App.css'
import {hamburger} from '../assets/icons'
import logo from '../assets/icons/logo.svg'
import {navLinks} from '../assets/icons/index'
function NavBar() {
  return (
    <header className="padding-x py-8  z-10 w-full bg-black text-gray-300 fixed">
        <nav className='flex justify-between items-center max-container '>
          <button href="#" className='ml-6 flex justify-around items-center w-56'>
            <img src={logo} alt='logo' width={50} height={10} />
            <h1 className='font-montserrat leading-normal text-xl text-white'>UrbanSport</h1>
          </button>
          <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
          {navLinks.map((item) => (
            <li key={item.label}>
              <a href={item.href} className='font-montserrat leading-normal text-lg text-slate-gray hover:underline hover:text-white hover:underline-offset-8'>
                {item.label}
              </a>
            </li>
          ))}
            
          </ul>
          <div className="hidden max-lg:block mr-6 cursor-pointer">
              <img src={hamburger} alt='humburger' width={25} height={25}/>
          </div>
        </nav>
    </header>
  )
}

export default NavBar