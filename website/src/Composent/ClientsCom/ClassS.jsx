import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from "axios";

function ClassS() {
  const [currentDay, setCurrentDay] = useState(0);
  const [classDetail1, setClassDetail1] = useState([]);
  const [classDetail2, setClassDetail2] = useState([]);
  const [T, setT] = useState([]);
  const [cookies] = useCookies(['userI']);
  
  const daysTab = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/ProgrammeS";
    const fetchData = async () => {
      if (cookies.userI) {
        let classes = new FormData();
        classes.append("idClient", (cookies.userI));
        try {
          const response = await axios.post(url, classes);
          if (Array.isArray(response.data)) {
            const NclassDetail1 = response.data
              .filter(Class => Class[5] == 1)
              .map(Class => [
                `${Class[1]} - ${Class[2]}`,
                Class[0],
                `${Class[3]} ${Class[4]}`
              ]);
            const NclassDetail2 = response.data
              .filter(Class => Class[5] == 2)
              .map(Class => [
                `${Class[1]} - ${Class[2]}`,
                Class[0],
                `${Class[3]} ${Class[4]}`
              ]);
            setClassDetail1(NclassDetail1);
            setClassDetail2(NclassDetail2);
            setT([
              NclassDetail1,
              NclassDetail2,
              NclassDetail1,
              NclassDetail2,
              NclassDetail1,
              NclassDetail2
            ]);
          } else {
            console.error("Expected an array but got:", response.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        try {
          const response = await axios.get(url);
          const NclassDetail = response.data.map(Class => [
            `${Class[1]} - ${Class[2]}`,
            Class[0],
            `${Class[3]} ${Class[4]}`
          ]);
          setClassDetail2(NclassDetail);
          setT([
            NclassDetail,
            NclassDetail,
            NclassDetail,
            NclassDetail,
            NclassDetail,
            NclassDetail
          ]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [T]);

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='text-center mb-8'>
        <h3 className='text-red-400 text-xl font-bold'>CLASS SCHEDULE</h3>
        <h1 className='text-5xl font-bold'>WORKING HOURS</h1>
      </div>
      <div className='w-[80%] bg-gray-900 h-11 rounded-3xl flex mb-4'>
        {daysTab.map((day, index) => (
          <div 
            key={index} 
            onClick={() => setCurrentDay(index)} 
            className={`hover:bg-red-500 cursor-pointer h-11 rounded-3xl text-white w-[16.66%] flex justify-center items-center ${index === currentDay ? 'bg-red-500' : ''}`}
          >
            <h2 className='text-lg'>{day}</h2>
          </div>
        ))}
      </div>
      <div className='w-[90%] flex flex-wrap mb-8 justify-center'>
        {T[currentDay] && T[currentDay].map((timeSlot, index) => (
          <div key={index} className='bg-gray-900 w-[23%] h-32 text-center mr-4 mt-4 p-4'>
            <h3 className='text-lg text-gray-300'>{timeSlot[0]}</h3>
            <h1 className='text-xl text-bold text-orange-600'>{timeSlot[1]}</h1>
            <h3 className='text-lg text-gray-300'>{timeSlot[2]}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClassS;
