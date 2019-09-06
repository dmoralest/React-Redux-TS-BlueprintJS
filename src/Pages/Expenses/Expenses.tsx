import './Expense.scss';

import React from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { GlobalState } from 'Redux/Store';
import * as ExpenseState from 'Redux/ExpenseState';

// Components
import { H2, Button } from '@blueprintjs/core';
import ExpenseList from './Components/ExpenseList';

// Utils
import ExpenseUtil from 'Utils/ExpenseUtil';

const Expense: React.FC<ExpenseProps> = ({ Expenses, AddExpense, UpdateExpense, DeleteExpense }) => {
	const categoryGroups = ExpenseUtil.GroupExpenses(Expenses);

	return (
		<div id="expense">
			<div className="add-expense-button-wrapper">
				<Button large icon="plus" onClick={AddExpense}>
					Add Expense
				</Button>
			</div>

			{categoryGroups.map(({ name, expenses }, index) => {
				return (
					<div className="expense-category-group" key={`expense-category-group-${name}-${index}`}>
						<H2>{name}</H2>
						<ExpenseList expenses={expenses} onExpenseUpdate={UpdateExpense} onExpenseDelete={DeleteExpense} />
					</div>
				);
			})}
		</div>
	);
};

//#region Props and Redux

interface IReduxProps extends ExpenseState.IExpenseState {}

interface IDispatchProps {
	AddExpense: typeof ExpenseState.Creators.AddExpense;
	UpdateExpense: typeof ExpenseState.Creators.UpdateExpense;
	DeleteExpense: typeof ExpenseState.Creators.DeleteExpense;
}

type ExpenseProps = IReduxProps & IDispatchProps;

function MapStateToProps(state: GlobalState): IReduxProps {
	return {
		...state.expenseState,
	};
}

function MapDispatchToProps(disaptch: Dispatch<AnyAction>): IDispatchProps {
	return bindActionCreators({ ...ExpenseState.Creators }, disaptch);
}

export default connect(
	MapStateToProps,
	MapDispatchToProps
)(Expense);
//#endregion
