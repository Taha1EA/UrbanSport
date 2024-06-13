import React, { useState, useEffect } from 'react';
import axios from "axios";
import Notification from '../Composent/ClientsCom/Notification';
function EventUpdate() {
    const [eventDetail, seteventDetail] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);
    const [formData, setFormData] = useState({
        nameEvent: '',
        description: '',
        dateDebutEvent: '',
        dateFinEvent: '',
        image: null
    });
    const [currentImage, setCurrentImage] = useState('');
    const [notification,setNotification]=useState();
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/ShowEvents.php";
        try {
            const response = await axios.get(url);
            if (Array.isArray(response.data)) {
                seteventDetail(response.data);
            } else {
                console.error("Expected an array but got:", response.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const deleteEvent = (Event) => {
        const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/deleteEv.php";
        const fetchData = async () => {
            if (Event) {
                let classes = new FormData();
                classes.append("idEvent", parseInt(Event));
                try {
                    const response = await axios.post(url, classes);
                    if (response.data) {
                        setNotification('Event deleted  successfully');
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    } else {
                        console.error("Expected an array but got:", response.data);
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };
        fetchData();
    };

    const startEditEvent = (event) => {
        setEditingEvent(event.idEvent);
        setFormData({
            nameEvent: event.nomEvent,
            description: event.DescriptionEvents,
            dateDebutEvent: event.DateDEbEvents,
            dateFinEvent: event.DateFinEvents,
            image: null // Image will be handled separately
        });
        setCurrentImage(event.photoE);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const updateEvent = async (idEvent) => {
        const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/updateEv.php";
        let form = new FormData();
        form.append("idEvent", idEvent);
        form.append("nameEvent", formData.nameEvent);
        form.append("description", formData.description);
        form.append("dateDebutEvent", formData.dateDebutEvent);
        form.append("dateFinEvent", formData.dateFinEvent);
        form.append("currentImage", currentImage); // Send the current image URL/path
        if (formData.image) {
            form.append("image", formData.image);
        }
        try {
            const response = await axios.post(url, form);
            if (response.data) {
                setNotification("Update successfully");
                setTimeout(() => {
                    setNotification("");
                }, 2000);
                setEditingEvent(null);
                fetchData(); // Re-fetch data to update the list
            } else {
                console.error("Expected an array but got:", response.data);
            }
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    const imagePath = 'http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/uploads/';
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Event Update</h2>
            {eventDetail.map(event => (
                <div key={event.idEvent} className="border rounded-lg p-4 mb-4 dark:bg-blue-gray-600 dark:text-white">
                    {editingEvent === event.idEvent ? (
                        <div>
                            <input
                                type="text"
                                name="nameEvent"
                                value={formData.nameEvent}
                                onChange={handleInputChange}
                                placeholder="Event Name"
                                className="block mb-2"
                            />
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Description"
                                className="block mb-2"
                            />
                            <input
                                type="date"
                                name="dateDebutEvent"
                                value={formData.dateDebutEvent}
                                onChange={handleInputChange}
                                className="block mb-2"
                            />
                            <input
                                type="date"
                                name="dateFinEvent"
                                value={formData.dateFinEvent}
                                onChange={handleInputChange}
                                className="block mb-2"
                            />
                            {currentImage && (
                                <div className="mb-2">
                                    <img src={imagePath+currentImage} alt="Event" style={{ width: '100px', height: '100px' }} />
                                </div>
                            )}
                            <input
                                type="file"
                                name="image"
                                onChange={handleImageChange}
                                className="block mb-2"
                            />
                            <button onClick={() => updateEvent(event.idEvent)} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">Save</button>
                            <button onClick={() => setEditingEvent(null)} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <h3 className="text-xl font-bold">{event.nomEvent}</h3>
                            <p>{event.DateDEbEvents} - {event.DateFinEvents} : {event.idEvent}</p>
                            <p>{event.DescriptionEvents}</p>
                            {event.photoE && (
                                <img src={imagePath+event.photoE} alt="Event" style={{ width: '100px', height: '100px' }} />
                            )}
                            <div className="mt-2">
                                <button onClick={() => startEditEvent(event)} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">Update</button>
                                <button onClick={() => { if (window.confirm('Are you sure you wish to delete this event?')) deleteEvent(event.idEvent) }} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            <Notification message={notification}/>
        </div>
    );
}

export default EventUpdate;