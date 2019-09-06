import React from 'react';

//Components
import { Card, H2, Colors, Switch } from '@blueprintjs/core';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, Legend } from 'recharts';

//Models
import Income from 'Models/Income';
import Expense from 'Models/Expense';

//Constants
import BBColors from 'Constants/Colors';

//Redux
import { connect } from 'react-redux';
import { GlobalState } from 'Redux/Store';
import * as AppState from 'Redux/AppState';

const AccountBalanceChart: React.FC<AccountBalanceChartProps> = ({ expenses, incomes, UseDarkMode }) => {
	const [startWithAllIncome, setStartWithAllIncome] = React.useState<boolean>(true);
	const [showSeparateAreas, setShowSeparateAreas] = React.useState<boolean>(false);

	const Chart = showSeparateAreas ? SeparatedAreaChart : CombinedAreaChart;

	return (
		<div id="account-balance-chart-wrapper">
			<Card className="card">
				<H2 className="heading">
					Monthly Expenses Account Balance
					<Switch
						large
						checked={showSeparateAreas}
						label="Show Income and Expenses Separately"
						onChange={() => setShowSeparateAreas(!showSeparateAreas)}
					/>
					<Switch
						disabled={showSeparateAreas}
						large
						checked={startWithAllIncome}
						label="Begin Month With All Incomes"
						onChange={() => setStartWithAllIncome(!startWithAllIncome)}
					/>
				</H2>
				<div className="account-balance-chart-container">
					<Chart Incomes={incomes} Expenses={expenses} UseDarkMode={UseDarkMode} StartWithAllIncome={startWithAllIncome} />
				</div>
			</Card>
		</div>
	);
};

//#region Charts

const getMinYAxis = (dataMin: number) => {
	if (dataMin > 0) return 0;

	return Math.floor(dataMin / 100) * 100;
};

const CombinedAreaChart: React.FC<IChartProps> = ({ Incomes, Expenses, UseDarkMode, StartWithAllIncome }) => {
	const [data, setData] = React.useState<Array<any>>([]);

	React.useEffect(() => {
		// Keep running total
		let runningTotal = StartWithAllIncome ? Incomes.reduce<number>((total, income) => total + (income.amount || 0), 0) : 0;

		setData(
			[...Array(32)].map((_, day) => {
				// Each day add each hyrbrid for that day to the running total
				runningTotal -= Expenses.filter(expense => expense.dayDue === day).reduce<number>((sum, current) => sum + (current.amount || 0), 0);

				if (!StartWithAllIncome)
					runningTotal += Incomes.filter(income => income.dayOfDeposit === day).reduce<number>((sum, current) => sum + (current.amount || 0), 0);

				// Set that day's amount to the new running total
				return {
					day: day,
					amount: +runningTotal.toFixed(1),
				};
			})
		);
	}, [Expenses, Incomes, StartWithAllIncome]);

	return (
		<ResponsiveContainer>
			<AreaChart
				data={data}
				margin={{
					top: 10,
					right: 30,
					left: 0,
					bottom: 0,
				}}>
				<CartesianGrid strokeDasharray="3 3" color={UseDarkMode ? '#FFF' : Colors.GRAY1} />
				<XAxis dataKey="day" stroke={UseDarkMode ? '#FFF' : Colors.GRAY1} />
				<YAxis domain={[getMinYAxis, dataMax => Math.ceil(dataMax / 100) * 100]} stroke={UseDarkMode ? '#FFF' : Colors.GRAY1} />
				<Tooltip
					contentStyle={{ color: Colors.GRAY1 }}
					formatter={value => [`$${value}`, `Remaining Balance`]}
					labelFormatter={(label: string | number) => `Day ${label}`}
				/>
				<Legend />
				<Area type="monotone" dataKey="amount" stroke={BBColors.Qualitative[0]} fill={BBColors.Qualitative[0]} />
			</AreaChart>
		</ResponsiveContainer>
	);
};

const SeparatedAreaChart: React.FC<IChartProps> = ({ Incomes, Expenses, UseDarkMode }) => {
	const [data, setData] = React.useState<Array<any>>([]);

	React.useEffect(() => {
		let incomesRunningTotal = 0;
		let expensesRunningTotal = 0;

		setData(
			[...Array(32)].map((_, day) => {
				incomesRunningTotal += Incomes.filter(income => income.dayOfDeposit === day).reduce<number>((sum, current) => sum + (current.amount || 0), 0);
				expensesRunningTotal += Expenses.filter(expense => expense.dayDue === day).reduce<number>((sum, current) => sum + (current.amount || 0), 0);

				return {
					day: day,
					incomes: incomesRunningTotal,
					expenses: expensesRunningTotal,
				};
			})
		);
	}, [Expenses, Incomes]);

	console.log(data);

	return (
		<ResponsiveContainer>
			<AreaChart
				data={data}
				margin={{
					top: 10,
					right: 30,
					left: 0,
					bottom: 0,
				}}>
				<CartesianGrid strokeDasharray="3 3" color={UseDarkMode ? '#FFF' : Colors.GRAY1} />
				<XAxis dataKey="day" stroke={UseDarkMode ? '#FFF' : Colors.GRAY1} />
				<YAxis domain={[getMinYAxis, dataMax => Math.ceil(dataMax / 100) * 100]} stroke={UseDarkMode ? '#FFF' : Colors.GRAY1} />
				<Tooltip
					contentStyle={{ color: Colors.GRAY1 }}
					formatter={(value, name) => [`$${(+value).toFixed(1)}`, name === 'incomes' ? 'Income' : 'Expenses']}
					labelFormatter={(label: string | number) => `Day ${label}`}
				/>
				<Legend />
				<Area type="monotone" dataKey="incomes" stroke={BBColors.Qualitative[0]} fill={BBColors.Qualitative[0]} />
				<Area type="monotone" dataKey="expenses" stroke={BBColors.Qualitative[3]} fill={BBColors.Qualitative[3]} />
			</AreaChart>
		</ResponsiveContainer>
	);
};

interface IChartProps {
	UseDarkMode: boolean;
	Incomes: Array<Income>;
	Expenses: Array<Expense>;

	StartWithAllIncome?: boolean;
}

//#endregion Charts

//#region Props and Redux
interface IAccountBalanceChartProps {
	incomes: Array<Income>;
	expenses: Array<Expense>;
}

interface IReduxProps extends AppState.IAppState {}

type AccountBalanceChartProps = IAccountBalanceChartProps & IReduxProps;

function MapStateToProps(state: GlobalState): IReduxProps {
	return {
		...state.appState,
	};
}

export default connect(MapStateToProps)(AccountBalanceChart);
//#endregion
