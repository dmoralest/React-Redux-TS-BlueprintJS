import React from 'react';

import Income from 'Models/Income';
import IncomeListItem from './IncomeListItem';

const IncomeList: React.FC<IIncomeListProps> = ({ incomes, onIncomeUpdate, onIncomeDelete }) => {
	const getOnNameChangeHandler = (incomeId: string) => {
		return (value: string) => {
			onIncomeUpdate(incomeId, {
				name: value,
			});
		};
	};

	const getNumericChangeHandler = (incomeId: string, fieldName: keyof Pick<Income, 'amount' | 'dayOfDeposit'>) => {
		return (value: number) => {
			onIncomeUpdate(incomeId, {
				[fieldName]: value,
			});
		};
	};

	if (incomes.length === 0) {
		return (
			<div id="income-list">
				<IncomeListItem skeleton />
			</div>
		);
	}

	return (
		<div id="income-list">
			{incomes.map(income => {
				const { id } = income;
				return (
					<IncomeListItem
						key={`IncomeList-Card-${id}`}
						income={income}
						onNameChange={getOnNameChangeHandler(id)}
						onAmountChange={getNumericChangeHandler(id, 'amount')}
						onDayOfDepositChange={getNumericChangeHandler(id, 'dayOfDeposit')}
						onDeleteClick={() => onIncomeDelete(id)}
					/>
				);
			})}
		</div>
	);
};

interface IIncomeListProps {
	incomes: Array<Income>;
	onIncomeUpdate: (incomeId: string, updates: Partial<Omit<Income, 'id'>>) => void;
	onIncomeDelete: (incomeId: string) => void;
}

export default IncomeList;
