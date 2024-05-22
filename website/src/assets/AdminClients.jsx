import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminShowClients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/ShowClients.php")
            .then(response => {
                setClients(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <h1>Clients</h1>
            <div className="grid">
                <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                           
                            <th>nomUtilisateur</th>
                            <th>Adresse Gmail</th>
                            <th>CNIE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.CNIE}>
                                
                                <td>{client.nomUtilisateur ? client.nomUtilisateur.slice(0, 15).toUpperCase() : 'N/A'}</td>
                                <td>{client.AdresseGmail_Client ? client.AdresseGmail_Client.slice(0, 100) : 'N/A'}</td>
                                <td>{client.CNIE ? client.CNIE.slice(0, 100) : 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminShowClients;
