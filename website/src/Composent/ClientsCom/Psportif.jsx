import React,{useState,useEffect} from 'react'
import BodyB from '../../images/bodyBuilding.jpg';
import Cardio from '../../images/cardio.jpg';
import CrossFit from '../../images/crossFit.png';
import Fitness from '../../images/fitness.jpg';
import Loss from '../../images/lose.jpg';
import MuscleB from '../../images/muscleB.jpg';
import PowerL from '../../images/powerLifting.jpg';
import ClassTab from "../ClientsCom/ClassTab.jsx";
import AddPro from "../ClientsCom/addPro.jsx";
import Footer from "../../assets/Footer.jsx"
function Psportif() {
  const tab1 = [CrossFit,BodyB,Cardio];
  const tab2 = [PowerL];
  const tab3 = [MuscleB,Fitness,Loss];
  const [cIndex1, setCindex1] = useState(0);
  const [cIndex2, setCindex2] = useState(0);
  const [cIndex3, setCindex3] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if(cIndex1<2){
        setCindex1(cIndex1 + 1);
        setCindex3(cIndex3 + 1);
      }
      else{
        setCindex1(0);
        setCindex3(0);  
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [cIndex1]);
  return (
    <div>
      <div className='dark:bg-blue-gray-900  w-[100%] h-[300px]  relative lg:h-[685px] group flex  items-center justify-around'>
          <div style={{ backgroundImage: `url(${tab1[cIndex1]})` }} className='w-[60%]  h-[90%] rounded-lg bg-center bg-cover duration-700 flex items-end justify-center p-8'>
              {/* <h1 className='p-4 bg-white/50 text-xl rounded-lg'>BE patient</h1> */}
            </div>
          <div className='w-[35%] h-[90%] flex flex-col justify-around'>
              <div style={{ backgroundImage: `url(${tab2[cIndex2]})` }} className='w-full  h-[49%] rounded-lg bg-center bg-cover duration-700 flex items-end justify-center p-8'>
               </div>
              <div style={{ backgroundImage: `url(${tab3[cIndex3]})` }} className='w-full  h-[49%] rounded-lg bg-center bg-cover duration-700 flex items-end justify-center p-8'>
              </div>
          </div>
      </div>
      <div className='py-5 dark:bg-blue-gray-900 '>
          <ClassTab/>
      </div>
      <div className='pt-5 h-[full] dark:bg-blue-gray-900 '>
          <AddPro/>
      </div>
      <div >
          <Footer/>
      </div>
    </div>
  )
}

export default Psportif