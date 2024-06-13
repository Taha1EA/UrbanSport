import React, { useState, useEffect,useRef } from 'react';
import { Select, Option } from "@material-tailwind/react";
import { useCookies } from 'react-cookie';
import axios from "axios";
import PriceCard from './priceCard';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from "../../sousComp/PaymentAddPs";
import Notification from './Notification';
const stripePromise = loadStripe('pk_test_51PN2ejLKugBhnMnptyFTTIIqxLXCdDiUtiMsH7UwuNpxl1RiL35DIvWsnpbrNKWrqi38oFrxINmDTOKBHy3OgHwI00VmeRcg0A');

const AddPro = () => {
  const [sports, setSports] = useState('');
  const [days, setDays] = useState('');
  const [nbdays, setNbDays] = useState('');
  const [price, setPrice] = useState('');
  const [classes, setClasses] = useState([]);
  const [showPay, setShowPay] = useState(false);
  const [CNIE, setCNIE] = useState('');
  const [cookiesU] = useCookies(['userI']);
  const [cookiesA] = useCookies(['userA']);
  const containerRef = useRef(null);
  const [heightClass, setHeightClass] = useState('');
  const [notification, setNotification] = useState('');
  const [selectedPrice,setSelectedPrice]=useState([false,false,false,false])
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const height = containerRef.current.scrollHeight;
        setHeightClass(`h-[${height}px]`);
      }
    };

    // Update height initially
    updateHeight();

    // Add event listener for window resize to update height dynamically
    window.addEventListener('resize', updateHeight);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);
  // Fetch programs when component mounts
  useEffect(() => {
    if (cookiesU.userI) {
      fetchPrograms(cookiesU.userI);
    }
  }, [cookiesU.userI]);

  const fetchPrograms = async (clientId) => {
    const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/Ps";
    let classes = new FormData();
    classes.append("idClient", clientId);
    try {
      const response = await axios.post(url, classes);
      if (Array.isArray(response.data)) {
        setClasses(response.data.map(Class => [Class[0], Class[1]]));
      } else {
        console.error("Expected an array but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handlePs = (e) => {
    setSports(e);
    console.log(sports)
  };
  const handleDays = (e) => {
    setDays(e);
    console.log(days)
  };
  const takeProgrammes = () => {
    if (CNIE) {
      fetchPrograms(CNIE);
    } else {
      alert("Please enter a CNIE");
    }
  };

  const dataPrice = (p) => {
    setNbDays(p[0]);
    setPrice(p[1]);
    const newSelectedPrice = [];
    for (let i = 0; i < 4; i++) {
      if (i == p[2]) {
        newSelectedPrice.push(true);
      } else {
        newSelectedPrice.push(false);
      }
    }
    setSelectedPrice(newSelectedPrice);
  };

  const handleAdd = () => {
    setShowPay(true);
  };

  const handleAdminAdd = async () => {
    const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/inscrire";
    let classes = new FormData();
    classes.append("idClient", (CNIE));
    classes.append("idPro", parseInt(sports));
    classes.append("idWeek", days);
    classes.append("nbdays", parseInt(nbdays));
    try {
      const response = await axios.post(url, classes);
      setNotification('Succisfully Inscription');
              setTimeout(() => {
                window.location.reload();
              }, 2000);
    } catch (error) {
      console.error("Error adding class:", error);
    }
  };

  return (
    <div className="flex flex-col w-full py-14 justify-around items-center ml-auto mr-auto bg-white dark:bg-blue-gray-900 ">
      {cookiesU.userI ? null : (
        <div className='flex-col px-8 py-3 text-left text-xs font-medium flex text-gray-500 uppercase tracking-wider'>
          <input 
            type="text" 
            className='mb-2 border-2 border-blue-500 py-2 px-8 rounded-lg' 
            placeholder='Insert CNIE of client' 
            value={CNIE} 
            onChange={(e) => setCNIE(e.target.value)} 
          />
          <input 
            className="cursor-pointer w-72 text-[15px] rounded-lg bg-red-400 text-yellow-50 hover:bg-white hover:border-red-500 hover:border-2 hover:text-red-600 py-2 transition-colors duration-300"
            type='submit' 
            value="Submit"
            onClick={takeProgrammes}
          />
        </div>
      )}
      <h1 className='dark:text-white'>ADD NEW CLASS</h1>
          <div className='flex-col ml-48 md:flex md:flex-row w-[85%] md:w-[85%] md:justify-around  mb-3'>
            <div className="flex w-72 flex-col gap-6 ">
            <Select variant="outlined" name='sports' onChange={handlePs} value={sports} color="blue"  label="Programme Sportif " >
                {classes.map((c,index)=>(
                  <Option key={index} value={c[0]}>{c[1]}</Option>
                ))}
            </Select>
            </div>
            <div className="flex w-72 flex-col gap-6 ">
            <Select variant="outlined" name='days' onChange={handleDays} value={days}  color="blue" label="days" >
                <Option value='1'>Monday-Wednesday-Friday</Option>
                <Option value='2'>Tuesday-Thursday-Saturday</Option>
            </Select>
            </div>
          </div>
      <div className="p-6 flex-col md:flex md:flex-row md:justify-between w-[70%] md:w-full">
       <div className={`rounded-xl border-8 ${selectedPrice[0] ? 'border-red-100' : 'border-gray-200'} hover:border-red-100`}>
          <PriceCard parentCallback={dataPrice} daysnumber='7' title="Weekly " price="60" index="0"/>
        </div>
       <div className={`rounded-xl border-8 ${selectedPrice[1] ? 'border-red-100' : 'border-gray-200'} hover:border-red-100`}>
          <PriceCard parentCallback={dataPrice} daysnumber='30' title="Monthly " price="200" index="1" />
        </div>
       <div className={`rounded-xl border-8 ${selectedPrice[2] ? 'border-red-100' : 'border-gray-200'} hover:border-red-100`}>
        <PriceCard parentCallback={dataPrice} daysnumber='180' title="Semi Annual " price="1100" index="2" />
        </div>
       <div className={`rounded-xl border-8 ${selectedPrice[3] ? 'border-red-100' : 'border-gray-200'} hover:border-red-100`}>
        <PriceCard parentCallback={dataPrice} daysnumber='360' title="Annual " price="2000" index="3" />
        </div>        
      </div>
      {(cookiesU.userI || cookiesA.userA) && (
        <input 
          className="cursor-pointer w-72 text-[15px] rounded-lg bg-red-400 text-yellow-50 hover:bg-white hover:border-red-500 hover:border-2 hover:text-red-600 py-2 transition-colors duration-300"
          type='submit' 
          value="Submit"
          onClick={cookiesA.userA ? handleAdminAdd : handleAdd}
        />
      )}
      <Notification message={notification} />
      {showPay && (
        <div className={`w-full mt-10 z-10 overflow-y-scroll ${heightClass}`} >
          <Elements stripe={stripePromise}>
            <PaymentForm sport={sports} price={price} weekDays={days} nbdays={nbdays} />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default AddPro;
