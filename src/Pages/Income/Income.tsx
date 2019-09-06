import './Income.scss';

import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { GlobalState } from 'Redux/Store';
import * as IncomeState from 'Redux/IncomeState';

import { Button } from '@blueprintjs/core';
import IncomeList from './Components/IncomeList';

const Income: React.FC<IncomeProps> = ({ Incomes, AddIncome, UpdateIncome, DeleteIncome }) => {
	return (
		<div id="income">
			<IncomeList incomes={Incomes} onIncomeUpdate={UpdateIncome} onIncomeDelete={DeleteIncome} />
			<Button id="add-income-button" icon="plus" onClick={AddIncome}>
				Add Income
			</Button>
		</div>
	);
};

//#region Props and Redux

interface IReduxProps extends IncomeState.IIncomeState {}

interface IDispatchProps {
	AddIncome: typeof IncomeState.Creators.AddIncome;
	UpdateIncome: typeof IncomeState.Creators.UpdateIncome;
	DeleteIncome: typeof IncomeState.Creators.DeleteIncome;
}

type IncomeProps = IReduxProps & IDispatchProps;

function MapStateToProps(state: GlobalState): IReduxProps {
	return {
		...state.incomeState,
	};
}

function MapDispatchToProps(disaptch: Dispatch<AnyAction>): IDispatchProps {
	return bindActionCreators({ ...IncomeState.Creators }, disaptch);
}

export default connect(
	MapStateToProps,
	MapDispatchToProps
)(Income);
//#endregion
