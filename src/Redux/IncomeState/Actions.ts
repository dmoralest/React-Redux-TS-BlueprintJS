import Income from 'Models/Income';

export enum ActionTypes {
	AddIncome = 'AddIncome',
	UpdateIncome = 'UpdateIncome',
	DeleteIncome = 'DeleteIncome',
}

export interface IAddIncomeAction {
	type: ActionTypes.AddIncome;
	income: Income;
}

export interface IUpdateIncomeAction {
	type: ActionTypes.UpdateIncome;

	incomeId: string;
	income: Partial<Omit<Income, 'id'>>;
}

export interface IDeleteIncomeAction {
	type: ActionTypes.DeleteIncome;

	incomeId: string;
}

export type TAction = IAddIncomeAction | IUpdateIncomeAction | IDeleteIncomeAction;

export const Creators = {
	AddIncome: (): IAddIncomeAction => ({
		type: ActionTypes.AddIncome,
		income: new Income(),
	}),

	UpdateIncome: (incomeId: string, income: Partial<Omit<Income, 'id'>>): IUpdateIncomeAction => ({
		type: ActionTypes.UpdateIncome,

		incomeId,
		income,
	}),

	DeleteIncome: (incomeId: string): IDeleteIncomeAction => ({
		type: ActionTypes.DeleteIncome,

		incomeId,
	}),
};
