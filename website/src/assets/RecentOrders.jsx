import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReservationsTable = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await  axios.get('http://localhost/UrbanSportW/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/ShowReservations.php')

        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='w-full dark:text-white'>
      <h1 className='text-center'>Reservations</h1>
      <table className="min-w-full divide-y divide-gray-200 text-center w-[60%]">
        <thead className="bg-[#0ea5e9] text-center">
          <tr>
            
            <th  className="px-8 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Terrain ID</th>
            <th  className="px-8 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">TotalC</th>
            
            <th  className="px-8 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Type ID</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y  dark:bg-gray-900  divide-gray-200 text-center">
          {reservations.map((reservation, index) => (
            <tr key={index} >
              <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{reservation.idTerrainT}</td>
              <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{reservation.TotalC}</td>
              <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{reservation.nbJoueurs+" "+reservation.terrainPlace}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsTable;
