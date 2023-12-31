import React from 'react'
const EventSection = () => {
  return (
    <section className=' h-auto w-full font-montserrat'>
        <div className='h-[150px]  w-full flex flex-col justify-around items-center bg-gradient-to-t	from-gray-400 to-white'>
            <p className='md:text-lg text-xs p-2 text-balance text-center'>Le plus grand complexe sportif à Marrakech. Venez vivre une expérience unique dans un cadre exceptionnel. </p>
            <button className='bg-black text-gray-300 hover:bg-red-600 transition-colors duration-300 ease-in-out delay-out w-56 h-11 rounded-xl font-bold'>Rejoins UrbanSport</button>
        </div>
        <div className='bg-zinc-950	h-auto sm:py-10 py-5 text-center '>
          <div className='sm:h-[800px] h-[300px] bg-main-B bg-cover bg-no-repeat flex flex-col justify-center items-center'>
            <p className='text-gray-300 sm:text-xl text-lg sm:mb-5'  >UrbanSport est aussi un lieu de vie convivial, de partage, de rencontre entre passionnés de sports urbains collectif en intérieur.</p>
              <h1 className='text-white sm:text-6xl text-3xl sm:mb-5 font-Poppins'>RESERVEZ MAINTENANT</h1>
              <button className='bg-transparant border-2 text-gray-300 hover:bg-cyan-700 transition-colors duration-300 ease-in-out delay-out w-56 h-11 rounded-xl font-bold text-lg'>Reservez</button>
          </div>
        </div>
    </section>
  )
}

export default EventSection