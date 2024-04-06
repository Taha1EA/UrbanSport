import React, { useState } from 'react';
import { HiArrowCircleLeft ,HiArrowCircleRight } from "react-icons/hi";
import full from '../images/Offer_full.jpg'
import tae from '../images/Offer_tae.jpg'
import fit from '../images/Offer_fitness.jpg'
import foot from '../images/Offer_football.jpg'
import box from '../images/Offer_box.jpg'


const offersData = [
  { id: 1, title: 'Summer Football Camp', description: 'Join our summer football camp and improve your skills!', image: full },
  { id: 2, title: 'Gym Membership Discount', description: '20% off on all gym memberships this month.', image: box },
  { id: 3, title: 'Group Training Sessions', description: 'Get fit with friends and save on group training sessions.', image: foot },
  { id: 4, title: 'Personal Training Offer', description: 'Book 5 sessions and get 1 free.', image: tae },
  { id: 5, title: 'Yoga Classes', description: 'Experience tranquility and improve flexibility with our yoga classes.', image: fit },
];
const Offers = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + offersData.length) % offersData.length);
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % offersData.length);
    };
  
    const visibleOffers = offersData.slice(currentIndex, currentIndex + 3).concat(offersData.slice(0, Math.max(0, 3 - (offersData.length - currentIndex))));
  
    return (
      <div className=" my-8 mt-[60px] md:mt-[140px]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Our Special Offers</h2>
          
          <div className="flex justify-center items-center gap-8 h-96 w-{200px}">
          <button onClick={handlePrev} className="px-4 py-2 bg-blue-500 text-white rounded h-12"><HiArrowCircleLeft/></button>
            {visibleOffers.map((offer, index) => (
              
              <div key={offer.id} className={`bg-white rounded-lg shadow overflow-hidden flex flex-col items-center ${index === 1 ? 'w-64 h-96' : 'w-48 h-80 '} transform transition-all duration-300 ease-in-out`}>
                {offer.image && (
                  <div className="w-full h-2/3"> 
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="object-cover h-full w-full" 
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{offer.title}</h3>
                  {index === 1 && <p>{offer.description}</p>}
                </div>
              </div>
            ))
            
            }
                        <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded h-12"><HiArrowCircleRight/></button>

          </div>
        </div>
      </div>
    );
  };
  
  export default Offers;