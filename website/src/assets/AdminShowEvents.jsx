import React, { useState, useEffect } from 'react';
import axios from "axios";

function EventUpdate() {
    const [classDetail, setClassDetail] = useState([]);
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/ShowEvents.php";
        try {
            const response = await axios.get(url);
            if (Array.isArray(response.data)) {
                setClassDetail(response.data);
            } else {
                console.error("Expected an array but got:", response.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const deleteEvent = async (idEvent) => {
        const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/deleteEv.php";
        try {
            const response = await axios.post(url, { id: idEvent });
            if (response.data.message === "Event deleted successfully") {
                console.log("Event deleted successfully");
                // Remove the deleted event from state
                setClassDetail(classDetail.filter(event => event.idEvent !== idEvent));
                alert("Event with ID " + response.data.idEvent + " deleted successfully"); // Alert with idEvent
            } else {
                console.error("Failed to delete event");
                alert("Failed to delete event with ID " + response.data.idEvent); // Display idEvent in alert
            }
        } catch (error) {
            console.error("Error deleting event:", error);
            alert("Error deleting event: " + error.message); 
        }
    };
    
    

    const updateEvent = async (idEvent) => {
        
        console.log("Update event with ID:", idEvent);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Event Update</h2>
            {classDetail.map(event => (
                <div key={event.idEvent} className="border rounded-lg p-4 mb-4">
                    <h3 className="text-xl font-bold">{event.nomEvent}</h3>
                    <p>{event.DateDEbEvents} - {event.DateFinEvents} :{event.idEvent}</p>
                    <div className="mt-2">
                        <button onClick={() => updateEvent(event.idEvent)} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">Update</button>
                        <button onClick={() => { if (window.confirm('Are you sure you wish to delete this event?')) deleteEvent(event.idEvent) }} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default EventUpdate;