import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from "axios";

const ResTab = () => {
    const [cookiesU] = useCookies(['userI']);
    const [classDetail, setClassDetail] = useState([]);
    
    const fetchMatchs = async () => {
        const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/ActiveRes";
        const fetchData = async () => {
            if (cookiesU.userI) {
                let classes = new FormData();
                classes.append("idClient", cookiesU.userI);
                try {
                    const response = await axios.post(url, classes);
                    setClassDetail(response.data);
                    console.log(response.data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };
        fetchData();
    }
    useEffect(() => {
        const intervalId = setInterval(fetchMatchs, 5000); // Fetch data every 10 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);
    return (
        <div className="p-4 flex flex-col items-center dark:bg-blue-gray-900">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">Your Active Reservation</h1>
            {classDetail.length > 0 ? (
                <table className="min-w-[70%] divide-y divide-gray-200 text-center ">
                    <thead className="bg-gray-50 text-center">
                        <tr>
                            <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                date Reservation
                            </th>
                            <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                debut-fin
                            </th>
                            <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                nbJoueurs
                            </th>
                            <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                terrainPlace
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-center">
                        {classDetail.map((c, index) => (
                            <tr key={index}>
                                <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{c[0]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{`${c[1]} - ${c[2]}`}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{c[3]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{c[4]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h1 className='text-center'>You Don't Have Any Active Match Reserved</h1>
            )}
        </div>
    );
}

export default ResTab;
