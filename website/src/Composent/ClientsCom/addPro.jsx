import React,{useState,useEffect} from 'react'
import { Select, Option } from "@material-tailwind/react";
import { useCookies } from 'react-cookie';
import axios from "axios";
import PriceCard from './priceCard';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from "../../sousComp/PaymentAddPs";
const addPro = () => {
  const stripePromise = loadStripe('pk_test_51PN2ejLKugBhnMnptyFTTIIqxLXCdDiUtiMsH7UwuNpxl1RiL35DIvWsnpbrNKWrqi38oFrxINmDTOKBHy3OgHwI00VmeRcg0A');
  const [sports,setSports]=useState();
  const [days,setDays]=useState();
  const [nbdays,setNbDays]=useState();
  const [price,setPrice]=useState();
  const [classes,setClasses]=useState([]);
  const [showPay, setshowPay] = useState(false);
  const [cookiesU] = useCookies(['userI']);
  const [cookiesA] = useCookies(['userA']);
  const dataPrice = (p) => {
    setNbDays(p[0])
    setPrice(p[1]);
  };
  const handlePs = (e) => {
    setSports(e);
    console.log(sports)
  };
  const handleDays = (e) => {
    setDays(e);
    console.log(days)
  };
  const handleAdd = () => {
      setshowPay(true)        
  };
  const handleAdminAdd =()=>{
    const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/inscrireAdmin";
    const fetchData = async () => {
        let classes = new FormData();
        classes.append("idPro", parseInt(sports));
        classes.append("idWeek", parseInt(days));
        classes.append("nbdays", nbdays);
        try {
            const response = await axios.post(url, classes);
            if (response.data) {
                alert(response.data);
            } else {
                console.error("Expected an array but got:", response.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    fetchData();
  }
  useEffect(() => {
    const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/Ps";
    const fetchData = async () => {
      if (cookiesU.userI) {
        let classes = new FormData();
        classes.append("idClient", parseInt(cookiesU.userI));
        try {
          const response = await axios.post(url, classes);
          if (Array.isArray(response.data)) {
            response.data.forEach((Class) => { 
              setClasses(prevState => [...prevState,[Class[0],Class[1]]]);    
            })
            console.log(classes)
          } else {
            console.error("Expected an array but got:", response.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
}, []);
  return (
    <div className="flex flex-col w-full py-14 justify-around items-center ml-auto mr-auto bg-white ">
          <h1>ADD NEW CLASS</h1>
          <div className='flex w-full justify-around mb-3'>
            <div className="flex w-72 flex-col gap-6 ">
            <Select variant="outlined" name='sports' onChange={handlePs} value={sports} color="blue" label="Programme Sportif" >
                {classes.map((c)=>(
                  <Option value={c[0]}>{c[1]}</Option>
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
          <div className="p-6  flex justify-between	w-full">
            <PriceCard parentCallback={dataPrice} daysnumber='7' title="Weekly " price="60"  discount="5%"/>
            <PriceCard parentCallback={dataPrice} daysnumber='30' title="Monthly " price="200"  discount="10%"/>
            <PriceCard parentCallback={dataPrice} daysnumber='180' title="Semi Annual " price="1100"  discount="15%"/>
            <PriceCard parentCallback={dataPrice} daysnumber='360' title="Annual " price="2000"  discount="20%"/>
          </div>
          {(cookiesU.userI || cookiesA.userA) && (
                            <input 
                                className="cursor-pointer w-72 text-[15px] rounded-lg bg-red-400 text-yellow-50 hover:bg-white hover:border-red-500 hover:border-2 hover:text-red-600 py-2 transition-colors duration-300"
                                type='submit' 
                                value="submit"
                               onClick={cookiesA.userA ? handleAdminAdd :cookiesU.userI?handleAdd:null}
                            />
                        )}
          {showPay?
            
            <div className={ 'absolute w-full h-[100vh] top-0 right-0 z-10' }>
            <Elements stripe={stripePromise}>
                <PaymentForm sport={sports} price={price} weekDays={days} nbdays={nbdays} />
            </Elements>
        </div>
        :null
    }
    </div>
  )
}

export default addPro