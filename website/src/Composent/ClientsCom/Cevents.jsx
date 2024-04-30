import React, { useEffect, useState } from 'react'
import {NavLink } from "react-router-dom"
import full from '../../images/Offer_full.jpg';
import foot from '../../images/Offer_football.jpg';
import box from '../../images/Offer_box.jpg';
function Cevents() {
  const [event,setEvent]=useState("all");
  const TypeEvent = (e) =>{
    setEvent(e.target.value);
  };
  const eventsData = [
    { id: 1, title: 'Football league', description: 'Join our summer football camp and improve your skills!', date: "April 19", image: full },
    { id: 2, title: 'Karate tournament', description: '20% off on all gym memberships this month.', date: "May 5", image: box },
    { id: 3, title: 'Fitness updates', description: 'Get fit with friends and save on group training sessions.', date: "April 19", image: foot },
    // Add more events here as needed
  ];
  return (
    <div className='flex flex-col items-center'>
        <div className='my-4 flex justify-center'>
            <select onChange={TypeEvent} className='py-2 px-8 rounded-md '>
                <option value="all">All Events</option>
                <option value="football">football Events</option>
                <option value="fitness">Fitness Events</option>
            </select>
        </div>
        <div className="w-[90%] flex flex-col justify-around mt-8 mb-20">
            {eventsData.map((event) => (
                <div key={event.id} className="flex bg-white rounded-lg shadow overflow-hidden w-full mb-4">
                {event.image && (
                    <img src={event.image} alt={event.title} className="w-[30%] h-full object-cover" />
                )}
                <div className="p-4">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <p>{event.description}</p>
                    <p className="text-sm mt-4">{event.date}</p>
                    <div className='mt-28'>
                        <NavLink to="/Main/accueil" className='bg-blue-500 text-white py-2 px-4 rounded-md '>Register</NavLink>
                    </div>
                </div>
                </div>
            ))}
            </div>
    </div>
  )
}

export default Cevents