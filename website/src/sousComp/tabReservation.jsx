import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"
const TabReservation = () => {
    const nav=useNavigate();
    const [dateR,setDateR]=useState("");
    const [deHeure,setDeHeure]=useState("");
    const [aHeure,setAHeure]=useState("");
    const tabDeJour=[[0,"Sunday"],[1,"Monday"],[2,"Tuesday"],[3,"Wednesday"],[4,"Thursday"],[5,"Friday"],[6,"Saturday"]];
    const tabDesHeures=[
        ["09:00","10:00"],["10:00","11:00"],["11:00","12:00"],["12:00","13:00"],
        ["13:00","14:00"],["14:00","15:00"],["15:00","16:00"],["16:00","17:00"],
        ["17:00","18:00"],["18:00","19:00"],["19:00","20:00"],["20:00","21:00"],
        ["21:00","22:00"],["22:00","23:00"],["23:00","00:00"],["00:00","01:00"],
        ["01:00","02:00"]
    ];
    const [dayOfTable,setDayOfTable]=useState([]); 
    const [matchDetails, setMatchDetails] = useState({
        debutMatch: {},
        finMatch: {},
        terrainReserved: {}
      });
    useEffect(()=>{
        let url="http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/tabReservation/tabRes.php";
        axios.get(url).then(Response => {
            Response.data?Response.data.map( (day)=>{
                let d=  new Date(day[0]);
                let dayOfweek=d.getDay();
                setDayOfTable(prevState => [...prevState, dayOfweek]);
                setMatchDetails(prevState => ({
                    ...prevState,
                    debutMatch: { ...prevState.debutMatch, [dayOfweek]: day[1] },
                    finMatch: { ...prevState.finMatch, [dayOfweek]: day[2] },
                    terrainReserved: { ...prevState.terrainReserved, [dayOfweek]: day[3] }
                  }));
            }):null
        })
    },[])
    function takeReservation(heureDebut,heureFin,nbDay){
        let thisJour=new Date();
        let diff=nbDay-thisJour.getDay();
        thisJour.setDate(thisJour.getDate()+diff);
        let j=thisJour.toISOString().split('T')[0];
        setDateR(j);
        setDeHeure(heureDebut);
        setAHeure(heureFin);
    }
    function checkDate(nbDay, heureDebut){
        let dayJour=new Date();
        let thisJour=new Date();
        let diff=nbDay-thisJour.getDay();
        let h=dayJour.getHours()
        // console.log(heureDebut)
        thisJour.setDate(thisJour.getDate()+diff)
        if(dayJour.getTime()>thisJour.getTime()){
            return false;
            
        }
        else{
            return true;
        }
    }
    function handleReserved(heureDebut,heureFin,nbDay){
        if(dayOfTable.includes(nbDay)){   
            if(matchDetails.debutMatch[nbDay]==(heureDebut) && matchDetails.finMatch[nbDay]==heureFin){     
                    if(matchDetails.terrainReserved[nbDay]=="5"){
                       return ( <td key={nbDay} className={checkDate(nbDay,heureDebut)?"bg-red-500 border-2 border-gray-200":"bg-red-300 border-2 border-gray-200"}></td> )
                    }
                    else {
                        return (<td onClick={() => {checkDate(nbDay,heureDebut)?takeReservation(heureDebut, heureFin, nbDay):null}} key={nbDay} className={checkDate(nbDay)?"bg-orange-500 border-2 border-gray-200":"bg-orange-300 border-2 border-gray-200"}></td>)
                    }
                }
                else{
                    return (<td onClick={() => {checkDate(nbDay,heureDebut)?takeReservation(heureDebut, heureFin, nbDay):null}} key={nbDay} className={checkDate(nbDay)?"bg-green-500 border-2 border-gray-200":"bg-green-300 border-2 border-gray-200"}></td>)
                }
            }
            else{
                return (<td onClick={() => {checkDate(nbDay,heureDebut)?takeReservation(heureDebut, heureFin, nbDay):null}} key={nbDay} className={checkDate(nbDay)?"bg-green-500 border-2 border-gray-200":"bg-green-300 border-2 border-gray-200"}></td>)
            }
    }
    function SubmitHandler(){
        setTimeout( ()=>nav('/Log'),2000)
    
    }

  return (
    <div className='mt-[100px] md:mt-[150px] bg-slate-200'>
        <h2 className="text-2xl font-bold text-center mb-8 mt-5">Book Now</h2>
    <div className='w-full flex flex-col items-center md:flex-row  md:justify-around'>
        <div className='w-[90%] mb-12 md:mb-0 md:w-[65%] '>
            <table className='w-full'>
                <thead className='bg-gray-100 border-b-2 border-gray-200'>
                    <tr>
                        <th className='w-[60px]'></th>
                        {tabDeJour.map((day)=>{
                            return(
                                <th value={day[0]} key={day[0]} className='p-2 text-[8px] md:text-sm font-bold '>{day[1]}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody className='bg-gray-50 border-b-4 border-gray-200'>
                    {tabDesHeures.map((time)=>{
                       return( <tr className='h-[30px]' key={time}>
                        <th className='p-1 w-[70px]  text-[8px] md:text-[10px] font-bold ' value={[time[0],time[1]]} >{time[0]}-{time[1]}</th>
                        {tabDeJour.map((day)=>(
                            handleReserved(time[0],time[1],day[0])
                        ))}
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
                    <input type='date' name='date' value={dateR} onInput={(e)=>setDateR(e.target.value)} className='border-gray-300 border-2 '/>
                </div>
                <div className='flex flex-col my-6'>
                    <label>De</label>
                    <input type='text' name='heureDeb' value={deHeure} onInput={(e)=>setDateR(e.target.value)} className='border-gray-300 border-2 '/>
                </div>
                <div className='flex flex-col my-6'>
                    <label>A</label>
                    <input type='text' name='heureFin' value={aHeure} onInput={(e)=>setDateR(e.target.value)} className='border-gray-300 border-2 '/>
                </div>
                <div className='flex flex-col my-6'>
                    <label>Type terrain</label>
                    <select className='border-gray-300 border-2 '>
                        <option>5 vs 5</option>
                        <option>6 vs 6</option>
                    </select>
                </div>
                <div>
                    <input type="submit" onClick={SubmitHandler} className='cursor-pointer w-full  text-[15px] my-6 rounded-xl bg-red-500 text-yellow-50 hover:bg-red-300 hover:text-white py-2  duration-300'/>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default TabReservation