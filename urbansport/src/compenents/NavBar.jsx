import React from 'react'
import '../App.css'
import {hamburger} from '../assets/icons'
import {navLinks} from '../assets/icons/index'
function NavBar() {
  return (
    <header className="padding-x py-8 absolute z-10 w-full bg-black text-gray-300">
        <nav className='flex justify-between items-center max-container '>
          <button href="#" className='ml-6'>Urbanport
            {/* <img  alt='logo' width={130} height={40} /> */}
          </button>
          <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
          {navLinks.map((item) => (
            <li key={item.label}>
              <a href={item.href} className='font-montserrat leading-normal text-lg text-slate-gray'>
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