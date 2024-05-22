import React,{useState} from 'react'
import full from '../../images/Offer_full.jpg';
import foot from '../../images/Offer_football.jpg';
import box from '../../images/Offer_box.jpg';
function Psportif() {
  const tab = [
    [full, "Join our summer football camp and improve your skills!"],
    [foot, '20% off on all gym memberships this month.'],
    [box, 'Get fit with friends and save on group training sessions.']
  ];
  const [cIndex, setCindex] = useState(0);
  return (
    <div>
      <div className='bg-black w-[100%] h-[300px]  relative lg:h-[685px] group flex  items-center justify-around'>
          <div style={{ backgroundImage: `url(${tab[cIndex][0]})` }} className='w-[60%]  h-[90%] rounded-lg bg-center bg-cover duration-700 flex items-end justify-center p-8'>
              <h2 className='p-4 bg-white/50 text-xl rounded-lg'>{tab[cIndex][1]}</h2>
            </div>
          <div className='w-[35%] h-[90%] flex flex-col justify-around'>
              <div style={{ backgroundImage: `url(${tab[cIndex][0]})` }} className='w-full  h-[49%] rounded-lg bg-center bg-cover duration-700 flex items-end justify-center p-8'>
                <h2 className='p-4 bg-white/50 text-xl rounded-lg'>{tab[cIndex][1]}</h2>
              </div>
              <div style={{ backgroundImage: `url(${tab[cIndex][0]})` }} className='w-full  h-[49%] rounded-lg bg-center bg-cover duration-700 flex items-end justify-center p-8'>
                <h2 className='p-4 bg-white/50 text-xl rounded-lg'>{tab[cIndex][1]}</h2>
              </div>
          </div>
      </div>
      <div>
          <h1>Your programm</h1>
      </div>
    </div>
  )
}

export default Psportif