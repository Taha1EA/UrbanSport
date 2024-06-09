import React, { useState, useEffect,useRef } from 'react';
import { useCookies } from 'react-cookie';
import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from "../../sousComp/PayementRenewPs";
import Notification from './Notification';
function ClassTab() {
    const stripePromise = loadStripe('pk_test_51PN2ejLKugBhnMnptyFTTIIqxLXCdDiUtiMsH7UwuNpxl1RiL35DIvWsnpbrNKWrqi38oFrxINmDTOKBHy3OgHwI00VmeRcg0A');
    const [currentDay, setCurrentDay] = useState(0);
    const [classDetail, setClassDetail] = useState([]);
    const [showPay, setshowPay] = useState(false);
    const [sports, setSports] = useState();
    const [offresT, setOffresT] = useState();
    const [cookiesU] = useCookies(['userI']);
    const containerRef = useRef(null);
    const [heightClass, setHeightClass] = useState('');
    const [notification, setNotification] = useState('');
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
    const cases=["payed","overdue"];
    const prices={"7":"60","30":"200","180":"1100","360":"2000"}
    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };
    const handleAdd = () => {
      setshowPay(true)        
    };
    useEffect(() => {
      const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/selectPs";
      const fetchData = async () => {
        if (cookiesU.userI) {
          let classes = new FormData();
          classes.append("idClient", (cookiesU.userI));
          try {
            const response = await axios.post(url, classes);
            if (Array.isArray(response.data)) {
                let g1=new Date();
                response.data.forEach((Class) => { 
                    let d1=new Date();
                    let d2 = addDays(new Date(Class[6]), parseInt(Class[7]));
                    console.log(d2.toISOString().split("T")[0]);
                    let c="";
                    if(d1.getTime()<d2.getTime()){
                        c=cases[0];
                    }
                    else{
                        c=cases[1];
                    }
                    setClassDetail(prevState => [...prevState,[Class[0],
                      Class[1],
                        `${Class[2]} - ${Class[3]}`,
                        Class[4],
                        Class[5],Class[6],Class[7],c
                        ]]);    
                })
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
    //payment to renew
    const RenewClient = (sport,offreType) =>{
      setSports(sport)
      setOffresT(offreType)
      setshowPay(true)
    }
    //delete class
    const deleteClass=(sport)=>{
      const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/deletePs";
      const fetchData = async () => {
        if (cookiesU.userI) {
          let classes = new FormData();
          classes.append("idClient", (cookiesU.userI));
          classes.append("idPro", parseInt(sport));
          try {
            const response = await axios.post(url, classes);
            if (response.data) {
              setNotification('Delete successful');
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            } else {
              console.error("Expected an array but got:", response.data);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      };
      fetchData();
    }
  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Your Classes</h1>
         <div className='px-8 py-3 text-center text-[14px] font-medium flex text-gray-800 uppercase tracking-wider'>
      Days content meaning :<br/>1: Monday-Wednesday-Friday<br/>2:Tuesday-Thursday-Saturday
      </div>
      <div className="flex flex-col items-center">
      <div className="overflow-x-auto w-full">
        <div className="inline-block min-w-full py-2 align-middle">
          <div className="overflow-hidden shadow-md sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 text-center">
              <thead className="bg-gray-50 text-center">
                <tr>
                  <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Days
                  </th>
                  <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    first Regestiration
                  </th>
                  <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    last Renew
                  </th>
                  <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    offre Type
                  </th>
                  <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    case
                  </th>
                  <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Renew
                  </th>
                  <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delete Class
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                {classDetail.map((c) => {
                    if(c[7]=="payed"){
                        return (
                            <tr key={c[0]}>
                                <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{c[1]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{c[2]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{c[3]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{c[4]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{c[5]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{c[6]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{c[7]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                                <td onClick={()=>deleteClass(c[0])} className="px-8 py-4 whitespace-nowrap text-sm text-white bg-orange-500 cursor-pointer hover:bg-white hover:text-orange-500  transition-colors duration-300 border-2 border-white">Delete</td>
                            </tr>
                        )
                    }
                    else{
                        return (
                            <tr key={c[0]}>
                                <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{c[1]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{c[2]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{c[3]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{c[4]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{c[5]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{c[6]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{c[7]}</td>
                                <td onClick={()=>RenewClient(c[0],c[5])} className="px-8 py-4 whitespace-nowrap text-sm text-white bg-red-500 cursor-pointer hover:bg-white hover:text-red-500  transition-colors duration-300  border-white">Renew</td>
                                <td className="bg-white"></td>
                            </tr>
                        )
                    }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    {showPay?
            
            <div className={`w-full mt-10 z-10 overflow-y-scroll ${heightClass}`}>
            <Elements stripe={stripePromise}>
                <PaymentForm sport={sports} price={prices[offresT]}/>
            </Elements>
        </div>
        :null
    }
    <Notification message={notification} />
    </div>
  );
}

export default ClassTab;
