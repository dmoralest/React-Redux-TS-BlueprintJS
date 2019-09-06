import Income from 'Models/Income';
import { TAction, ActionTypes } from './Actions';

export interface IIncomeState {
	Incomes: Array<Income>;
}

export const InitialState: IIncomeState = {
	Incomes: [],
};

export const Reducer = (state: IIncomeState = InitialState, action: TAction): IIncomeState => {
	switch (action.type) {
		case ActionTypes.AddIncome:
			return {
				...state,

				Incomes: [...state.Incomes, action.income],
			};

		case ActionTypes.UpdateIncome:
			return {
				...state,

				Incomes: [
					...state.Incomes.map(income => {
						if (income.id !== action.incomeId) return income;

						return {
							...income,
							...action.income,
						};
					}),
				],
			};

		case ActionTypes.DeleteIncome:
			return {
				...state,

				Incomes: [...state.Incomes.filter(income => income.id !== action.incomeId)],
			};

		default:
			return state;
	}
};
