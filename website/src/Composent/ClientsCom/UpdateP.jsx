import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useCookies } from 'react-cookie';
import Notification from './Notification';
import ErrorNotification from './ErrorNotification';
const UpdateP = () => {
    const [pass, setPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [cPass, setCpass] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [cookiesU] = useCookies(['userI']);
    const [infos, setInfos] = useState(null);
    const [notification, setNotification] = useState('');
    const [Enotification, setENotification] = useState('');
    const handleNewCPass = (e) => {
        setCpass(e.target.value);
    };
  
    const handlePass = (e) => {
      setPass(e.target.value);
    };
  
    const handleNewNom = (e) => {
      setNewNom(e.target.value);
    };
  
    const handleNewPass = (e) => {
      setNewPass(e.target.value);
    };
    const handleSubmit = () => {
        const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/setting";
        const fetchData = async () => {
          if (cookiesU.userI) {
            let classes = new FormData();
            classes.append("idClient", cookiesU.userI);
            classes.append("pass", pass);
            classes.append("newPass", newPass);
            if(newPass == cPass){
            try {
              
              const response = await axios.post(url, classes);
              if (response.data=='secuss') {
                setNotification('Your Password has been apdated');
                setTimeout(() => {
                  setNotification('');
                }, 2000);
              } 
              else{
                console.error("Expected an array but got:", response.data);
              }
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }}else{
            setENotification('check Your Password please ');
                setTimeout(() => {
                  setENotification('')
                }, 2000);
          }
        };
        fetchData();
    }
  return (
    <div className='text-black h-[400px] flex justify-center mt-4 bg-gray-400'>
    <div className='bg-white border-2 border-gray-300 rounded-md p-8 shadow-lg relative'>
    <h1 className="text-[32px] text-black font-bold text-center mb-6">Update Client Profile</h1>
    {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>} {/* Display error message */}
        <div className="relative my-4">
        <input onInput={handlePass} type="password" name="pass" id="pass" placeholder='' className='block w-72 py-2.5 pl-2 px-0 text-sm text-black  border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:text-black focus:border-white peer' />
        <label htmlFor="pass" className='absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Password</label>
        </div>

        <div className="relative my-4">
        <input onInput={handleNewPass} type="text" name="newNom" id="newNom" placeholder='' className='block w-72 py-2.5 pl-2 px-0 text-sm text-black  border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:text-black focus:border-white peer' />
        <label htmlFor="newNom" className='absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>New Password</label>
        </div>

        <div className="relative my-4">
        <input onInput={handleNewCPass} type="password" name="newPass" id="newPass" placeholder='' className='block w-72 py-2.5 pl-2 px-0 text-sm text-black  border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:text-black focus:border-white peer' />
        <label htmlFor="newPass" className='absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Confirm Password</label>
        </div>

        <input onClick={handleSubmit} type='submit' value="Update Profile" className='cursor-pointer w-full mb-4 text-[15px] mt-6 rounded-full bg-gray-800 text-yellow-50 hover:bg-white hover:border-2 hover:border-gray-800 hover:text-gray-800 py-2 transition-colors duration-300' />
    
    </div>
    <Notification message={notification} />
    <ErrorNotification message={Enotification} />
</div>
  )
}

export default UpdateP