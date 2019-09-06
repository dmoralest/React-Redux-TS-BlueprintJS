import Expense from 'Models/Expense';
import { TAction, ActionTypes } from './Actions';

export interface IExpenseState {
	Expenses: Array<Expense>;
}

export const InitialState: IExpenseState = {
	Expenses: [],
};

export const Reducer = (state: IExpenseState = InitialState, action: TAction): IExpenseState => {
	switch (action.type) {
		case ActionTypes.AddExpense:
			return {
				...state,

				Expenses: [...state.Expenses, action.expense].sort((a, b) => a.category - b.category),
			};

		case ActionTypes.UpdateExpense:
			return {
				...state,

				Expenses: [
					...state.Expenses.map(expense => {
						if (expense.id !== action.expenseId) return expense;

						return {
							...expense,
							...action.expense,
						};
					}),
				].sort((a, b) => a.category - b.category),
			};

		case ActionTypes.DeleteExpense:
			return {
				...state,

				Expenses: [...state.Expenses.filter(expense => expense.id !== action.expenseId)].sort((a, b) => a.category - b.category),
			};

		default:
			return state;
	}
};
