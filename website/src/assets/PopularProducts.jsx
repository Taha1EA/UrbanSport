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
    <div className='w-full'>
      <h1 className='text-center'>Popular Programs</h1>
      <table className="min-w-full divide-y divide-gray-200 text-center w-[60%]">
        <thead className="bg-gray-50 text-center">
          <tr>
            <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program ID</th>
            <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clients</th>
            {/* Add more table headers if needed */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-center">
          {programs.map(program => (
            <tr key={program.idProP}>
              <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">{program.idProP}</td>
              <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">{program.nomProgrammeSportif}</td>
              <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">{program.num_clients}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PopularProgram;
