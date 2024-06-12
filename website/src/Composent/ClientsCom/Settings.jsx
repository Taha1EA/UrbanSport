import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link,Outlet,useNavigate  } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Test from "../../images/test.jpeg";
const UpdateClientProfile = () => {
  const [nom, setNom] = useState("");
  const [pass, setPass] = useState("");
  const [newNom, setNewNom] = useState("");
  const [newPass, setNewPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cookiesU] = useCookies(['userI']);
  const [infos, setInfos] = useState([]);
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

  useEffect(() => {
    const url = "http://localhost/UrbanSportW/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/infoSetting";
    const fetchData = async () => {
      if (cookiesU.userI) {
        let classes = new FormData();
        classes.append("idClient", (cookiesU.userI));
        try {
          const response = await axios.post(url, classes);
          if (Array.isArray(response.data)) {
            let T = response.data[0];
            if(T[5]==""){
              T[5]=Test
            }
            else{
              T[5] = "http://localhost/UrbanSportW/UrbanSport/UrbanSport-Backend-/UrbanSport/usersData/" + response.data[0][5];
            }
            setInfos(T);
          } else {
            console.error("Expected an array but got:", response.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [cookiesU.userI]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nom && pass && (newNom || newPass)) {
      let informations = new FormData();
      informations.append("nom", nom);
      informations.append("pass", pass);
      informations.append("newNom", newNom);
      informations.append("newPass", newPass);

      axios.post("http://localhost/UrbanSportW/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/setting", informations)
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
    <div className='text-black h-[94vh] items-center bg-gray-400 flex flex-col'>
        <div className='w-full'>
        <div className='w-full bg-gray-100 h-[220px] flex items-center justify-around'>
          <div className='flex flex-col items-start'>
            <h1 className='text-xl'><span className='underline underlineunderline-offset-8'>Username:</span> {infos[4]}</h1>
            <h1 className='text-xl'><span className='underline underlineunderline-offset-8'>Email: </span>{infos[2]}</h1>
            <h1 className='text-xl'><span className='underline underlineunderline-offset-8'> Phone number:</span> {infos[3]}</h1>
            <h1 className='text-xl'><span className='underline underlineunderline-offset-8'>CNIE:</span> {infos[6]}</h1>
          </div>
          <div>
            <img className='h-[150px] w-[150px] rounded-full cursor-pointer' src={infos[5]} alt="Profile" />
            <h1 className='text-xl text-center'>{infos[0]} {infos[1]}</h1>
          </div>
        </div>
        <div className='flex space-x-10 h-[40px] justify-around  w-full bg-white'>
            <Link to="updatePassword" className='flex items-center justify-center hover:bg-blue-gray-200 text-center text-gray-900 bg-white border-1 border-gray-500 w-[33%] h-full'>Update Password</Link>
            <Link to="updatePhoto" className='flex items-center justify-center hover:bg-blue-gray-200 text-center text-gray-900 bg-white border-1 border-gray-500 w-[33%] h-full'>Update Photo</Link>
            <Link to="Delete" className='flex items-center justify-center hover:bg-blue-gray-200 text-center text-gray-900 bg-white border-1 border-gray-500 w-[33%] h-full'>Delete Account</Link>
        </div>
        <div className='w-[100%]'>
          <Outlet/>
        </div>
        </div>
     
     
    </div>
  );
}

export default UpdateClientProfile;
