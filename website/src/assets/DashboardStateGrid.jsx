import React, { useState, useEffect } from 'react';
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
import axios from 'axios';

export default function DashboardStatsGrid() {
    const [clientCount, setClientCount] = useState(null);
   
    const [error, setError] = useState(null);
    const [TotalAll, setTotalAll] = useState(null);
   
    const [error1, setError1] = useState(null);
    const [InscTotal, setInscTotal] = useState(null);
   
    const [error2, setError2] = useState(null);
    useEffect(() => {
        axios.get('http://localhost/UrbanSportW/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/ShowTClients.php')
            .then(response => {
                setClientCount(response.data[0]['TotlalClient']);
            })
            .catch(error => {
                setError('Failed to fetch client count');
                console.error('Error fetching client count:', error);
            });
    }
	, []);
    useEffect(() => {
        axios.get('http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/ShowAllTotalYear.php')
            .then(response => {
                
       
                setTotalAll(response.data[0]['TOTALYEar']);
            })
            .catch(error1 => {
                setError1('Failed to fetch Total Year');
                console.error('Error fetching Total Year:', error1);
            });
    }
	, []);
    useEffect(() => {
        axios.get('http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/TotalInsc.php')
            .then(response => {
                
       
                setInscTotal(response.data[0]['YearTotal']);
            })
            .catch(error2 => {
                setError2('Failed to fetch Total Year');
                console.error('Error fetching Total Year:', error2);
            });
    }
	, []);

    const Total = (parseFloat(InscTotal) || 0) + (parseFloat(TotalAll) || 0);
   

    return (
        <div className="flex gap-4">
            <BoxWrapper >
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-500">
                    <IoBagHandle className="text-2xl text-white" />
                </div>
                <div className="pl-4 " >
                    <span className="text-sm text-gray-500 font-light dark:text-white">T I  Year</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold dark:text-white ">{Total} DHs</strong>
                        
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-600">
                    <IoPieChart className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light dark:text-white ">T I  reservation</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold dark:text-white">{TotalAll} DHs</strong>
                      
                    </div>
                </div>
            </BoxWrapper>
            
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
                    <IoCart className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light dark:text-white">T I Classes</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold dark:text-white">{InscTotal} DHs</strong>
                        
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
                    <IoPeople className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light dark:text-white">Total Customers</span>
                    <div className="flex items-center">
                        {clientCount !== null && (
                            <strong className="text-xl text-gray-700 font-semibold dark:text-white">{clientCount} client</strong>
                        )}
                        {error && <p>{error}</p>}
                    </div>
                </div>
            </BoxWrapper>
        </div>
    )
}

function BoxWrapper({ children }) {
    return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center  dark:bg-gray-900 ">{children}</div>
}