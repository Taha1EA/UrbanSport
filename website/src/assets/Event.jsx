import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DarkModeToggle.css';
const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/Showevents.php")
        .then(response => {
            console.log(response.data);
            if (Array.isArray(response.data)) {
                setEvents(response.data);
            } else {
                setError("Invalid response format");
            }
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const imagePath = 'http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/uploads/';
  return (
    <div className="my-8">
      <div className="container mx-auto px-4 dark:bg-blue-gray-800">
        <h2 className="text-2xl font-bold text-center mb-8 dark:text-white">Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.idEvent} className="bg-white rounded-lg drop-shadow-2xl overflow-hidden dark:bg-blue-gray-800 dark:text-white">
              {event.photoE && (
                <img src={imagePath+event.photoE} alt={event.nomEvents} className="w-full h-56 object-cover" />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold">{event.nomEvent}</h3>
              
                <p className="text-sm mt-4">{event.DescriptionEvents}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Event;