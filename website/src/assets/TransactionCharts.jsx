import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TransactionChart() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShowDiagram = axios.get("http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/ShowDiagram.php");
        const fetchShowReservation = axios.get("http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/ShowReservation.php");

        Promise.all([fetchShowDiagram, fetchShowReservation])
            .then(responses => {
                const showDiagramData = responses[0].data;
                const showReservationData = responses[1].data;

                if (Array.isArray(showDiagramData) && Array.isArray(showReservationData)) {
                    const mergedData = showDiagramData.map((entry, index) => ({
                        month: entry.paye,
                        Total: parseFloat(entry.total),
                        TotalSum: parseFloat(showReservationData[index]?.TotalSum) || 0
                    }));
                    setData(mergedData);
                } else {
                    setError("Invalid response format");
                }
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
        <div className="h-[22rem] bg-white dark:bg-gray-900 p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-white dark:text-white font-medium">Incomes</strong>
            <div className="mt-3 w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 20,
                            right: 10,
                            left: -10,
                            bottom: 0
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Total" name="Classes" fill="#ea580c" />
                        <Bar dataKey="TotalSum" name="Reservation" fill="#0ea5e9" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
