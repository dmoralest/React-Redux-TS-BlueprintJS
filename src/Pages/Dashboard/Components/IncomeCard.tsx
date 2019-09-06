import React from 'react';

// Components
import { Card, H2 } from '@blueprintjs/core';
import { Sector, PieChart, Pie, ResponsiveContainer, Legend, Cell } from 'recharts';

// Models
import Income from 'Models/Income';

// Constants
import Colors from 'Constants/Colors';

const ColorArray = Colors.Qualitative;

const IncomeCard: React.FC<IIncomesCardProps> = ({ incomes }) => {
	const [activeIndex, setActiveIndex] = React.useState(0);

	return (
		<Card className="card">
			<H2 className="heading">Monthly Income</H2>
			<div className="response-container-wrapper">
				<ResponsiveContainer>
					<PieChart>
						<Pie
							nameKey="name"
							dataKey="amount"
							data={incomes}
							activeIndex={activeIndex}
							activeShape={GetActiveShape(incomes)}
							onMouseEnter={(_, index) => setActiveIndex(index)}
							innerRadius={80}
							outerRadius={130}>
							{incomes.map((_, index) => (
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

//#region Active Shape
const GetActiveShape = (incomes: Array<Income>) => {
	const totalIncome = incomes.reduce<number>((sum, current) => sum + (current.amount || 0), 0);

	return ({ cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, value, name, percent }: any) => {
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
					{`$${totalIncome.toFixed(2)}`}
				</text>
				<Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
				<Sector
					cx={cx}
					cy={cy}
					startAngle={startAngle}
					endAngle={endAngle}
					innerRadius={outerRadius + 6}
					outerRadius={outerRadius + 10}
					fill={fill}
				/>
				<path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
				<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
				<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={fill}>
					{`${name}: $${value}`}
				</text>
			</g>
		);
	};
};
//#endregion Active Shape

interface IIncomesCardProps {
	incomes: Array<Income>;
}

export default IncomeCard;
