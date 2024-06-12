import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const RADIAN = Math.PI / 180;
const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

export default function BuyerProfilePieChart() {
	const [data, setData] = useState([
		{ name: 'Male', value: 100 },
		{ name: 'Female', value: 100 },
		{ name: 'Other', value: 200 }
	]);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios.get('http://localhost/UrbanSportW/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/ShowPercentage')
			.then(response => {
				console.log(response.data)
				const clientCount = parseInt(response.data[0][0], 10);
				const adminCount = parseInt(response.data[1][0], 10);
				const chartData = [
					{ name: 'Pay by Card', value: clientCount },
					{ name: 'Pay by Cash', value: adminCount }
				];
				setData(chartData);
			})
			.catch(error => {
				setError('Failed to fetch counts');
				console.error('Error fetching counts:', error);
			});
	}, []);

	const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		);
	};

	return (
		<div className="w-[20rem] h-[22rem] bg-white  dark:bg-gray-900 p-4 rounded-sm border border-gray-200 flex flex-col">
			<strong className="text-gray-700 font-medium dark:text-white">Buyer Profile</strong>
			{error && <p className="text-red-500 text-xs">{error}</p>}
			<div className="mt-3 w-full flex-1 text-lg">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart width={400} height={300}>
						<Pie
							data={data}
							cx="50%"
							cy="45%"
							labelLine={false}
							label={renderCustomizedLabel}
							outerRadius={105}
							fill="#8884d8"
							dataKey="value"
						>
							{data.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
