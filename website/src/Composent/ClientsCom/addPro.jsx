import React, { useState, useEffect, useRef } from 'react';
import { Select, Option } from "@material-tailwind/react";
import { useCookies } from 'react-cookie';
import axios from "axios";
import PriceCard from './priceCard';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from "../../sousComp/PaymentAddPs";
import Notification from './Notification';
import ErrorNotification from './ErrorNotification';

const stripePromise = loadStripe('pk_test_51PN2ejLKugBhnMnptyFTTIIqxLXCdDiUtiMsH7UwuNpxl1RiL35DIvWsnpbrNKWrqi38oFrxINmDTOKBHy3OgHwI00VmeRcg0A');

const AddPro = ({ dataChange,OnAdd }) => {
  
  const [sports, setSports] = useState('');
  const [days, setDays] = useState('');
  const [nbdays, setNbDays] = useState('');
  const [price, setPrice] = useState('');
  const [classes, setClasses] = useState([]);
  const [showPay, setShowPay] = useState();
  const [CNIE, setCNIE] = useState('');
  const [cookiesU] = useCookies(['userI']);
  const [cookiesA] = useCookies(['userA']);
  const containerRef = useRef(null);
  const [heightClass, setHeightClass] = useState('');
  const [notification, setNotification] = useState('');
  const [Enotification, setENotification] = useState('');
  const [selectedPrice, setSelectedPrice] = useState([false, false, false, false]);
  
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const height = containerRef.current.scrollHeight;
        setHeightClass(`h-[${height}px]`);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  useEffect(() => {
    if (cookiesU.userI) {
      fetchPrograms(cookiesU.userI);
    }
  }, [cookiesU.userI]);

  const fetchPrograms = async (clientId) => {
    const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/Ps";
    let formData = new FormData();
    formData.append("idClient", clientId);
    try {
      const response = await axios.post(url, formData);
      if (Array.isArray(response.data)) {
        setClasses(response.data.map(Class => [Class[0], Class[1]]));
        setTimeout(() => {
          setShowPay(false)
          OnAdd(true)
        }, 10000);
        
      } else {
        console.error("Expected an array but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePs = (e) => {
    setSports(e);
  };

  const handleDays = (e) => {
    setDays(e);
  };

  const takeProgrammes = () => {
    if (CNIE) {
      fetchPrograms(CNIE);
      
    } else {
      setENotification('Please enter the CNIE of the client');
      setTimeout(() => {
        setENotification("");
      }, 2000);
    }
  };

  const dataPrice = (p) => {
    setNbDays(p[0]);
    setPrice(p[1]);
    const newSelectedPrice = Array(4).fill(false);
    newSelectedPrice[p[2]] = true;
    setSelectedPrice(newSelectedPrice);
  };

  const handleAdd = () => {
    if (sports && days && nbdays) {
      setShowPay(true);
    } else {
      setENotification('Fill all the information, please');
      setTimeout(() => {
        setENotification("");
      }, 2000);
    }
  };

  const handleAdminAdd = async () => {
    if (CNIE && sports && days && nbdays) {
      const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/inscrire";
      let formData = new FormData();
      formData.append("idClient", CNIE);
      formData.append("idPro", (sports));
      formData.append("idWeek", days);
      formData.append("nbdays", (nbdays));
      try {
        const response = await axios.post(url, formData);
        if(response.data){
          setNotification('Successfully added class');
          setTimeout(() => {
            setNotification('');
          }, 2000);
        }
        else{
          setENotification('semthing wrong');
          setTimeout(() => {
            setENotification("");
          }, 2000);
        }
      } catch (error) {
        console.error("Error adding class:", error);
      }
    } else {
      setENotification('Fill all the information, please');
      setTimeout(() => {
        setENotification("");
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col w-full py-14 justify-around items-center ml-auto mr-auto bg-white dark:bg-blue-gray-900 ">
      {cookiesU.userI ? null : (
        <div className='flex-col px-8 py-3 text-left text-xs font-medium flex text-gray-500 uppercase tracking-wider'>
          <input 
            type="text" 
            className='mb-2 border-4 border-blue-500 py-2 px-8 rounded-lg' 
            placeholder='Insert CNIE of client' 
            value={CNIE} 
            onChange={(e) => setCNIE(e.target.value)} 
          />
          <input 
            className="cursor-pointer w-72 text-[15px] rounded-lg bg-red-400 text-yellow-50 hover:bg-white hover:border-red-500 hover:border-4 hover:text-red-600 py-2 transition-colors duration-300"
            type='submit' 
            value="Submit"
            onClick={takeProgrammes}
          />
        </div>
      )}
      <h1 className='dark:text-white'>ADD NEW CLASS</h1>
      <div className='flex-col ml-48 md:ml-0 md:flex md:flex-row w-[85%] md:w-[80%] md:justify-between mb-3'>
        <div className="flex w-72 flex-col gap-6 mr-0 md:mr-[-100px] justify-center items-center">
          <Select key={sports} variant="outlined" name='sports' onChange={handlePs} value={sports} color="blue" label="Programme Sportif">
            {classes.map((c) => (
              <Option key={c[0]} value={c[0]}>{c[1]}</Option>
            ))}
          </Select>
        </div>
        <div className="flex w-72 flex-col gap-6">
          <Select variant="outlined" name='days' onChange={handleDays} value={days} color="blue" label="days">
            <Option value='1'>Monday-Wednesday-Friday</Option>
            <Option value='2'>Tuesday-Thursday-Saturday</Option>
          </Select>
        </div>
      </div>
      <div className="p-6 flex-col md:flex md:flex-row md:justify-between w-[70%] md:w-full">
        <div className={`rounded-xl border-4 ${selectedPrice[0] ? 'border-red-400' : 'border-gray-200'} hover:border-red-100`}>
          <PriceCard parentCallback={dataPrice} daysnumber='7' title="Weekly " price="60" index="0" />
        </div>
        <div className={`rounded-xl border-4 ${selectedPrice[1] ? 'border-red-400' : 'border-gray-200'} hover:border-red-100`}>
          <PriceCard parentCallback={dataPrice} daysnumber='30' title="Monthly " price="200" index="1" />
        </div>
        <div className={`rounded-xl border-4 ${selectedPrice[2] ? 'border-red-400' : 'border-gray-200'} hover:border-red-100`}>
          <PriceCard parentCallback={dataPrice} daysnumber='180' title="Semi Annual " price="1100" index="2" />
        </div>
        <div className={`rounded-xl border-4 ${selectedPrice[3] ? 'border-red-400' : 'border-gray-200'} hover:border-red-100`}>
          <PriceCard parentCallback={dataPrice} daysnumber='360' title="Annual " price="2000" index="3" />
        </div>
      </div>
      {(cookiesU.userI || cookiesA.userA) && (
        <input 
          className="cursor-pointer w-72 text-[15px] rounded-lg bg-red-400 text-yellow-50 hover:bg-white hover:border-red-500 hover:border-4 hover:text-red-600 py-2 transition-colors duration-300"
          type='submit' 
          value="Submit"
          onClick={cookiesA.userA ? handleAdminAdd : handleAdd}
        />
      )}
      <Notification message={notification} />
      <ErrorNotification message={Enotification} />
      {showPay && (
        <div className={`w-full mt-10 z-10 ${heightClass}`} ref={containerRef}>
          <Elements stripe={stripePromise}>
            <PaymentForm sport={sports} price={price} weekDays={days} nbdays={nbdays} onMessage={() => {fetchPrograms(cookiesU.userI)}} />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default AddPro;
