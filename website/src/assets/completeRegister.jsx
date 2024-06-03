import React, { useEffect,useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'

import axios from 'axios'
const Reg = () => {
  const passRegex  =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let i=0;
  let s='informations';
  const nav = useNavigate();
  const [nom,setNom]=useState("");
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [rpass,setRpass]=useState("");
  const nameRegexFun=(e)=>{
    if(e.length===0) {
      i-=1
      return "write your name please";
    }
    i+=1
    
  }
  const passRegexFun=(e)=>{
    if(!passRegex.test(e)) {
      i-=1;
      return "password should contain atleast one  number and one special character (+8 caracters)";
    }
    i+=1 ;
  }
  const emailRegexFun=(e)=>{
    if(e===""){
      i-=1
      return "enter your email please"
    }
    if(!emailRegex.test(e)) {
      i-=1
      return "email incorrect ";
    }
    i+=1
  }
  const rpassRegexFun=(e1,e2)=>{
    if(e1!==(e2)){
      i-=1  
      return "confirm your password correctly please";
    }
    i+=1
  }
  const handleNom = (e) => {
    setNom(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePass = (e) => {
    setPass(e.target.value);
  };
  const handleRpass = (e) => {
    setRpass(e.target.value);
  };
  const handleSubmit=()=>{
    if(i===4){
      const url="http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/logReg/register.php";
      let informations=new FormData();
      informations.append("nom",nom);
      informations.append("email",email);
      informations.append("pass",pass);
      axios.post(url,informations)
      .then(Response=>{if(Response.data==="Success"){
          setTimeout(()=> nav('/Log'),2000);
      }})
      .catch(error=>alert(error))
      
    }
    else {
      s= "valid your informations please";
      
    }
    }
  
  return (
    <div className='text-white h-[100vh] flex flex-col justify-center items-center bg-black'>
      
       {/* <div className={`bg-[#161616] border border-[#444444] rounded-md p-8 shadow-lg relative text-white text-center w-[355px] mb-4 ${handleSubmit?'hidden':'block'}`}>{s}</div> */}
      <div className='bg-[#161616] border border-[#444444] rounded-md p-8 shadow-lg relative'>
        <h1 className="text-4xl text-white font-bold text-center mb-6">Register</h1>
        <div >
          <div className="relative my-4 ">
            <input onInput={handleNom} type="text" name="nom" id="name" placeholder='' className='block w-72 py-2.5 pl-2 px-0 text-sm text-white bg-[#0c0b0b] border-0 border-b-2 border-gray-600 dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:text-white focus:border-white peer' />
            <label htmlFor="name" className='absolute text-sm text-white  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Username</label>
            <div id="pass" className='text-[#FF1D1B] text-[12px] w-72'>{nameRegexFun(nom)}</div>
          </div>

          <div className="relative my-4 ">
            <input onInput={handleEmail} type="email" name="email" id="email" placeholder='' className='block w-72 py-2.5 pl-2 px-0 text-sm text-white bg-[#0c0b0b] border-0 border-b-2 border-gray-600 dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:text-white focus:border-white peer' />
            <label htmlFor="email" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-100 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>e-mail</label>
            <div id="pass" className='text-[#FF1D1B] text-[12px] w-72'>{emailRegexFun(email)}</div>
          </div>
          <div className="relative my-4 ">
            <input onInput={handlePass} type="password" name="pass" id="pass" placeholder='' className='block w-72 py-2.5 pl-2 px-0 text-sm text-white bg-[#0c0b0b] border-0 border-b-2 border-gray-600 dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:text-white focus:border-white peer' />
            <label htmlFor="pass" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-100 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Password</label>
            <div id="pass" className='text-[#FF1D1B] text-[12px] w-72'>{passRegexFun(pass)}</div>
          </div>
          <div className="relative my-4 ">
            <input onInput={handleRpass} type="password" name="Rpass" id="Rpass" placeholder='' className='block w-72 py-2.5 pl-2 px-0 text-sm text-white bg-[#0c0b0b] border-0 border-b-2 border-gray-600 dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:text-white focus:border-white peer' />
            <label htmlFor="Rpass" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-100 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Confirm Password</label>
            <div id="pass" className='text-[#FF1D1B] text-[12px] w-72'>{rpassRegexFun(rpass,pass)}</div>
          </div>
          <input type='submit' onClick={handleSubmit} value="Register" className='cursor-pointer	w-full mb-4 text-[15px] mt-6 rounded-full bg-gray-800 text-yellow-50 hover:bg-yellow-50 hover:text-gray-800 py-2 transition-colors duration-300' />
          <div className='flex flex-col justify-center content-center text-center'>
            <a href="" className="text-gray-400 hover:text-gray-300 duration-300">Forgot your password?</a>
            <span>Have an account ? <Link to='/Log' className='text-gray-600 hover:text-gray-300 duration-300'>Log In </Link></span>
          </div>
        </div>

      </div>
    </div>
  )
  
}

export default Reg