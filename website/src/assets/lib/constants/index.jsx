import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'home',
		label: 'Home',
		path: '/Dashboard',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'products',
		label: 'Events',
		path: 'events',
		icon: <HiOutlineCube />
	},
	{
		key: 'addPro',
		label: 'Add Programme ',
		path: 'Ordermatch',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'client Classes',
		label: 'Client Classes',
		path: 'ClientClasses',
		icon: <HiOutlineUsers />
	},
	{
		key: 'TabRes',
		label: 'Reservation Table',
		path: 'TabRes',
		icon: <HiOutlineAnnotation />
	},
	{
		key: 'ShowRes',
		label: 'Show Reservation',
		path: 'ShowRes',
		icon: <HiOutlineCog />
	}
	
]