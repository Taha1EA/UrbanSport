import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Navbar from "../../assets/Navbar"
import { useCookies } from 'react-cookie'
const Log = ({ Admin }) => {
  const isAdmin = Admin === "true" ? true : false;
  const nav = useNavigate();
  const [nom, setNom] = useState("");
  const [pass, setPass] = useState("");
  const [cookies, setCookie] = useCookies(['user'])
  const AdminOrUser = () => {
    if (isAdmin) {
      return "Welcome Admin";
    }
    return "Log in";
  }

  const handleNom = (e) => {
    setNom(e.target.value);
  };
  const handlePass = (e) => {
    setPass(e.target.value);
  };

  const hanleSubmit = (e) => {
    e.preventDefault();
    if (nom.length !== 0 && pass.length !== 0) {
      let informations = new FormData();
      informations.append("nom", nom);
      informations.append("pass", pass);
      if (isAdmin) {
        informations.append("admin", isAdmin);
      }
      axios.post("http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/logReg/log", informations).then(Response => {
        if (isAdmin) {
          if (Response.data) {
            setCookie('userA',Response.data[0] , { path: '/' })
            setTimeout(() => nav('/Dashboard'), 2000);
          } else {
            alert("not exist")
          }
        } else {
          if (Response.data) {
            setCookie('userI',Response.data[0] , { path: '/' })
            setTimeout(() => nav('/Main'), 2000);
          } else {
            alert("not exist")
          }
        }
      }).catch(error => alert(error))
    }
  }

  return (
    <div className='text-white h-[100vh] flex justify-center items-center bg-black'>
      {
        isAdmin?null:<Navbar/>
      }
      <div className='bg-[#161616] border border-[#444444] rounded-md p-8 shadow-lg relative'>
        <h1 className="text-[32px] text-white font-bold text-center mb-6 ">{AdminOrUser()}</h1>
        <div>
          <div className="relative my-4">
            <input onInput={handleNom} type="text" name="nom" id="name" placeholder='' className='block w-72 py-2.5 pl-2 px-0 text-sm text-white bg-[#0c0b0b] border-0 border-b-2 border-gray-600 dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:text-white focus:border-white peer' />
            <label htmlFor="name" className='absolute text-sm text-white  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Username</label>
            <span className="spin"></span>
          </div>

          <div className="relative my-4">
            <input onInput={handlePass} type="password" name="pass" id="pass" placeholder='' className='block w-72 py-2.5 pl-2 px-0 text-sm text-white bg-[#0c0b0b] border-0 border-b-2 border-gray-600 dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:text-white focus:border-white peer' />
            <label htmlFor="pass" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-100 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Password</label>
            <span className="spin"></span>
          </div>
          <input type='submit' onClick={hanleSubmit} value="Log In" className='cursor-pointer	 w-full mb-4 text-[15px] mt-6 rounded-full bg-gray-800 text-yellow-50 hover:bg-yellow-50 hover:text-gray-800 py-2 transition-colors duration-300' />
          <div className='flex flex-col justify-center content-center text-center'>
            <Link to="/forgot" className="text-gray-400 hover:text-gray-300 duration-300">Forgot your password?</Link>
            {(!isAdmin) ? <span>New ? <Link to='/Reg' className='text-gray-600 hover:text-gray-300 duration-300'>Create an account</Link></span> : <span></span>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Log;
