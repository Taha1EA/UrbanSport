import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Notification from '../ClientsCom/Notification';
const Reg = () => {
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/; // Assuming a 10-digit phone number
  const [notification, setNotification] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [rpass, setRpass] = useState('');
  const [CNIE, setCNIE] = useState('');
  const [errors, setErrors] = useState({});

  const nav = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (nom.length === 0) {
      newErrors.nom = 'Write your name please';
    }
    if (!emailRegex.test(email)) {
      newErrors.email = 'Enter a valid email please';
    }
    if (!passRegex.test(pass)) {
      newErrors.pass = 'Password should contain at least one number and one special character (+8 characters)';
    }
    if (pass !== rpass) {
      newErrors.rpass = 'Confirm your password correctly please';
    }
    if (CNIE.length === 0) {
      newErrors.CNIE = 'CNIE cannot be empty';
    }
    if (!phoneRegex.test(phone)) {
      newErrors.phone = 'Enter a valid phone number please';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const url = 'http://localhost/UrbanSportW/UrbanSport/UrbanSport-Backend-/UrbanSport/logReg/register';
      let informations = new FormData();
      informations.append('nom', nom);
      informations.append('email', email);
      informations.append('pass', pass);
      informations.append('CNIE', CNIE);
      informations.append('firstName', firstName);
      informations.append('lastName', lastName);
      informations.append('phone', phone);
      try {
        const response = await axios.post(url, informations);
        if (response.data === 'Success') {
          setNotification('Register successfully');
          setTimeout(() => {
              nav('/Log');
          }, 2000);
          
        } else {
          alert('Registration failed');
        }
      } catch (error) {
        alert('An error occurred during registration');
      }
    }
  };

  return (
    <div className='text-black h-[100vh] flex justify-center items-center bg-white'>
      
      <div className='bg-white border border-[#444444] rounded-md p-8 shadow-lg relative'>
        <h1 className='text-4xl text-black font-bold text-center mb-6'>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col md:flex-row'>
            <div className='relative my-4'>
              <input
                onInput={e => setNom(e.target.value)}
                type='text'
                name='nom'
                id='name'
                placeholder=''
                className='block w-52 py-2.5 pl-2 px-0 text-sm text-black bg-white border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:text-black focus:border-white peer'
              />
              <label
                htmlFor='name'
                className='absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Username
              </label>
              {errors.nom && <div className='text-[#FF1D1B] text-[12px] w-72'>{errors.nom}</div>}
            </div>
            <div className='relative my-4'>
              <input
                onInput={e => setCNIE(e.target.value)}
                type='text'
                name='CNIE'
                id='CNIE'
                placeholder=''
                className='block w-52 py-2.5 pl-2 px-0 text-sm text-black bg-white border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:text-black focus:border-white peer'
              />
              <label
                htmlFor='CNIE'
                className='absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                CNIE
              </label>
              {errors.CNIE && <div className='text-[#FF1D1B] text-[12px] w-72'>{errors.CNIE}</div>}
            </div>
          </div>
          <div className='flex flex-col md:flex-row'>
            <div className='relative my-4'>
              <input
                onInput={e => setEmail(e.target.value)}
                type='email'
                name='email'
                id='email'
                placeholder=''
                className='block w-52 py-2.5 pl-2 px-0 text-sm text-black bg-white border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:text-black focus:border-white peer'
              />
              <label
                htmlFor='email'
                className='absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                e-mail
              </label>
              {errors.email && <div className='text-[#FF1D1B] text-[12px] w-72'>{errors.email}</div>}
            </div>
            <div className='relative my-4'>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type='text'
                name='phone'
                id='phone'
                placeholder=''
                className='block w-52 py-2.5 pl-2 px-0 text-sm text-black bg-white border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:text-black focus:border-white peer'
              />
              <label
                htmlFor='phone'
                className='absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Telephone
              </label>
              {errors.phone && <div className='text-[#FF1D1B] text-[12px] w-72'>{errors.phone}</div>}
            </div>
          </div>
          <div className='flex flex-col md:flex-row'>
            <div className='relative my-4'>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type='text'
                name='firstName'
                id='firstName'
                placeholder=''
                className='block w-52 py-2.5 pl-2 px-0 text-sm text-black bg-white border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:text-black focus:border-white peer'
              />
              <label
                htmlFor='firstName'
                className='absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                First Name
              </label>
              {errors.firstName && <div className='text-[#FF1D1B] text-[12px] w-72'>{errors.firstName}</div>}
            </div>
            <div className='relative my-4'>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type='text'
                name='lastName'
                id='lastName'
                placeholder=''
                className='block w-52 py-2.5 pl-2 px-0 text-sm text-black bg-white border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:text-black focus:border-white peer'
              />
              <label
                htmlFor='lastName'
                className='absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Last Name
              </label>
              {errors.lastName && <div className='text-[#FF1D1B] text-[12px] w-72'>{errors.lastName}</div>}
            </div>
          </div>
          <div className='flex flex-col md:flex-row'>
            <div className='relative flex flex-col my-4'>
              <input
                onInput={e => setPass(e.target.value)}
                type='password'
                name='pass'
                id='pass'
                placeholder=''
                className='block w-52 py-2.5 pl-2 px-0 text-sm text-black bg-white border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:text-black focus:border-white peer'
              />
              <label
                htmlFor='pass'
                className='absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Password
              </label>
              {errors.pass && <div className='text-[#FF1D1B] text-[12px] w-72'>{errors.pass}</div>}
            </div>
            <div className='relative my-4'>
              <input
                onInput={e => setRpass(e.target.value)}
                type='password'
                name='Rpass'
                id='Rpass'
                placeholder=''
                className='block w-52 py-2.5 pl-2 px-0 text-sm text-black bg-white border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:text-black focus:border-white peer'
              />
              <label
                htmlFor='Rpass'
                className='absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Confirm Password
              </label>
              {errors.rpass && <div className='text-[#FF1D1B] text-[12px] w-72'>{errors.rpass}</div>}
            </div>
          </div>
          <input
            type='submit'
            value='Register'
            className='cursor-pointer w-full mb-4 text-[15px] mt-6 rounded-full bg-gray-800 text-yellow-50 hover:bg-yellow-50 hover:text-gray-800 py-2 transition-colors duration-300'
          />
          <div className='flex flex-col justify-center content-center text-center'>
            <a href='' className='text-gray-400 hover:text-gray-300 duration-300'>
              Forgot your password?
            </a>
            <span>
              Have an account?{' '}
              <Link to='/Log' className='text-gray-600 hover:text-gray-300 duration-300'>
                Log In
              </Link>
            </span>
          </div>
        </form>
      </div>
      <Notification message={notification} />
    </div>
  );
};

export default Reg;