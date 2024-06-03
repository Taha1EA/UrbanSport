import React from 'react';
import { NavLink } from "react-router-dom";
import { useCookies } from 'react-cookie';
const DropPhoto = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['userI']);
  
  const Logout = () => {
    removeCookie('userI');
    console.log('User logged out and cookie removed');
  };

  return (
    <div className='flex flex-col border-2 border-gray-400 absolute w-[150px] h-[100px] z-10 bg-white rounded-lg p-4'>
      <div className='bg-white w-[10px] h-[10px] border-t-2 border-l-2 border-gray-400 absolute top-[-5px] right-[75px] rotate-45'></div>
      <ul className='flex flex-col gap-4'>
        <NavLink to="/Main/settings" className='cursor-pointe'>Settings</NavLink>
        <li onClick={Logout} className='cursor-pointer text-red-500 border-t-2 border-gray-300'>Log Out</li>
      </ul>
    </div>
  );
};

export default DropPhoto;
