import React,{useEffect} from 'react'
import {NavLink,Outlet,useNavigate} from "react-router-dom"
import ClientNavBar from "../sousComp/ClientNavBar.jsx"
const ClientMain = () => {
  const navigate = useNavigate();
    useEffect(() => {
      if(window.location.pathname=='/Main')
        navigate('/Main/accueil');
    }, [navigate]);
  return (
    <div className='bg-gray-300 w-full pt-12'>
        <div>
            <ClientNavBar/>
        </div>
        <div className='w-[100%]'>
          <Outlet/>
        </div>
    </div>
  )
}

export default ClientMain