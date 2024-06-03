import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from "axios";
import { RiMenu3Fill } from "react-icons/ri";
import DropMenu from '../Composent/ClientsCom/dropPhoto';
import { useCookies } from 'react-cookie';
import './navStyle.css';
import Logo from "../images/Sports.png"
function ClientNavBar(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [cookiesU] = useCookies(['userI']);
    const [Username,setUsername]=useState()
    const [photo,setPhoto]=useState()
    const [showMenu, setShowMenu] = useState(false); 

    const openNav = () => {
        setIsOpen(!isOpen);
        window.scrollTo(0, 0);
    };

    const navTab = [
        ["/Main/accueil", "Accueil"],
        ["/Main/ps", "Programmes Sportif"],
        ["/Main/res", "Reservation match"],
    ];
    useEffect(()=>{
        const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/logReg/selectUser";
      const fetchData = async () => {
        if (cookiesU.userI) {
          let classes = new FormData();
          classes.append("idClient", parseInt(cookiesU.userI));
          try {
            const response = await axios.post(url, classes);
            if (response.data) {
                setUsername(response.data[0][0])
                let p="http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/usersData/"+response.data[0][1]
                setPhoto(p)
            } else {
              console.error("Expected an array but got:", response.data);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      };
      fetchData();
    },[])
    console.log(photo)
    return (
        <div>
            <div className='bg-white w-full h-12 text-black flex place-content-around items-center fixed top-0 z-20 md:drop-shadow-lg'>
                <div>
                    <img src={Logo} width={180} height={60} className='cursor-pointer' />
                </div>
                <div className='hidden md:flex space-x-10'>
                    {navTab.map((navE) => (
                        <NavLink key={navE[0]} to={navE[0]} className='text-gray-700'>{navE[1]}</NavLink>
                    ))}
                </div>
                <div className='flex space-x-5 items-center'>
                    <div 
                        onMouseEnter={() => setShowMenu(true)}
                        onMouseLeave={() => setShowMenu(false)}
                        className="relative"
                    >
                        <img className='h-[40px] w-[40px] rounded-full cursor-pointer' src={photo} />
                        {showMenu && (
                            <div className=' absolute top-[50px] right-[90px]'>
                            <DropMenu />
                            </div>
                        )}
                    </div>
                    <p className='text-gray-400 hidden md:block'> Welcome {Username}</p>
                </div>
                <div onClick={openNav} className='md:hidden rounded-full hover:bg-gray-500/20 p-2'>
                    <RiMenu3Fill size={25} />
                </div>
            </div>
            <div className={isOpen ? "block md:hidden" : "hidden md:hidden"}>
                {navTab.map((navE, index) => (
                    <div className='w-[100%] bg-gray-200 px-8 py-4 text-center' key={index}>
                        <NavLink to={navE[0]} className='text-gray-900' onClick={openNav}>{navE[1]}</NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ClientNavBar;
