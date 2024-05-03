import React, { useState,useEffect } from 'react';
import axios from "axios"
function ClassS() {
  const [currentDay, setCurrentDay] = useState(0);
  const [classDetail, setClassDetail] = useState([]);

  const daysTab = ["Monday", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
  const classDetails = [
    [//1
      ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
      ["8.00AM - 10.00AM", "POWER LIFTING", "dio brando"],
      ["10.00AM - 12.00PM", "POWER LIFTING", "dio brando"],
      ["12.00PM - 2.00PM", "POWER LIFTING", "dio brando"],
      ["2.00PM - 4.00PM", "POWER LIFTING", "dio brando"],
      ["4.00PM - 6.00PM", "POWER LIFTING", "dio brando"],
      ["6.00PM - 8.00PM", "POWER LIFTING", "dio brando"],
      ["8.00PM - 10.00PM", "POWER LIFTING", "dio brando"]
    ],
    [//2
      ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
      ["6.00AM - 8.00AM", "POWER LIFTING", "Lorenzo gostafo"],
      ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
      ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
      ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
      ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
      ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
      ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"]
    ],
    [//3
        ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
        ["8.00AM - 10.00AM", "POWER LIFTING", "dio brando"],
        ["10.00AM - 12.00PM", "POWER LIFTING", "dio brando"],
        ["12.00PM - 2.00PM", "POWER LIFTING", "dio brando"],
        ["2.00PM - 4.00PM", "POWER LIFTING", "dio brando"],
        ["4.00PM - 6.00PM", "POWER LIFTING", "dio brando"],
        ["6.00PM - 8.00PM", "POWER LIFTING", "dio brando"],
        ["8.00PM - 10.00PM", "POWER LIFTING", "dio brando"]
      ],
      [//4
        ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
        ["6.00AM - 8.00AM", "POWER LIFTING", "Lorenzo gostafo"],
        ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
        ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
        ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
        ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
        ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
        ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"]
      ],
      [//5
        ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
        ["8.00AM - 10.00AM", "POWER LIFTING", "dio brando"],
        ["10.00AM - 12.00PM", "POWER LIFTING", "dio brando"],
        ["12.00PM - 2.00PM", "POWER LIFTING", "dio brando"],
        ["2.00PM - 4.00PM", "POWER LIFTING", "dio brando"],
        ["4.00PM - 6.00PM", "POWER LIFTING", "dio brando"],
        ["6.00PM - 8.00PM", "POWER LIFTING", "dio brando"],
        ["8.00PM - 10.00PM", "POWER LIFTING", "dio brando"]
      ],
      [//6
        ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
        ["6.00AM - 8.00AM", "POWER LIFTING", "Lorenzo gostafo"],
        ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
        ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
        ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
        ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
        ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
        ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"]
      ],
      [//7
        ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
        ["6.00AM - 8.00AM", "POWER LIFTING", "Lorenzo gostafo"],
        ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
        ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
        ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
        ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
        ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"],
        ["6.00AM - 8.00AM", "POWER LIFTING", "dio brando"]
      ]
  ];
  let T=[
      classDetail,
      classDetail,
      classDetail,
      classDetail,
      classDetail,
      classDetail,
      classDetail
  ]
  useEffect(() => {
    let url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/ProgrammeS";
    axios.get(url).then(response => {
        if (response.data) {
          const newClassDetails = response.data.map(Class => [
            `${Class[1]} - ${Class[2]}`,
            Class[0],
            `${Class[3]} ${Class[4]}`
          ]);
          setClassDetail(newClassDetails);
          }
        console.log(classDetail)
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
          <div key={index} onClick={() => setCurrentDay(index)} className={`hover:bg-red-500 cursor-pointer h-11 rounded-3xl text-white w-[14.29%] flex justify-center items-center ${index === currentDay ? 'bg-red-500' : ''}`}>
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
