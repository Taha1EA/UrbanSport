import React from 'react';
import full from '../images/Offer_full.jpg';
import tae from '../images/Offer_tae.jpg';
import fit from '../images/Offer_fitness.jpg';
import foot from '../images/Offer_football.jpg';
import box from '../images/Offer_box.jpg';

const eventsData = [
  { id: 1, title: 'Football league', description: 'Join our summer football camp and improve your skills!', date: "April 19", image: full },
  { id: 2, title: 'Karate tournament', description: '20% off on all gym memberships this month.', date: "May 5", image: box },
  { id: 3, title: 'Fitness updates', description: 'Get fit with friends and save on group training sessions.', date: "April 19", image: foot },
  // Add more events here as needed
];

const Events = () => {
  return (
    <div className="my-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsData.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden">
              {event.image && (
                <img src={event.image} alt={event.title} className="w-full h-56 object-cover" />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p>{event.description}</p>
                <p className="text-sm mt-4">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
