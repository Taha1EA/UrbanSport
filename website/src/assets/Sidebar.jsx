import React, { useState, useEffect } from "react";
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_LINKS } from './lib/constants'
import Logo from "../images/SportsWhite.png"
import { useCookies } from 'react-cookie';
import DarkModeToggle from "./DarkModeToggle";
const linkClass =
	'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

export default function Sidebar() {
	const [cookie, setCookie, removeCookie] = useCookies();
	const Logout = () => {
	  removeCookie('userA',{path:'/'});
	  };  
	  const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('dark-mode');
        return savedMode ? JSON.parse(savedMode) : false;
      });
    
      useEffect(() => {
        if (darkMode) {
          document.body.classList.add('dark');
        } else {
          document.body.classList.remove('dark');
        }
        localStorage.setItem('dark-mode', JSON.stringify(darkMode));
      }, [darkMode]);
    
      const toggleDarkMode = () => {
        setDarkMode(!darkMode);
      };
	return (
		<div className="bg-blue-gray-900 text-white w-60 p-3 flex flex-col ">
			<div className="flex items-center px-1 py-3">
				<img src={Logo} width={150} height={40} className='cursor-pointer' />
			</div>
			<div className="py-8 flex flex-1 flex-col gap-0.5">
				{DASHBOARD_SIDEBAR_LINKS.map((link) => (
					<SidebarLink key={link.key} link ={link}/>
				))}
			</div>
			<DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
			<div className="flex flex-col gap-0.5 pt-2 border-t border-blue-gray-700">
				<div className={classNames(linkClass, 'cursor-pointer text-red-500')}>
					<span className="text-xl">
						<HiOutlineLogout />
					</span>
					
					<p onClick={Logout} className='cursor-pointer text-red-500 '>Log Out</p>
				</div>
				
			</div>
		</div>
	)
}

function SidebarLink({ link }) {
	const { pathname } = useLocation()

	return (
		<Link
			to={link.path}
			className={classNames(pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}
		>
			<span className="text-xl">{link.icon}</span>
			{link.label}
		</Link>
	)
}