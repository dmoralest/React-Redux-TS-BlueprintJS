import React from 'react';
import classNames from 'classnames';
import { Card, EditableText, Classes, Elevation, H2, FormGroup, NumericInput, Icon } from '@blueprintjs/core';

import Income from 'Models/Income';

const IncomeListItem: React.FC<IIncomeListItemProps> = ({ income, onDeleteClick, onNameChange, onAmountChange, onDayOfDepositChange, skeleton }) => {
	const { id, name, amount, dayOfDeposit } = income || new Income();

	return (
		<Card elevation={Elevation.TWO} className="income-list-item">
			<H2 className="header">
				<EditableText
					selectAllOnFocus
					intent="primary"
					placeholder="Name"
					value={name}
					onChange={onNameChange}
					className={classNames('income-name', { [Classes.SKELETON]: skeleton })}
				/>
				<Icon
					icon="trash"
					iconSize={Icon.SIZE_LARGE}
					intent="warning"
					onClick={onDeleteClick}
					className={classNames('clickable-icon', { [Classes.SKELETON]: skeleton })}
				/>
			</H2>

			<form>
				<FormGroup inline label="Amount" labelFor={`income-amount-${id}`} className={classNames({ [Classes.SKELETON]: skeleton })}>
					<NumericInput
						selectAllOnFocus
						id={`income-amount-${id}`}
						leftIcon="dollar"
						buttonPosition="none"
						placeholder="Amount"
						value={amount || NumericInput.VALUE_EMPTY}
						onValueChange={onAmountChange}
					/>
				</FormGroup>
				<FormGroup inline label="Day of Deposit" labelFor={`income-day-of-deposit-${id}`} className={classNames({ [Classes.SKELETON]: skeleton })}>
					<NumericInput
						selectAllOnFocus
						id={`income-day-of-deposit-${id}`}
						leftIcon="calendar"
						buttonPosition="none"
						placeholder="Day of Deposity"
						value={dayOfDeposit || NumericInput.VALUE_EMPTY}
						onValueChange={onDayOfDepositChange}
					/>
				</FormGroup>
			</form>
		</Card>
	);
};

interface IIncomeListItemProps {
	income?: Income;

	onDeleteClick?: () => void;
	onNameChange?: (value: string) => void;
	onAmountChange?: (value: number) => void;
	onDayOfDepositChange?: (value: number) => void;

	skeleton?: boolean;
}

export default IncomeListItem;
