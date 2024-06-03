import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import RedF from '../images/redField.png';
import GreenF from '../images/greenField.png';
import { useCookies } from 'react-cookie';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from "../sousComp/PayementForm";

const TabReservation = () => {
    const stripePromise = loadStripe('pk_test_51PN2ejLKugBhnMnptyFTTIIqxLXCdDiUtiMsH7UwuNpxl1RiL35DIvWsnpbrNKWrqi38oFrxINmDTOKBHy3OgHwI00VmeRcg0A');
    const [FIndex, setIndex] = useState(0);
    const [tabFields, setTabFields] = useState([RedF, RedF, RedF, RedF, RedF]);
    const [selectFields, setSelectFields] = useState([]);
    const nav = useNavigate();
    const [dateR, setDateR] = useState("");
    const [deHeure, setDeHeure] = useState("");
    const [aHeure, setAHeure] = useState("");
    const [field, setField] = useState("");
    const [pricef, setPricef] = useState(0);
    const [showPay, setshowPay] = useState(false);
    const [payementResponse, setPayementResponse] = useState('');
    const [cookiesU] = useCookies(['userI']);
    const [cookiesA] = useCookies(['userA']);
    const tabDeJour = [
        [0, "Sunday"], [1, "Monday"], [2, "Tuesday"], [3, "Wednesday"], 
        [4, "Thursday"], [5, "Friday"], [6, "Saturday"]
    ];
    const tabDesHeures = [
        ["09:00", "10:00"], ["10:00", "11:00"], ["11:00", "12:00"], ["12:00", "13:00"],
        ["13:00", "14:00"], ["14:00", "15:00"], ["15:00", "16:00"], ["16:00", "17:00"],
        ["17:00", "18:00"], ["18:00", "19:00"], ["19:00", "20:00"], ["20:00", "21:00"],
        ["21:00", "22:00"], ["22:00", "23:00"], ["23:00", "00:00"], ["00:00", "01:00"],
        ["01:00", "02:00"]
    ];
    let tabF = ["1- 5vs5 inside", "2- 5vs5 inside", "3- 5vs5 inside", "4- 5vs5 outside", "5- 6vs6 outside"];
    let tabprice = [150,150,150,150,180];
    const [dayOfTable, setDayOfTable] = useState([]); 
    const [matchDetails, setMatchDetails] = useState({
        debutMatch: [],
        finMatch: [],
        terrainReserved: []
    });
    const handlePaymentS = (data) => {
        setPayementResponse(data);
    };
    console.log(field)
    useEffect(() => {
        let url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/tabReservation/tabRes";
        axios.get(url).then(response => {
            if (response.data) {
                response.data.forEach((day) => { 
                    let d = new Date(day[0]);
                    let dayOfWeek = d.getDay() + day[1];
                    setDayOfTable(prevState => [...prevState, dayOfWeek]);
                    setMatchDetails(prevState => ({
                        ...prevState,
                        debutMatch: { ...prevState.debutMatch, [dayOfWeek]: day[1] },
                        finMatch: { ...prevState.finMatch, [dayOfWeek]: day[2] },
                        terrainReserved: { ...prevState.terrainReserved, [dayOfWeek]: day[3] }
                    }));
                });
            }
        });
    }, []);

    function takeReservation(heureDebut, heureFin, nbDay) {
        let thisJour = new Date();
        let numDay = nbDay.substring(0, 1);
        let diff = numDay - thisJour.getDay();
        thisJour.setDate(thisJour.getDate() + diff);
        let j = thisJour.toISOString().split('T')[0];
        setDateR(j);
        setDeHeure(heureDebut);
        setAHeure(heureFin);
    }

    function checkDate(nbDay) {
        let numDay = nbDay.substring(0, 1);
        let heure = nbDay.substring(1, 3);
        if (heure === '00') heure = 24;
        if (heure === '01') heure = 25;
        let dayJour = new Date();
        let thisJour = new Date();
        let diff = numDay - thisJour.getDay();
        let h = dayJour.getHours();
        let diffHeure = heure - h - 5;
        thisJour.setDate(thisJour.getDate() + diff);
        if (dayJour.getTime() > thisJour.getTime()) {
            return false;
        } else if (dayJour.getTime() === thisJour.getTime()) {
            return diffHeure >= 0;
        } else {
            return true;
        }
    }
    
    function handleReserved(heureDebut, heureFin, nbDay) {
        if (dayOfTable.includes(nbDay)) { 
            if (matchDetails.debutMatch[nbDay] === heureDebut && matchDetails.finMatch[nbDay] === heureFin) { 
                if (matchDetails.terrainReserved[nbDay] === "5") {
                    return (
                        <td key={nbDay} className={checkDate(nbDay) ? "bg-red-500 border-2 border-gray-200" : "bg-red-300 border-2 border-gray-200"}></td>
                    );
                } else {
                    return (
                        <td onClick={() => { checkDate(nbDay) ? takeReservation(heureDebut, heureFin, nbDay) : null }} key={nbDay} className={checkDate(nbDay) ? "bg-orange-500 border-2 border-gray-200" : "bg-orange-300 border-2 border-gray-200"}></td>
                    );
                }
            } else {
                return (
                    <td onClick={() => { checkDate(nbDay) ? takeReservation(heureDebut, heureFin, nbDay) : null }} key={nbDay} className={checkDate(nbDay) ? "bg-green-500 border-2 border-gray-200" : "bg-green-300 border-2 border-gray-200"}></td>
                );
            }
        } else {
            return (
                <td onClick={() => { checkDate(nbDay) ? takeReservation(heureDebut, heureFin, nbDay) : null }} key={nbDay} className={checkDate(nbDay) ? "bg-green-500 border-2 border-gray-200" : "bg-green-300 border-2 border-gray-200"}></td>
            );
        }
    }
    function SubmitUserHandler(){
        setshowPay(true)        
    }
    function SubmitAdminHandler(){
        const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/reserveAdmin";
        const fetchData = async () => {
            let classes = new FormData();
            classes.append("admin",parseInt(cookiesA.userA))
            classes.append("idTerrain",parseInt(field))
            classes.append("DateRes", dateR);
            classes.append("heureDeb", deHeure);
            classes.append("heureFin", aHeure);
            try {
                const response = await axios.post(url, classes);
                if (response.data) {
                   console.log("successfllu insert")
                } else {
                    console.error("Expected an array but got:", response.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }

    const updateNumber = (index, newValue) => {
        setTabFields(prevTabFields => {
            const newTab = [...prevTabFields];
            newTab[index] = newValue;
            return newTab;
        });
    };

    const updateSelectF = (index) =>{
        setSelectFields(prevSelectFields => {
            const newTab = [...prevSelectFields];
            newTab[index] = tabF[index];
            return newTab;
        });
    };

    const updateField = (index) => {
       
    };

    useEffect(() => {
        const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/tabReservation/fields";
        const fetchData = async () => {
            let classes = new FormData();
            classes.append("DateRes", dateR);
            classes.append("heureDeb", deHeure);
            classes.append("heureFin", aHeure);
            try {
                const response = await axios.post(url, classes);
                if (Array.isArray(response.data)) {
                    setTabFields([RedF, RedF, RedF, RedF, RedF]);
                    setSelectFields([]);
                    response.data.forEach((field) => { 
                        let index = parseInt(field[0]) - 1;
                        updateNumber(index, GreenF);
                        updateSelectF(index, selectFields.length);
                    });
                } else {
                    console.error("Expected an array but got:", response.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [dateR, deHeure, aHeure]);

    return (
        <div className='mt-12 md:mt-4 bg-slate-200'>
            <h2 className="text-2xl font-bold text-center mb-8 mt-5">Book Now</h2>
            <div className='w-full flex flex-col items-center md:flex-row md:justify-around'>
                <div className='w-[90%] mb-12 md:mb-0 md:w-[65%]'>
                    <table className='w-full'>
                        <thead className='bg-gray-100 border-b-2 border-gray-200'>
                            <tr>
                                <th className='w-[60px]'></th>
                                {tabDeJour.map((day) => (
                                    <th value={day[0]} key={day[0]} className='p-1 w-[70px] md:w-auto text-[8px] md:text-sm font-bold '>{day[1]}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className='bg-gray-50 border-b-4 border-gray-200'>
                            {tabDesHeures.map((time) => (
                                <tr className='h-[30px]' key={time}>
                                    <th className='p-1 w-[70px] text-[8px] md:text-[10px] font-bold ' value={[time[0], time[1]]}>{time[0]}-{time[1]}</th>
                                    {tabDeJour.map((day) => (
                                        handleReserved(time[0], time[1], day[0] + time[0])
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='flex w-full justify-center mt-3 space-x-6'>
                        <div className='flex space-x-1 justify-center items-center'>
                            <div className='h-3 w-3 bg-green-500'></div>
                            <p>Disponible</p>
                        </div>
                        <div className='flex space-x-1 justify-center items-center'>
                            <div className='h-3 w-3 bg-orange-400'></div>
                            <p>Some Disponible</p>
                        </div>
                        <div className='flex space-x-1 justify-center items-center'>
                            <div className='h-3 w-3 bg-red-500'></div>
                            <p>Booked</p>
                        </div>
                    </div>
                </div>
                <div className='w-[80%] md:w-[30%] flex flex-col items-center rounded-xl border-gray-400 border-2'>
                    <h4 className='text-center leading-10 font-bold w-full h-10 bg-gray-50 border-gray-400 border-b-2 rounded-t-xl'>Online Booking</h4>
                    <div className='w-[60%]'>
                        <div className='flex flex-col my-6'>
                            <label>Date</label>
                            <input type='date' name='date' value={dateR}  className='border-gray-300 border-2 ' />
                        </div>
                        <div className='flex flex-col my-6'>
                            <label>De</label>
                            <input type='text' name='heureDeb' value={deHeure}  className='border-gray-300 border-2 ' />
                        </div>
                        <div className='flex flex-col my-6'>
                            <label>A</label>
                            <input type='text' name='heureFin' value={aHeure}  className='border-gray-300 border-2 ' />
                        </div>
                        <div className='flex flex-col my-6'>
                            <label>Type terrain</label>
                            <select className='border-gray-300 border-2' value={field} onChange={(e) => {setField(e.target.value)
                                                                                                            setPricef(tabprice[e.target.value-1]
                                                                                                                
                                                                                                            )
                            }}>
                                {selectFields.map((c, idx) => (
                                    <option key={idx} value={idx}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col my-6'>
                            <label>Price</label>
                            <input type='text' name='pricef' value={pricef}  className='border-gray-300 border-2 ' />
                        </div>
                        {(cookiesU.userI || cookiesA.userA) && (
                            <input 
                                 
                                className={selectFields.length !== 0 ? "text-center cursor-pointer w-full text-[18px] my-6  rounded-xl bg-red-400 text-white hover:bg-red-600 hover:text-white py-2 duration-300" :
                                                                       "text-center cursor-pointer w-full text-[18px] my-6 rounded-xl bg-gray-500 text-white py-2"}
                                disabled={selectFields.length === 0}
                                value="submit"
                               onClick={cookiesA.userA ? SubmitAdminHandler :cookiesU.userI?SubmitUserHandler:null}
                            />
                        )}
                    </div>
                </div>
            </div>
            {/* Fields section */}
            <div className='w-full flex'>
                <div className='w-[40%] h-[440px] flex mt-8'>
                    <div className='w-[48%] h-full text-center'>
                        <h1>Inside -3*5vs5-</h1>
                        <div className='w-full h-full flex flex-col items-start justify-around'>
                            <div style={{ backgroundImage: `url(${tabFields[0]})` }} onClick={() =>  updateField(0)} className='bg-center bg-cover w-[100%] h-[28%]'></div>
                            <div style={{ backgroundImage: `url(${tabFields[1]})` }} onClick={() =>  updateField(0)} className='bg-center bg-cover w-[100%] h-[28%]'></div>
                            <div style={{ backgroundImage: `url(${tabFields[2]})` }} onClick={() =>  updateField(0)} className='bg-center bg-cover w-[100%] h-[28%]'></div>
                        </div>
                    </div>
                    <div className='w-[48%] h-full text-center'>
                        <h1>Outside -5vs5 & 6vs6-</h1>
                        <div className='w-full h-full flex flex-col items-start justify-start'>
                            <div style={{ backgroundImage: `url(${tabFields[3]})` }} onClick={() =>  updateField(0)} className='mt-3 bg-center bg-cover w-full h-[28%]'></div>
                            <div style={{ backgroundImage: `url(${tabFields[4]})` }} onClick={() =>  updateField(0)} className='mt-3 bg-center bg-cover w-full h-[34%]'></div>
                        </div>
                    </div>
                </div>
                <div className='leading-[440px]'>
                    <h1>Click on the field to choose it</h1>
                </div>
            </div>
            {showPay?
            
                <div className={ 'absolute w-full h-[100vh] top-0 right-0 z-10' }>
                <Elements stripe={stripePromise}>
                    <PaymentForm onData={handlePaymentS} price={pricef} infos={[dateR, deHeure, aHeure,field]}  />
                </Elements>
            </div>
            :null
        }
            
        </div>
    );
}

export default TabReservation;
