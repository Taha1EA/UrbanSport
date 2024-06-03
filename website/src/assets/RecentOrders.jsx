import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReservationsTable = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await  axios.get('http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/ShowReservations.php')

        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Reservations</h1>
      <table>
        <thead>
          <tr>
            
            <th>Terrain ID</th>
            <th>TotalC</th>
            
            <th>Type ID</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={index}>
              <td>{reservation.idTerrainT}</td>
              <td>{reservation.TotalC}</td>
              <td>{reservation.idTypeT}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsTable;
