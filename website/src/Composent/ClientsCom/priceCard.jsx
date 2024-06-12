import React,{useState} from 'react'
function priceCard({ parentCallback,daysnumber,title, price,index }) {
    const handleType = (e)=>{
        parentCallback(e)
    }
    return (
      <div className="min-w-[250px] mx-auto bg-white rounded-xl shadow-lg  overflow-hidden md:max-w-2xl h-[350px] dark:bg-blue-gray-700">
        
          <div className="md:flex flex-col items-center content-around p-8 ">
            <div className='text-center'>
            <div className="uppercase tracking-wide text-2xl text-red-500 font-semibold">{title}</div>
            <div className="uppercase tracking-wide text-2xl text-red-500 font-semibold">Plan</div>
            </div>
            <h1 className="block mt-12 text-2xl leading-bold font-medium text-black dark:text-white">{price} dhs</h1>
            <h1 className="block mt-4 text-lg leading-light font-medium text-gray-500">
              {/* {discount} discount */}
              </h1>
            <input type='submit' onClick={()=> handleType([daysnumber,price,index])} value="Select" className="mt-8 bg-red-500 text-white px-12 py-2 rounded-md hover:bg-white hover:border-red-500 hover:border-2 hover:text-red-600  transition-colors duration-300 cursor-pointer"/>
          </div>
        
      </div>
    );
  }
  
export default priceCard;
