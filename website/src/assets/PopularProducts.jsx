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
    <div>
      <h1>Popular Programs</h1>
      <table>
        <thead>
          <tr>
            <th>Program ID</th>
            <th>Name</th>
            <th>Clients</th>
            {/* Add more table headers if needed */}
          </tr>
        </thead>
        <tbody>
          {programs.map(program => (
            <tr key={program.idProP}>
              <td>{program.idProP}</td>
              <td>{program.nomProgrammeSportif}</td>
              <td>{program.num_clients}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PopularProgram;
