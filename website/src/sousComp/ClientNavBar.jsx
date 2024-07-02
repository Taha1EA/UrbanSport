import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from "axios";
import { RiMenu3Fill } from "react-icons/ri";
import DropMenu from '../Composent/ClientsCom/dropPhoto';
import { useCookies } from 'react-cookie';
import './navStyle.css';
import Logo from "../images/Sports.png";
import LogoW from "../images/SportsWhite.png";
import DarkModeToggle from "../assets/DarkModeToggle";
import Test from "../images/test.jpeg";

function ClientNavBar(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [cookiesU] = useCookies(['userI']);
    const [Username, setUsername] = useState();
    const [photo, setPhoto] = useState(Test); // Initialize with a default value
    const [showMenu, setShowMenu] = useState(false);

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

    const openNav = () => {
        setIsOpen(!isOpen);
        window.scrollTo(0, 0);
    };

    const ShowMenuHandler = () => {
        setShowMenu(true);
        setTimeout(() => {
            setShowMenu(false);
        }, 3000);
    };

    const navTab = [
        ["/Main/accueil", "Accueil"],
        ["/Main/ps", "Programmes Sportif"],
        ["/Main/res", "Reservation match"],
    ];

    const showProfile = () => {
        const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/logReg/selectUser";
        const fetchData = async () => {
            if (cookiesU.userI) {
                let classes = new FormData();
                classes.append("idClient", (cookiesU.userI));
                try {
                    const response = await axios.post(url, classes);
                    if (response.data) {
                        setUsername(response.data[0][0]);
                        let p;
                        if (response.data[0][1] === "") {
                            p = Test;
                        } else {
                            p = `http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/usersData/${response.data[0][1]}?${new Date().getTime()}`; // Avoid caching
                        }
                        setPhoto(p);
                    } else {
                        console.error("Expected an array but got:", response.data);
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };
        fetchData();
    };

    useEffect(() => {
        const intervalId = setInterval(showProfile, 5000); // Fetch data every 5 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    return (
        <div>
            <div className={darkMode ? 'bg-white w-full h-12 text-black flex place-content-around items-center fixed top-0 z-20 md:drop-shadow-lg' : 'w-full h-12 flex place-content-around items-center fixed top-0 z-20 md:drop-shadow-lg text-white bg-gray-800'}>
                <div>
                    <img src={darkMode ? Logo : LogoW} width={180} height={60} className='cursor-pointer' alt="Logo" />
                </div>
                <div className='hidden md:flex space-x-10'>
                    {navTab.map((navE) => (
                        <NavLink key={navE[0]} to={navE[0]} className='text-white-700 dark:text-black'>{navE[1]}</NavLink>
                    ))}
                </div>
                <div className='flex space-x-5 items-center'>
                    <div 
                        onMouseEnter={ShowMenuHandler}
                        className="relative"
                    >
                        <img className='h-[40px] w-[40px] rounded-full cursor-pointer' src={photo} alt="User Profile" />
                        {showMenu && (
                            <div className='absolute top-[50px] right-[90px]'>
                                <DropMenu />
                            </div>
                        )}
                    </div>
                    <p className='text-gray-400 hidden md:block dark:white'> Welcome {Username}</p>
                    <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} className="bg-black" />
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
