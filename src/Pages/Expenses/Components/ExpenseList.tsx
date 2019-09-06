import React from 'react';

import Expense from 'Models/Expense';
import ExpenseListItem from './ExpenseListItem';
import ExpenseCategory from 'Models/ExpenseCategory';

const ExpenseList: React.FC<IExpenseListProps> = ({ expenses, onExpenseUpdate, onExpenseDelete }) => {
	const getOnNameChangeHandler = (expenseId: string) => {
		return (value: string) => {
			onExpenseUpdate(expenseId, {
				name: value,
			});
		};
	};

	const getNumericChangeHandler = (expenseId: string, fieldName: keyof Pick<Expense, 'amount' | 'dayDue' | 'occurencesPerMonth'>) => {
		return (value: number) => {
			onExpenseUpdate(expenseId, {
				[fieldName]: value,
			});
		};
	};

	const getOnCategoryChangeHandler = (expenseId: string) => {
		return (value: ExpenseCategory) => {
			onExpenseUpdate(expenseId, {
				category: value,
			});
		};
	};

	if (expenses.length === 0) {
		return (
			<div id="expense-list">
				<ExpenseListItem skeleton />
			</div>
		);
	}

	return (
		<div id="expense-list">
			{expenses.map(expense => {
				const { id } = expense;

				return (
					<ExpenseListItem
						key={`ExpenseList-Card-${id}`}
						expense={expense}
						onNameChange={getOnNameChangeHandler(id)}
						onAmountChange={getNumericChangeHandler(id, 'amount')}
						onDeleteClick={() => onExpenseDelete(id)}
						onCategoryChange={getOnCategoryChangeHandler(id)}
						onDayDueChange={getNumericChangeHandler(id, 'dayDue')}
						onOccurencesPerMonthChange={getNumericChangeHandler(id, 'occurencesPerMonth')}
					/>
				);
			})}
		</div>
	);
};

interface IExpenseListProps {
	expenses: Array<Expense>;
	onExpenseUpdate: (expenseId: string, updates: Partial<Omit<Expense, 'id'>>) => void;
	onExpenseDelete: (expenseId: string) => void;
}

export default ExpenseList;
