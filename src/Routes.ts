import { IconName } from '@blueprintjs/icons';

import Dashboard from './Pages/Dashboard/Dashboard';
import Expenses from './Pages/Expenses/Expenses';
import Income from './Pages/Income/Income';

export interface IRoute {
	to: string;
	text: string;
	icon: IconName;
	page: any;
}

const Routes: Array<IRoute> = [
	{
		to: '/',
		text: 'Dashboard',
		icon: 'chart',
		page: Dashboard,
	},
	{
		to: '/Expenses',
		text: 'Expenses',
		icon: 'dollar',
		page: Expenses,
	},
	{
		to: '/Income',
		text: 'Income',
		icon: 'bank-account',
		page: Income,
	},
];

export default Routes;
