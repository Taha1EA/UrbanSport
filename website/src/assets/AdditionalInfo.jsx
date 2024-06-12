import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CompleteRegistration = () => {
  const nav = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [nationalId, setNationalId] = useState('');

  const handleSubmit = () => {
    const url = "http://localhost/UrbanSportW/UrbanSport/UrbanSport-Backend-/UrbanSport/additonalInfo.php";
    const data = new FormData();
    data.append('email', email);
    data.append('firstName', firstName);
    data.append('lastName', lastName);
    data.append('phone', phone);
    data.append('nationalId', nationalId);
    axios.post(url, data)
      .then(response => {
        if (response.data.status === 'success') {
          nav('/Log');  // navigate to a welcome or home page after success
        } else {
          alert('Failed to update information');
        }
      })
      .catch(error => alert(error));
  };

  return (
    <div className='text-white h-[100vh] flex flex-col justify-center items-center bg-black'>
      <div className='bg-[#161616] border border-[#444444] rounded-md p-8 shadow-lg relative'>
        <h1 className="text-4xl text-white font-bold text-center mb-6">Additional Information</h1>
        <div className="relative my-4">
          <input onInput={(e) => setFirstName(e.target.value)} type="text" name="firstName" id="firstName" placeholder='' className='block w-72 py-2.5 pl-2 px-0 text-sm text-white bg-[#0c0b0b] border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:text-white focus:border-white peer' />
          <label htmlFor="firstName" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>First Name</label>
        </div>
        <div className="relative my-4">
          <input onInput={(e) => setLastName(e.target.value)} type="text" name="lastName" id="lastName" placeholder='' className='block w-72 py-2.5 pl-2 px-0 text-sm text-white bg-[#0c0b0b] border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:text-white focus:border-white peer' />
          <label htmlFor="lastName" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Last Name</label>
        </div>
        <div className="relative my-4">
          <input onInput={(e) => setPhone(e.target.value)} type="text" name="phone" id="phone" placeholder='' className='block w-72 py-2.5 pl-2 px-0 text-sm text-white bg-[#0c0b0b] border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:text-white focus:border-white peer' />
          <label htmlFor="phone" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Telephone</label>
        </div>
        <div className="relative my-4">
          <input onInput={(e) => setNationalId(e.target.value)} type="text" name="nationalId" id="nationalId" placeholder='' className='block w-72 py-2.5 pl-2 px-0 text-sm text-white bg-[#0c0b0b] border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:text-white focus:border-white peer' />
          <label htmlFor="nationalId" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>National ID</label>
        </div>
        <input type='submit' onClick={handleSubmit} value="Submit" className='cursor-pointer w-full mb-4 mt-6 rounded-full bg-gray-800 text-yellow-50 hover:bg-yellow-50 hover:text-gray-800 py-2 transition-colors duration-300' />
      </div>
    </div>
  );
}

export default CompleteRegistration;

