import React from 'react';
import classNames from 'classnames';

import ExpenseCategorySuggest from './ExpenseCategorySuggest';
import { Card, EditableText, Classes, Elevation, H3, FormGroup, NumericInput, Icon } from '@blueprintjs/core';

import Expense from 'Models/Expense';
import ExpenseCategory from 'Models/ExpenseCategory';

const ExpenseListItem: React.FC<IExpenseListItemProps> = ({
	expense,
	onDeleteClick,
	onNameChange,
	onAmountChange,
	onCategoryChange,
	onDayDueChange,
	onOccurencesPerMonthChange,
	skeleton,
}) => {
	const { id, name, amount, category, dayDue, occurencesPerMonth } = expense || new Expense();

	return (
		<Card elevation={Elevation.TWO} className="expense-list-item">
			<H3 className="header">
				<EditableText
					selectAllOnFocus
					intent="primary"
					placeholder="Name"
					value={name}
					onChange={onNameChange}
					className={classNames('expense-name', { [Classes.SKELETON]: skeleton })}
				/>
				<Icon
					icon="trash"
					iconSize={Icon.SIZE_LARGE}
					intent="warning"
					onClick={onDeleteClick}
					className={classNames('clickable-icon', { [Classes.SKELETON]: skeleton })}
				/>
			</H3>

			<form>
				<FormGroup inline label="Category" labelFor={`expense-category-${id}`} className={classNames({ [Classes.SKELETON]: skeleton })}>
					<ExpenseCategorySuggest defaultCategory={category} onSelect={onCategoryChange} />
				</FormGroup>
				<FormGroup inline label="Amount" labelFor={`expense-amount-${id}`} className={classNames({ [Classes.SKELETON]: skeleton })}>
					<NumericInput
						fill
						allowNumericCharactersOnly
						selectAllOnFocus
						id={`expense-amount-${id}`}
						leftIcon="dollar"
						buttonPosition="none"
						placeholder="Amount"
						value={amount || NumericInput.VALUE_EMPTY}
						onValueChange={onAmountChange}
					/>
				</FormGroup>
				<FormGroup inline label="Day Due" labelFor={`expense-day-due-${id}`} className={classNames({ [Classes.SKELETON]: skeleton })}>
					<NumericInput
						fill
						min={1}
						max={31}
						clampValueOnBlur
						allowNumericCharactersOnly
						selectAllOnFocus
						id={`expense-day-due-${id}`}
						leftIcon="calendar"
						buttonPosition="none"
						placeholder="Day Due"
						value={dayDue || NumericInput.VALUE_EMPTY}
						onValueChange={onDayDueChange}
					/>
				</FormGroup>
				<FormGroup
					inline
					label="Occurences Per Month"
					labelFor={`expense-occurences-per-month-${id}`}
					className={classNames({ [Classes.SKELETON]: skeleton })}>
					<NumericInput
						fill
						allowNumericCharactersOnly
						selectAllOnFocus
						id={`expense-occurences-per-month-${id}`}
						leftIcon="repeat"
						buttonPosition="none"
						placeholder="Occurences Per Month"
						value={occurencesPerMonth || NumericInput.VALUE_EMPTY}
						onValueChange={onOccurencesPerMonthChange}
					/>
				</FormGroup>
			</form>
		</Card>
	);
};

interface IExpenseListItemProps {
	expense?: Expense;

	onDeleteClick?: () => void;
	onNameChange?: (value: string) => void;
	onAmountChange?: (value: number) => void;
	onCategoryChange?: (value: ExpenseCategory) => void;
	onDayDueChange?: (value: number) => void;
	onOccurencesPerMonthChange?: (value: number) => void;

	skeleton?: boolean;
}

export default ExpenseListItem;
