import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PopularProgram() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/ShowPopularPrograms.php')
      .then(response => {
        setPrograms(response.data);
      })
      .catch(error => {
        console.error('Error fetching programs:', error);
      });
  }, []);

  return (
    <div className='w-full dark:text-white'>
      <h1 className='text-center'>Popular Programs</h1>
      <table className="min-w-full divide-y divide-gray-600 text-center w-[60%]">
        <thead className="bg-[#ea580c] text-center">
          <tr>
            <th className="px-8 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Program ID</th>
            <th className="px-8 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
            <th className="px-8 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Clients</th>
            {/* Add more table headers if needed */}
          </tr>
        </thead>
        <tbody className="bg-white  dark:bg-gray-900 divide-y divide-gray-200 text-center">
          {programs.map(program => (
            <tr key={program.idProP}>
              <td className="px-8 py-4 whitespace-nowrap text-sm dark:text-white text-gray-900">{program.idProP}</td>
              <td className="px-8 py-4 whitespace-nowrap text-sm dark:text-white text-gray-900">{program.nomProgrammeSportif}</td>
              <td className="px-8 py-4 whitespace-nowrap text-sm dark:text-white text-gray-900">{program.num_clients}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PopularProgram;
