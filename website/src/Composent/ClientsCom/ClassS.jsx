import React from 'react'

function ClassS() {
  const daysTab=["Monday","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY","SUNDAY"]
  const classDetails=[["6.00AM - 8.00AM","POWER LIFTING","dio brando"],
  ["6.00AM - 8.00AM","POWER LIFTING","dio brando"],["6.00AM - 8.00AM","POWER LIFTING","dio brando"],
  ["6.00AM - 8.00AM","POWER LIFTING","dio brando"],["6.00AM - 8.00AM","POWER LIFTING","dio brando"],
  ["6.00AM - 8.00AM","POWER LIFTING","dio brando"],["6.00AM - 8.00AM","POWER LIFTING","dio brando"],
  ["6.00AM - 8.00AM","POWER LIFTING","dio brando"]];
  return (
    <div className='flex flex-col items-center w-full'>
        <div className='text-center mb-8'>
            <h3 className='text-red-400 text-xl font-bold'>CLASS SCHEDULE</h3>
            <h1 className='text-5xl font-bold'>WORKING HOURS</h1>
        </div>
        <div className='w-[60%] bg-gray-900 h-11 rounded-3xl flex mb-4'>
            {daysTab.map((dayT, index) => (
                <div key={index} className='hover:bg-red-500 cursor-pointer h-11 rounded-3xl text-white w-[14.29%] flex justify-center items-center'>
                    <h2 className='text-lg'>{dayT}</h2>
                 </div>
            ))}
        </div>
        <div className='w-[90%] flex flex-wrap mb-8 justify-center'>
            {classDetails.map((calssD,index)=>(
                <div key={index} className='bg-gray-900 w-[23%] h-32 text-center mr-4 mt-4 p-4'>
                    <h3 className='text-lg  text-gray-300'>{calssD[0]}</h3>
                    <h1 className='text-xl text-bold text-orange-600'>{calssD[1]}</h1>
                    <h3 className='text-lg text-gray-300'>{calssD[2]}</h3>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ClassS