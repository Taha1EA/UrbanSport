import React, { useEffect, useState } from 'react'
import axios from "axios"
const TabReservation = () => {
    const tabDeJour=[1,2,3,4,5,6,7];
    const tabDesHeures=[
        ["09:00","10:00"],["10:00","11:00"],["11:00","12:00"],["12:00","13:00"],
        ["13:00","14:00"],["14:00","15:00"],["15:00","16:00"],["16:00","17:00"],
        ["17:00","18:00"],["18:00","19:00"],["19:00","20:00"],["20:00","21:00"],
        ["21:00","22:00"],["22:00","23:00"],["23:00","00:00"],["00:00","01:00"],
        ["01:00","02:00"]
    ];
    let [res,setRes]=useState();
    useEffect(()=>{
        let url="http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/tabReservation/tabRes.php";
        axios.get(url).then(Response => {
            setRes(Response.data);
        })
    },[])
    console.log(res)
  return (
    <div>
        <h2 className="text-2xl font-bold text-center mb-8">Book Now</h2>
    <div className='w-full flex flex-col items-center md:flex-row  md:justify-around'>
        <div className='w-[90%] mb-12 md:mb-0 md:w-[65%] '>
            <table className='w-full'>
                <thead className='bg-gray-100 border-b-2 border-gray-200'>
                    <tr>
                        <th className='w-[60px]'></th>
                        <th className='p-2 text-[8px] md:text-sm font-bold '>Sunday</th>
                        <th className='p-2 text-[8px] md:text-sm font-bold '>Monday</th>
                        <th className='p-2 text-[8px] md:text-sm font-bold '>Tuesday</th>
                        <th className='p-2 text-[8px] md:text-sm font-bold '>Wednesday</th>
                        <th className='p-2 text-[8px] md:text-sm font-bold '>Thursday</th>
                        <th className='p-2 text-[8px] md:text-sm font-bold '>Friday</th>
                        <th className='p-2 text-[8px] md:text-sm font-bold '>Saturday</th>
                    </tr>
                </thead>
                <tbody className='bg-gray-50 border-b-4 border-gray-200'>
                    {tabDesHeures.map((time)=>{
                       return( <tr className='h-[30px]' key={time}>
                        <th className='p-1 w-[70px]  text-[8px] md:text-[10px] font-bold ' >{time[0]}-{time[1]}</th>
                        <td className='border-2 border-gray-200'></td>
                        <td className='border-2 border-gray-200'></td>
                        <td className='border-2 border-gray-200'></td>
                        <td className='border-2 border-gray-200'></td>
                        <td className='border-2 border-gray-200'></td>
                        <td className='border-2 border-gray-200'></td>
                        <td className='border-2 border-gray-200'></td>
                         </tr>)
                    })} 
                </tbody>
            </table>
            <div className='flex w-full justify-center mt-3 space-x-6'>
                <div className='flex space-x-1 justify-center items-center'>
                    <div className='h-3 w-3 bg-green-500'></div>
                    <p> Disponible</p>
                </div >
                <div className='flex  space-x-1 justify-center items-center'>
                    <div className='h-3 w-3 bg-orange-400'></div>
                    <p>some Disponible</p>
                </div>
                <div className='flex  space-x-1 justify-center items-center'>
                    <div className='h-3 w-3 bg-red-500'></div>
                    <p>Booked</p>
                </div>
            </div>
        </div>
        <div className='w-[80%]   md:w-[30%] flex flex-col items-center rounded-xl border-gray-400 border-2'>
            <h4 className='text-center leading-10 font-bold w-full h-10 bg-gray-50 border-gray-400 border-b-2 rounded-t-xl'>Online Booking</h4>
            <div className='w-[60%]'>
                <div className='flex flex-col my-6'>
                    <label>Date</label>
                    <input type='date' name='date' className='border-gray-300 border-2 '/>
                </div>
                <div className='flex flex-col my-6'>
                    <label>De</label>
                    <input type='text' name='heureDeb' className='border-gray-300 border-2 '/>
                </div>
                <div className='flex flex-col my-6'>
                    <label>A</label>
                    <input type='text' name='heureFin' className='border-gray-300 border-2 '/>
                </div>
                <div className='flex flex-col my-6'>
                    <label>Type terrain</label>
                    <select className='border-gray-300 border-2 '>
                        <option>5 vs 5</option>
                        <option>6 vs 6</option>
                    </select>
                </div>
                <div>
                    <input type="submit" className='cursor-pointer w-full  text-[15px] my-6 rounded-xl bg-red-500 text-yellow-50 hover:bg-red-300 hover:text-white py-2  duration-300'/>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default TabReservation