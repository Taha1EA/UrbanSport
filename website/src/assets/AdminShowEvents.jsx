import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AdminShowEvents.css" // Assuming you save your CSS in this file

const AdminShowEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/ShowEvents.php")
            .then(response => {
                setEvents(response.data);
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

    return (
        <>
            <h1>Events</h1>
            <div className="grid">
            <table className="event-table">
                            <thead>
                                <tr>
                                    <th>ID Event</th>
                                    <th>Nom Event</th>
                                    <th>Date Début</th>
                                    <th>Date Fin</th>
                                </tr>
                            </thead>
                {events.map(event => (
                                <tr key={event.idEvent} className="event-container">
                                    <td>{event.idEvent}</td>
                                    <td>{event.nomEvent.slice(0, 15).toUpperCase()}</td>
                                    <td>{event.DateDEbEvents.slice(0, 100)}</td>
                                    <td>{event.DateFinEvents.slice(0, 100)}</td>
                                </tr>
                ))}
                </table>
            </div>
        </>
    );
};

export default AdminShowEvents;
