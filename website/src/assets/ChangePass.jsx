import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
  const [newPass, setNewPass] = useState("");
  const [RnewPass, setRnewPass] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
  const nav = useNavigate();

  const handleNewPass = (e) => {
    setNewPass(e.target.value);
  };

  const handleRnewPass = (e) => {
    setRnewPass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPass && RnewPass && newPass === RnewPass) {
      let informations = new FormData();
      informations.append("newPass", newPass);
      informations.append("RnewPass", RnewPass);

      axios.post("http://localhost/UrbanSportW/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/changepass.php", informations, {
          withCredentials: true
        })
        .then(response => {
          if (response.data.success) {
            alert("Password updated successfully!");
            setTimeout(() => nav('/'), 2000);
          } else {
            setErrorMessage(response.data.error || "Error updating password");
          }
        })
        .catch(error => {
          console.error("Error updating Password:", error);
          setErrorMessage("Error updating Password: " + error.message);
        });
    } else {
      setErrorMessage("Passwords do not match!");
    }
  };

  return (
    <div className='text-black h-[100vh] flex justify-center items-center bg-white'>
      <div className='bg-white border-4 border-[#444444] rounded-md p-8 shadow-lg relative'>
        <h1 className="text-[32px] text-black font-bold text-center mb-6">Change Password</h1>
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <div className="relative my-4">
            <input onInput={handleNewPass} type="password" name="newPass" id="newPass" placeholder='' className='block w-72 py-2.5 pl-2 px-0 text-sm text-black bg-white border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:text-black focus:border-white peer' />
            <label htmlFor="newPass" className='absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>New Password</label>
          </div>
          <div className="relative my-4">
            <input onInput={handleRnewPass} type="password" name="rnewPass" id="rnewPass" placeholder='' className='block w-72 py-2.5 pl-2 px-0 text-sm text-black bg-white border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:text-black focus:border-white peer' />
            <label htmlFor="rnewPass" className='absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Repeat New Password</label>
          </div>
          <input type='submit' value="Change Password" className='cursor-pointer w-full mb-4 text-[15px] mt-6 rounded-full bg-gray-800 text-yellow-50 hover:bg-yellow-50 hover:text-gray-800 py-2 transition-colors duration-300' />
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword;
