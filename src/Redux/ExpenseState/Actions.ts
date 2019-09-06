import Expense from 'Models/Expense';

export enum ActionTypes {
	AddExpense = 'AddExpense',
	UpdateExpense = 'UpdateExpense',
	DeleteExpense = 'DeleteExpense',
}

export interface IAddExpenseAction {
	type: ActionTypes.AddExpense;
	expense: Expense;
}

export interface IUpdateExpenseAction {
	type: ActionTypes.UpdateExpense;

	expenseId: string;
	expense: Partial<Omit<Expense, 'id'>>;
}

export interface IDeleteExpenseAction {
	type: ActionTypes.DeleteExpense;

	expenseId: string;
}

export type TAction = IAddExpenseAction | IUpdateExpenseAction | IDeleteExpenseAction;

export const Creators = {
	AddExpense: (): IAddExpenseAction => ({
		type: ActionTypes.AddExpense,
		expense: new Expense(),
	}),

	UpdateExpense: (expenseId: string, expense: Partial<Omit<Expense, 'id'>>): IUpdateExpenseAction => ({
		type: ActionTypes.UpdateExpense,

		expenseId,
		expense,
	}),

	DeleteExpense: (expenseId: string): IDeleteExpenseAction => ({
		type: ActionTypes.DeleteExpense,

		expenseId,
	}),
};
