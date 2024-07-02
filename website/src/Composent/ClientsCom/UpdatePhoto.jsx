import React, { useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Notification from './Notification';
const UpdatePhoto = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const fileInputRef = useRef(null);
  const [cookiesU] = useCookies(['userI']);
  const [file, setFile] = useState(null); 
  const [notification, setNotification] = useState('');
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImageSrc(null);
    }
  };

  const ChangePhoto = async () => {
    if (!file) return;

    const fileData = new FormData();
    fileData.append('idClient', cookiesU.userI);
    fileData.append('file', file);

    try {
      const response = await axios.post('http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/changeProfilePhoto', fileData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if(response.data){
        setNotification('Photo Updated Succeffully');
        setTimeout(() => {
          setNotification("")
        }, 2000);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept="image/*"
        className="hidden"
      />
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Choose Image
      </button>
      <Notification message={notification} />
      {imageSrc && (
        <div className='flex flex-col items-center'>
          <img
            src={imageSrc}
            alt="Selected"
            className="mt-4 w-64 h-64 object-cover rounded-full"
          />
          <input
            type='submit'
            value="Submit"
            onClick={ChangePhoto}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
      )}
    </div>
  );
};

export default UpdatePhoto;
