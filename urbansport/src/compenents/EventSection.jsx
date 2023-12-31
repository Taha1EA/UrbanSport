import React from 'react'
const EventSection = () => {
  return (
    <section className='mt-[110px] h-[400px] w-full font-montserrat'>
        <div className='h-[150px]  w-full flex flex-col justify-around items-center '
          style={{
            backgroundImage: 'url("../assets/images/download.jpeg")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
            <p className='md:text-lg text-xs p-2'>Le plus grand complexe sportif à Marrakech. Venez vivre une expérience unique dans un cadre exceptionnel. </p>
            <button className='bg-black text-gray-300 w-56 h-11 rounded-xl hover:w-52 hover:text-white'>Rejoins UrbanSport</button>
        </div>
        <div></div>
    </section>
  )
}

export default EventSection