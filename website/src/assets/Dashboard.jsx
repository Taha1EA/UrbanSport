import React from 'react'
import DashboardStatsGrid from './DashboardStateGrid'
import TransactionChart from './TransactionCharts'
import RecentOrders from './RecentOrders'
import BuyerProfilePieChart from './BuyProfilePieChart'
import PopularProducts from './PopularProducts'

export default function Dashboard() {
	return (
		<div className="flex flex-col gap-4">
			<DashboardStatsGrid />
			<div className="flex flex-row gap-4 w-full">
				<TransactionChart />
				<BuyerProfilePieChart />
			</div>
			<div className="flex flex-row gap-4 w-full">
				<RecentOrders />
				<PopularProducts />
			</div>
		</div>
	)
}