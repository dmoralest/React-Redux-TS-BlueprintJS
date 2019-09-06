import './Dashboard.scss';

import React from 'react';

// Redux
import { connect } from 'react-redux';
import { GlobalState } from 'Redux/Store';
import * as IncomeState from 'Redux/IncomeState';
import * as ExpenseState from 'Redux/ExpenseState';

// Components
import IncomeCard from './Components/IncomeCard';
import ExpensesCard from './Components/ExpensesCard';

// Utils
import ExpenseUtil from 'Utils/ExpenseUtil';
import AccountBalanceChart from './Components/AccountBalanceChart';

const Dashboard: React.FC<DashboardProps> = ({ Expenses, Incomes }) => {
	const monthlyExpenses = ExpenseUtil.CalculateMonthlyExpenses(Expenses);

	return (
		<div id="dashboard">
			<div id="pies">
				<IncomeCard incomes={Incomes} />
				<ExpensesCard expenses={monthlyExpenses} />
			</div>
			<AccountBalanceChart expenses={monthlyExpenses} incomes={Incomes} />
		</div>
	);
};

//#region Props and Redux

type DashboardProps = IReduxProps;

interface IReduxProps extends ExpenseState.IExpenseState, IncomeState.IIncomeState {}

function MapStateToProps(state: GlobalState): IReduxProps {
	return {
		...state.incomeState,
		...state.expenseState,
	};
}

export default connect(MapStateToProps)(Dashboard);
//#endregion
