import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EventUpdate from './EventUpdate';

const AdminEvents = () => {
  const [formData, setFormData] = useState({
    nomEvent: '',
    DateDEbEvents: '',
    DateFinEvents: '',
    DescriptionEvents: '',
    photoE: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photoE") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length === 0) {
      const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/CreateEvents.php";
      const informations = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        informations.append(key, value);
      });
      axios.post(url, informations, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      .then(response => {
        if (response.data === "Success") {
          setTimeout(() => navigate('/dashboard/events'), 2000);
        } else {
          alert("Failed to create event: " + response.data);
        }
      })
      .catch(error => alert("Error: " + error.message));
    } else {
      setErrors(formErrors);
    }
  };

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.nomEvent.trim()) {
      errors.nomEvent = "Please enter the name of the event";
    }
    if (!formData.DateDEbEvents.trim()) {
      errors.DateDEbEvents = "Please enter the start date";
    }
    if (!formData.DateFinEvents.trim()) {
      errors.DateFinEvents = "Please enter the end date";
    }
    if (!formData.DescriptionEvents.trim()) {
      errors.DescriptionEvents = "Please enter the event description";
    }
    if (!formData.photoE) {
      errors.photoE = "Please upload an image for the event";
    }
    return errors;
  };

  return (
    <>
      <div className="flex flex-col items-center mt-8 space-y-8">
        <div className="bg-gradient-to-r from-blue-400 via-red-500 to-blue-500 p-10 rounded-lg shadow-2xl transform transition duration-500 hover:scale-105">
          <h1 className="text-4xl text-white font-bold text-center mb-6">Add Event</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-full">
              <label className="text-white block mb-2">Name</label>
              <input
                className="w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                type="text"
                name="nomEvent"
                value={formData.nomEvent}
                onChange={handleChange}
              />
              {errors.nomEvent && <div className="text-red-500 mt-1">{errors.nomEvent}</div>}
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="text-white block mb-2">Start Date</label>
                <input
                  className="w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                  type="date"
                  name="DateDEbEvents"
                  value={formData.DateDEbEvents}
                  onChange={handleChange}
                />
                {errors.DateDEbEvents && <div className="text-red-500 mt-1">{errors.DateDEbEvents}</div>}
              </div>
              <div className="w-1/2">
                <label className="text-white block mb-2">End Date</label>
                <input
                  className="w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                  type="date"
                  name="DateFinEvents"
                  value={formData.DateFinEvents}
                  onChange={handleChange}
                />
                {errors.DateFinEvents && <div className="text-red-500 mt-1">{errors.DateFinEvents}</div>}
              </div>
            </div>
            <div className="w-full">
              <label className="text-white block mb-2">Description</label>
              <textarea
                className="w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                name="DescriptionEvents"
                value={formData.DescriptionEvents}
                onChange={handleChange}
              />
              {errors.DescriptionEvents && <div className="text-red-500 mt-1">{errors.DescriptionEvents}</div>}
            </div>
            <div className="w-full">
              <label className="text-white block mb-2">Image</label>
              <input
                className="w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                type="file"
                name="photoE"
                onChange={handleChange}
              />
              {errors.photoE && <div className="text-red-500 mt-1">{errors.photoE}</div>}
            </div>
            <button
              type="submit"
              className="w-full mt-6 py-2 rounded-full bg-white text-pink-500 font-bold hover:bg-pink-500 hover:text-white transition-colors duration-300"
            >
              Save
            </button>
          </form>
        </div>
      </div>
      <EventUpdate />
    </>
  );
}

export default AdminEvents;