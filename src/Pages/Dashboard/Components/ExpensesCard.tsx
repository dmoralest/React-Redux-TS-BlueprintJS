import React from 'react';

// Components
import { Card, H2, Switch } from '@blueprintjs/core';
import { Sector, PieChart, Pie, ResponsiveContainer, Legend, Cell } from 'recharts';

// Models
import Expense from 'Models/Expense';

// Constants
import Colors from 'Constants/Colors';
import ExpenseUtil from 'Utils/ExpenseUtil';

const ColorArray = Colors.Qualitative;

const ExpensesCard: React.FC<IExpensesCardProps> = ({ expenses }) => {
	const [activeIndex, setActiveIndex] = React.useState(0);
	const [simplified, setSimplified] = React.useState(true);

	let data = simplified ? ReduceExpenses(expenses) : expenses;

	return (
		<Card className="card">
			<H2 className="heading">
				Monthly Expenses
				<Switch large checked={simplified} label="Simplified" onChange={() => setSimplified(!simplified)} />
			</H2>
			<div className="response-container-wrapper">
				<ResponsiveContainer>
					<PieChart>
						<Pie
							nameKey="name"
							dataKey="amount"
							data={data}
							activeIndex={activeIndex}
							activeShape={ActiveShape}
							onMouseEnter={(_, index) => setActiveIndex(index)}
							innerRadius={80}
							outerRadius={130}>
							{data.map((_, index) => (
								<Cell key={`cell-${index}`} fill={ColorArray[index % ColorArray.length]} />
							))}
						</Pie>
						<Legend verticalAlign="bottom" />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</Card>
	);
};

const ReduceExpenses = (expenses: Array<Expense>): Array<Expense> => {
	return ExpenseUtil.GroupExpenses(expenses).flatMap<Expense>(group => {
		if (group.expenses.length === 0) return [];
		// if (group.expenses.length > 2) return group.expenses;

		return group.expenses.reduce<Expense>((prev, curr) => {
			prev.amount = (prev.amount || 0) + (curr.amount || 0);
			return prev;
		}, new Expense(group.name, 0, group.expenses[0].category));
	});
};

//#region Active Shape
const ActiveShape = ({ cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value, name }: any) => {
	const RADIAN = Math.PI / 180;
	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + (outerRadius + 10) * cos;
	const sy = cy + (outerRadius + 10) * sin;
	const mx = cx + (outerRadius + 30) * cos;
	const my = cy + (outerRadius + 30) * sin;
	const ex = mx + (cos >= 0 ? 1 : -1) * 22;
	const ey = my;
	const textAnchor = cos >= 0 ? 'start' : 'end';

	return (
		<g>
			<text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
				{payload.name}
			</text>
			<Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
			<Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
			<path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
			<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
			<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={fill}>
				{`${name}: $${value}`}
			</text>
		</g>
	);
};
//#endregion Active Shape

interface IExpensesCardProps {
	expenses: Array<Expense>;
}

export default ExpensesCard;
