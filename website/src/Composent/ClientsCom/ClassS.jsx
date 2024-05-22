import React, { useState,useEffect } from 'react';
import axios from "axios"
function ClassS() {
  const [currentDay, setCurrentDay] = useState(0);
  const [classDetail, setClassDetail1] = useState([]);
  const [classDetail2, setClassDetail2] = useState([]);
  const [schedule,setSchedule]=useState([]);
  const daysTab = ["Monday", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY",];
  const days=[[0,2,4],[1,3,5]];
  let T=[
      classDetail,
      classDetail2,
      classDetail,
      classDetail2,
      classDetail,
      classDetail2
  ]
  const showClass = () => {
      

  }
  useEffect(() => {
    const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/ProgrammeS";

    axios.get(url).then(response => {
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
            console.log(NclassDetail1)
            console.log(NclassDetail2)
            setClassDetail1(NclassDetail1);
            setClassDetail2(NclassDetail2);
        } else {
            console.error("Expected an array but got:", response.data);
        }
    }).catch(error => {
        console.error("Error fetching data:", error);
    });
}, []);
  return (
    <div className='flex flex-col items-center w-full'>
      <div className='text-center mb-8'>
        <h3 className='text-red-400 text-xl font-bold'>CLASS SCHEDULE</h3>
        <h1 className='text-5xl font-bold'>WORKING HOURS</h1>
      </div>
      <div className='w-[60%] bg-gray-900 h-11 rounded-3xl flex mb-4'>
        {daysTab.map((day, index) => (
          <div key={index} onClick={() => setCurrentDay(index)} className={`hover:bg-red-500 cursor-pointer h-11 rounded-3xl text-white w-[16.66%] flex justify-center items-center ${index === currentDay ? 'bg-red-500' : ''}`}>
            <h2 className='text-lg'>{day}</h2>
          </div>
        ))}
      </div>
      <div className='w-[90%] flex flex-wrap mb-8 justify-center'>
        {T[currentDay].map((timeSlot, index) => (
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
