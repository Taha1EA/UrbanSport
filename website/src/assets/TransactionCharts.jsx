import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TransactionChart() {
    const [months, setMonths] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [months1, setMonths1] = useState([]);
    const [loading1, setLoading1] = useState(true);
    const [error1, setError1] = useState(null);

    useEffect(() => {
        axios.get("http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/ShowDiagram.php")
            .then(response => {
                if (Array.isArray(response.data)) {
                    const modifiedData = response.data.map(entry => ({
                        ...entry,
                        count: parseFloat(entry.count) + 10,
                        duree: parseFloat(entry.duree) * 2
                    }));
                    setMonths(modifiedData);
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

    
    useEffect(() => {
        axios.get("http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/ShowReservation.php")
            .then(response => {
                if (Array.isArray(response.data)) {
                    const modifiedData = response.data.map(entry => ({
                        ...entry,
                        count: parseFloat(entry.count) + 10,
                        duree: parseFloat(entry.duree) * 2
                    }));
                    setMonths1(modifiedData);
                } else {
                    setError1("Invalid response format");
                }
                setLoading1(false);
            })
            .catch(error => {
                setError1(error.message);
                setLoading1(false);
            });
    }, []);
   

    if (loading || loading1 ) {
        return <div>Loading...</div>;
    }

    if (error || error1 ) {
        return <div>Error: {error || error1 }</div>;
    }
    const table = months.map((month, i) => ({
        month: month.month, // Assuming there's a month property in your data
        Total: month.total || 0,
        TotalSum: months1[i]?.TotalSum || 0 // Assuming TotalSum is available in months1 at the same index
    }));
    
    

    return (
        <div className="h-[22rem] bg-white  dark:bg-gray-900 p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 dark:text-white font-medium">Incomes</strong>
            <div className="mt-3 w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart
    width={500}
    height={300}
    data={table}
    margin={{
        top: 20,
        right: 10,
        left: -10,
        bottom: 0
    }}
>
    <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
    <XAxis dataKey="months" />
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