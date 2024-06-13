import React, { useState, useEffect } from 'react';
import axios from "axios"
import { TbSoccerField } from "react-icons/tb";
import { FaDumbbell } from "react-icons/fa";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { useCookies } from 'react-cookie'
import Events from "../../assets/Event.jsx";
import full from '../../images/Offer_full.jpg';
import foot from '../../images/Offer_football.jpg';
import box from '../../images/Offer_box.jpg';
import Class from "../ClientsCom/ClassS.jsx";
import Footer from "../../assets/Footer.jsx"
import '../../assets/DarkModeToggle.css';
const Accueil = () => {
  const tab = [
    [full, "Join our summer football camp and improve your skills!"],
    [foot, 'Champions ship of football is now Available'],
    [box, 'Get fit with friends and save on group training sessions.']
  ];
  const [cIndex, setCindex] = useState(0);
  const [nbMatch, setNbMatch] = useState(0);
  const [nbProg, setNbProg] = useState(0);
  const [cookiesU] = useCookies(['userI']);
  const prevSlide = () => {
    const isFirst = (cIndex === 0);
    const newIndex = isFirst ? tab.length - 1 : cIndex - 1;
    setCindex(newIndex);
  };

  const nextSlide = () => {
    const isLast = (cIndex === tab.length - 1);
    const newIndex = isLast ? 0 : cIndex + 1;
    setCindex(newIndex);
  };

  const toSlide = (index) => {
    setCindex(index);
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 3000);
    return () => clearInterval(intervalId);
  }, []);
  useEffect (() =>{
    const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/accueil";
    const fetchData = async () => {
        let classes = new FormData();
        classes.append("idClient",(cookiesU.userI))
        try {
            const response = await axios.post(url, classes);
            if (response.data) {
              setNbProg(response.data[2][0])
              setNbMatch(parseInt(response.data[0][0])+parseInt(response.data[1][0]))
            } else {
                console.error("Expected an array but got:", response.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    fetchData();
  },[])
  return (
    <div className='flex flex-col items-center dark:bg-blue-gray-900'>
      <div className='w-[97%] h-[300px] mt-6 relative lg:h-[620px] group'>
        <div style={{ backgroundImage: `url(${tab[cIndex][0]})` }} className='w-full h-full rounded-2xl bg-center bg-cover duration-700 flex items-end justify-center p-8'>
          <h2 className='p-4 bg-white dark:bg-blue-gray-800 dark:text-white  text-xl rounded-lg '>{tab[cIndex][1]}</h2>
        </div>
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20  text-white cursor-pointer'>
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className='flex top-4 justify-center py-2'>
          {tab.map((s, index) => (
            <div key={index} onClick={() => { toSlide(index) }} className='text-2xl cursor-pointer'>
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
      <div className='felx-col md:flex gap-2 w-[90%] md:w-[60%] mt-12 '>
        <div className='bg-white dark:bg-blue-gray-800 rounded-xl p-4 flex-1 border border-gray-200 flex items-center mb-3 md:mb-0'>
          <div className='flex rounded-full w-12 h-12 items-center justify-center bg-green-500'>
            <TbSoccerField className='text-3xl text-white' />
          </div>
          <div className='pl-4 '>
            <span className='text-sm text-gray-800 font-light dark:text-white '>nombre of match Played</span>
            <div className='dark:text-white'>
              <strong>{nbMatch}</strong>
            </div>
          </div>
        </div>
        <div className='bg-white dark:bg-blue-gray-800 rounded-xl p-4 flex-1 border border-gray-200 flex items-center'>
          <div className='flex rounded-full w-12 h-12 items-center justify-center bg-blue-500'>
            <FaDumbbell className='text-3xl text-white' />
          </div>
          <div className='pl-4'>
            <span className='text-sm text-gray-800 font-light dark:text-white'>Nombre Of Programme registered</span>
            <div className='dark:text-white'>
              <strong>{nbProg}</strong>
            </div>
          </div>
        </div>
      </div>
      <div className=' w-[97%] mt-4 bg-white dark:bg-blue-gray-800 rounded-md mb-4'>
        {/* <Offers /> */}
        <Class />
        <Events />

      </div>
      <div className='w-[100%]'>
        <Footer/>
      </div>
    </div>
  );
}

export default Accueil;
