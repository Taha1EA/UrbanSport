import React from 'react'
import DashboardStatsGrid from './DashboardStateGrid'
import TransactionChart from './TransactionCharts'
import RecentReservation from './RecentOrders'
import BuyerProfilePieChart from './BuyProfilePieChart'
import PopularProgram from './PopularProducts'

export default function Dashboard() {
	return (
		<div className="flex flex-col gap-4">
			<DashboardStatsGrid />
			<div className="flex flex-row gap-4 w-full">
				<TransactionChart />
				<BuyerProfilePieChart />
			</div>
			<div className="flex flex-row gap-4 w-full justify-between">
				<RecentReservation />
				<PopularProgram />
			</div>
		</div>
	)
}