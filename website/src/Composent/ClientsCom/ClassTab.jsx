import React, { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../../sousComp/PayementRenewPs';
import Notification from './Notification';

function ClassTab({ dataChange }) {
    const stripePromise = loadStripe('pk_test_51PN2ejLKugBhnMnptyFTTIIqxLXCdDiUtiMsH7UwuNpxl1RiL35DIvWsnpbrNKWrqi38oFrxINmDTOKBHy3OgHwI00VmeRcg0A');
    const [classDetails, setClassDetails] = useState([]);
    const [showPay, setShowPay] = useState();
    const [selectedSport, setSelectedSport] = useState('');
    const [selectedOffreType, setSelectedOffreType] = useState('');
    const [cookiesU] = useCookies(['userI']);
    const [notification, setNotification] = useState('');
    const containerRef = useRef(null);

    const cases = ['payed', 'overdue'];
    const prices = { '7': '60', '30': '200', '180': '1100', '360': '2000' };

    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

    const fetchClassDetails = async () => {
        if (cookiesU.userI) {
            const url = 'http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/selectPs';
            let formData = new FormData();
            formData.append('idClient', cookiesU.userI);

            try {
                const response = await axios.post(url, formData);
                if (Array.isArray(response.data)) {
                    const updatedClassDetails = response.data.map((Class) => {
                        const endDate = addDays(new Date(Class[6]), parseInt(Class[7]));
                        const status = new Date() < endDate ? cases[0] : cases[1];
                        return [
                            Class[0], Class[1], `${Class[2]} - ${Class[3]}`, Class[4],
                            Class[5], Class[6], Class[7], status
                        ];
                    });
                    setClassDetails(updatedClassDetails);
                    setTimeout(() => setShowPay(false), 9000);
                } else {
                    console.error('Expected an array but got:', response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    const handleRenewClient = (sport, offreType) => {
        setSelectedSport(sport);
        setSelectedOffreType(offreType);
        setShowPay(true);
    };

    useEffect(() => {
        if (dataChange) {
            console.log('Data changed:', dataChange);
            fetchClassDetails();
        }
    }, [dataChange]);
    useEffect(() => {
        const intervalId = setInterval(fetchClassDetails, 5000); // Fetch data every 10 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);
    const handleDeleteClass = async (sport) => {
        const url = 'http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/deletePs';
        let formData = new FormData();
        formData.append('idClient', cookiesU.userI);
        formData.append('idPro', parseInt(sport));

        try {
            const response = await axios.post(url, formData);
            if (response.data) {
                setNotification('Delete successful');
                setClassDetails(prevState => prevState.filter(c => c[0] !== sport));
                setTimeout(() => setNotification(''), 2000);
            } else {
                console.error('Error deleting class:', response.data);
            }
        } catch (error) {
            console.error('Error deleting class:', error);
        }
    };

    useEffect(() => {
        fetchClassDetails();
    }, [cookiesU.userI]);

    useEffect(() => {
        const updateHeight = () => {
            if (containerRef.current) {
                const height = containerRef.current.scrollHeight;
                containerRef.current.style.height = `${height}px`;
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);

        return () => window.removeEventListener('resize', updateHeight);
    }, [classDetails]);

    return (
        <div className="p-4 flex flex-col items-center dark:bg-blue-gray-900">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">Your Classes</h1>
            <div className="px-8 py-3 text-center text-[14px] font-medium flex text-gray-800 dark:text-white uppercase tracking-wider">
                Days content meaning:<br />1: Monday-Wednesday-Friday<br />2:Tuesday-Thursday-Saturday
            </div>
            <div className="flex flex-col items-center">
                <div className="overflow-x-auto w-full">
                    <div className="inline-block min-w-full py-2 align-middle">
                        <div className="overflow-hidden shadow-md sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 text-center">
                                <thead className="bg-gray-50 text-center">
                                    <tr>
                                        <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                                        <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                        <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
                                        <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Registration</th>
                                        <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Renew</th>
                                        <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offer Type</th>
                                        <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renew</th>
                                        <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete Class</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-center">
                                    {classDetails.map((c) => (
                                        <tr key={c[0]}>
                                            <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{c[1]}</td>
                                            <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{c[2]}</td>
                                            <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{c[3]}</td>
                                            <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{c[4]}</td>
                                            <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{c[5]}</td>
                                            <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{c[6]}</td>
                                            <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{c[7]}</td>
                                            {c[7] === 'payed' ? (
                                                <>
                                                    <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                                                    <td onClick={() => handleDeleteClass(c[0])} className="px-8 py-4 whitespace-nowrap text-sm text-white bg-orange-500 cursor-pointer hover:bg-white hover:text-orange-500 transition-colors duration-300 border-2 border-white">Delete</td>
                                                </>
                                            ) : (
                                                <>
                                                    <td onClick={() => handleRenewClient(c[0], c[6])} className="px-8 py-4 whitespace-nowrap text-sm text-white bg-red-500 cursor-pointer hover:bg-white hover:text-red-500 transition-colors duration-300 border-2 border-white">Renew</td>
                                                    <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {showPay && (
                <div className="w-full mt-10 z-10" ref={containerRef}>
                    <Elements stripe={stripePromise}>
                        <PaymentForm sport={selectedSport} price={prices[selectedOffreType]} onMessage={() => fetchClassDetails()} />
                    </Elements>
                </div>
            )}
            <Notification message={notification} />
        </div>
    );
}

export default ClassTab;
