import UUID from 'uuid/v4';
import ExpenseCategory from './ExpenseCategory';

export default class Expense {
	public readonly id: string;
	public name?: string;
	public amount?: number;
	public category: ExpenseCategory;
	public dayDue?: number;
	public occurencesPerMonth?: number;

	constructor(name?: string, amount?: number, category?: ExpenseCategory, dayDue?: number, occurencesPerMonth?: number) {
		this.id = UUID();
		this.name = name;
		this.amount = amount;
		this.category = category || ExpenseCategory.Other;
		this.dayDue = dayDue || 1;
		this.occurencesPerMonth = occurencesPerMonth || 1;
	}

	public toString = (): string => {
		return `$${this.amount} due on day ${this.dayDue} for ${this.name}`;
	};
}
