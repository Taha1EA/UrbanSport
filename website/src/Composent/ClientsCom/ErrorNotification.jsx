import React from 'react'

const ErrorNotification = ({ message }) => {
    return (
      message && (
        <div className="text-2xl  z-50 fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-4 px-16 rounded-md shadow-lg">
          {message}
        </div>
      )
    );
  };
export default ErrorNotification