import Expense from 'Models/Expense';
import ExpenseCategory from 'Models/ExpenseCategory';

export default class ExpenseUtil {
	public static GroupExpenses(expenses: Array<Expense>) {
		return Object.values(ExpenseCategory)
			.filter(key => typeof key === 'number')
			.map(key => ({
				name: ExpenseCategory[key as number],
				expenses: expenses.filter(expense => expense.category === key),
			}));
	}

	public static CalculateMonthlyExpenses(expenses: Array<Expense>): Array<Expense> {
		let monthlyExpenses: Array<Expense> = [];

		expenses.forEach(expense => {
			monthlyExpenses.push(
				...[...Array(expense.occurencesPerMonth || 1)].map<Expense>((_, index) => {
					const dayDue = expense.dayDue || 1;
					const occurencesPerMonth = expense.occurencesPerMonth || 1;

					return {
						...expense,

						dayDue: occurencesPerMonth === 1 ? expense.dayDue : Math.floor(dayDue + (31 / occurencesPerMonth) * index),
					};
				})
			);
		});

		monthlyExpenses = monthlyExpenses.sort((a, b) => (a.dayDue || 1) - (b.dayDue || 1));

		return monthlyExpenses;
	}
}
