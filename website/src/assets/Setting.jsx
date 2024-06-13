// import React, { useState } from 'react';
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';

// const UpdateClientProfile = () => {
//   const [nom, setNom] = useState("");
//   const [pass, setPass] = useState("");
//   const [newNom, setNewNom] = useState("");
//   const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
//   const nav = useNavigate();

//   const handleNom = (e) => {
//     setNom(e.target.value);
//   };

//   const handlePass = (e) => {
//     setPass(e.target.value);
//   };

//   const handleNewNom = (e) => {
//     setNewNom(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (nom && pass && newNom) {
//       let informations = new FormData();
//       informations.append("nom", nom);
//       informations.append("pass", pass);
//       informations.append("newNom", newNom);

//       axios.post("http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/setting.php", informations, {
//           withCredentials: true
//         })
//         .then(response => {
//           if (response.data.success) {
//             alert("Profile updated successfully!");
//             setTimeout(() => nav('/'), 2000);
//           } else {
//             setErrorMessage(response.data.error || "Error updating profile");
//           }
//         })
//         .catch(error => {
//           console.error("Error updating profile:", error);
//           setErrorMessage("Error updating profile: " + error.message);
//         });
//     } else {
//       setErrorMessage("All fields are required!");
//     }
//   };

//   return (
//     <div className='text-white h-[100vh] flex justify-center items-center bg-black'>
//       <div className='bg-[#161616] border border-[#444444] rounded-md p-8 shadow-lg relative'>
//         <h1 className="text-[32px] text-white font-bold text-center mb-6">Update Client Profile</h1>
//         {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>} {/* Display error message */}
//         <form onSubmit={handleSubmit}>
//           <div className="relative my-4">
//             <input onInput={handleNom} type="text" name="nom" id="nom" placeholder='' className='block w-72 py-2.5 pl-2 px-0 text-sm text-white bg-[#0c0b0b] border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:text-white focus:border-white peer' />
//             <label htmlFor="nom" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Current Username</label>
//           </div>

//           <div className="relative my-4">
//             <input onInput={handlePass} type="password" name="pass" id="pass" placeholder='' className='block w-72 py-2.5 pl-2 px-0 text-sm text-white bg-[#0c0b0b] border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:text-white focus:border-white peer' />
//             <label htmlFor="pass" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Password</label>
//           </div>

//           <div className="relative my-4">
//             <input onInput={handleNewNom} type="text" name="newNom" id="newNom" placeholder='' className='block w-72 py-2.5 pl-2 px-0 text-sm text-white bg-[#0c0b0b] border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:text-white focus:border-white peer' />
//             <label htmlFor="newNom" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>New Username</label>
//           </div>

//           <input type='submit' value="Update Profile" className='cursor-pointer w-full mb-4 text-[15px] mt-6 rounded-full bg-gray-800 text-yellow-50 hover:bg-yellow-50 hover:text-gray-800 py-2 transition-colors duration-300' />
//         </form>
//       </div>
//     </div>
//   );
// }

// export default UpdateClientProfile;

import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const UpdateClientProfile = () => {
  const [nom, setNom] = useState("");
  const [pass, setPass] = useState("");
  const [newNom, setNewNom] = useState("");
  const [newPass, setNewPass] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
  const nav = useNavigate();

  const handleNom = (e) => {
    setNom(e.target.value);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nom && pass && (newNom || newPass)) {
      let informations = new FormData();
      informations.append("nom", nom);
      informations.append("pass", pass);
      informations.append("newNom", newNom);
      informations.append("newPass", newPass);

      axios.post("http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/setting.php", informations, {
          withCredentials: true
        })
        .then(response => {
          if (response.data.success) {
            alert("Profile updated successfully!");
            setTimeout(() => nav('/'), 2000);
          } else {
            setErrorMessage(response.data.error || "Error updating profile");
          }
        })
        .catch(error => {
          console.error("Error updating profile:", error);
          setErrorMessage("Error updating profile: " + error.message);
        });
    } else {
      setErrorMessage("All fields are required!");
    }
  };

  return (
    <div className='text-white h-[100vh] flex justify-center items-center bg-black'>
      <div className='bg-[#161616] border border-[#444444] rounded-md p-8 shadow-lg relative'>
        <h1 className="text-[32px] text-white font-bold text-center mb-6">Update Client Profile</h1>
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <div className="relative my-4">
            <input onInput={handleNom} type="text" name="nom" id="nom" placeholder='' className='block w-72 py-2.5 pl-2 px-0 text-sm text-white bg-[#0c0b0b] border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:text-white focus:border-white peer' />
            <label htmlFor="nom" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Current Username</label>
          </div>

          <div className="relative my-4">
            <input onInput={handlePass} type="password" name="pass" id="pass" placeholder='' className='block w-72 py-2.5 pl-2 px-0 text-sm text-white bg-[#0c0b0b] border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:text-white focus:border-white peer' />
            <label htmlFor="pass" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Password</label>
          </div>

          <div className="relative my-4">
            <input onInput={handleNewNom} type="text" name="newNom" id="newNom" placeholder='' className='block w-72 py-2.5 pl-2 px-0 text-sm text-white bg-[#0c0b0b] border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:text-white focus:border-white peer' />
            <label htmlFor="newNom" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>New Username</label>
          </div>

          <div className="relative my-4">
            <input onInput={handleNewPass} type="password" name="newPass" id="newPass" placeholder='' className='block w-72 py-2.5 pl-2 px-0 text-sm text-white bg-[#0c0b0b] border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:text-white focus:border-white peer' />
            <label htmlFor="newPass" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>New Password</label>
          </div>

          <input type='submit' value="Update Profile" className='cursor-pointer w-full mb-4 text-[15px] mt-6 rounded-full bg-gray-800 text-yellow-50 hover:bg-yellow-50 hover:text-gray-800 py-2 transition-colors duration-300' />
        </form>
      </div>
    </div>
  );
}

export default UpdateClientProfile;
