import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import AdminShowEvents from './AdminShowEvents';
const AdminEvents = () => {
  const [formData, setFormData] = useState({
    nomEvent: '',
    DateDEbEvents: '',
    DateFinEvents: '',
    DescriptionEvents: '',
    idAdminA: '',
    photoE: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  ///////////////////







 
////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length === 0) {
      const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/CreateEvents.php";
      const informations = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        informations.append(key, value);
      });
      axios.post(url, informations)
        .then(response => {
          if (response.data === "Success") {
            setTimeout(() => navigate('/dashboard/events'), 2000);
          }
        })
        .catch(error => alert(error));
    } else {
      setErrors(formErrors);
    }
  };

  const validateForm = (formData) => {
    const errors = {};
  
     if (!formData.nomEvent.trim()) {
   errors.nomEvent = "Please enter the name of the event";
    }
    return errors;
  };

  return (<>
    <div className='text-black  justify-center items-center mt-23'>
      
      <div className='bg-[#3e4aec] border  border-[#444444] rounded-md p-8 shadow-lg '>
        <h1 className="text-4xl text-white font-bold text-center mb-6">Add Event</h1>
        <form onSubmit={handleSubmit}>
          {/* Your form fields */}
          <div className='w-64'>
		  <p className='text-white'>Name</p>
          <input className='text-black'  type="text" name="nomEvent"  value={formData.nomEvent} onChange={handleChange} />                    
          {errors.nomEvent && <div className="text-red-500">{errors.nomEvent}</div>}
		  </div>
          <div className='flex'>
          
      <div className='w-64'>
		  <p className='text-white'>DateDEbEvents</p>
		  <input className='text-black' type="date" name="DateDEbEvents" value={formData.DateDEbEvents} onChange={handleChange} />
          {errors.DateDEbEvents && <div className="text-red-500">{errors.DateDEbEvents}</div>}
		  </div>
		  <div className='w-64'>
		  <p className='text-white'>DateFinEvents</p>
		  <input className='text-black' type="date" name="DateFinEvents" value={formData.DateFinEvents} onChange={handleChange} />
          {errors.DateFinEvents && <div className="text-red-500">{errors.DateFinEvents}</div>}
		  </div>
      </div>
      
		  <div className='w-64'>
		  <p className='text-white'>DescriptionEvents</p>
		  <textarea className='text-black' name="DescriptionEvents" value={formData.DescriptionEvents} onChange={handleChange} />
          {errors.DescriptionEvents && <div className="text-red-500">{errors.DescriptionEvents}</div>}
		  </div>
		  <div className='w-64'>
      <p className='text-white'>image :</p>
          <input className='text-black' type="file" name="photoE" onChange={handleChange} />
          </div>
          
          {errors.photoE && <div className="text-red-500">{errors.photoE}</div>}
          <button type="submit" className='cursor-pointer w-full mb-4 text-[15px] mt-6 rounded-full bg-gray-800 text-yellow-50 hover:bg-yellow-50 hover:text-gray-800 py-2 transition-colors duration-300'>Save</button>
        </form>
      </div>
      
    </div>
    <AdminShowEvents/>
    </>
  );
}

export default AdminEvents;
