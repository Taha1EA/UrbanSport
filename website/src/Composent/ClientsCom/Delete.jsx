import React,{useState} from 'react'
import { useCookies } from 'react-cookie';
import axios from 'axios';
import ErrorNotification from "./ErrorNotification"
const Delete = () => {
  const [notification, setNotification] = useState('');
  const [pass,setPass]=useState();
  const [cookiesU] = useCookies(['userI']);
  const DeleteAccount = async () => {
    const fileData = new FormData();
    fileData.append('idClient', cookiesU.userI);
    fileData.append('pass', pass);

    try {
      const response = await axios.post('http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/DeleteAccount', fileData);
      if(response.data){
        if(response.data=="deleted"){
          setNotification("your account has been deleted");
              setTimeout(() => {
                removeCookie('userI')
              }, 2000);
        }
        else{
          alert(response.data);
        }
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
  return (
    <div>
        <div className="w-full max-w-lg mx-auto mt-8 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            <div className="mb-4">
                <input type="password" placeholder='enter your password' onInput={(e)=>setPass(e.target.value)}
                className="w-full border-2 border-blue-600 p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"/>
            </div>
            <input type="submit" value="Delete Account" onClick={DeleteAccount}
            className="cursor-pointer w-full bg-red-600 text-white py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                    />
        </div>
        <ErrorNotification message={notification} />
    </div>
  )
}

export default Delete