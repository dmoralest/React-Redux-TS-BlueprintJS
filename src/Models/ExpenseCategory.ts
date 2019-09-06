enum ExpenseCategory {
	Bills,
	Food,
	Subscriptions,
	Other,
}

export default ExpenseCategory;

export type ExpenseCategoryItem = {
	value: ExpenseCategory;
	text: string;
};

export const ExpenseCategoryItemList: Array<ExpenseCategoryItem> = Object.values(ExpenseCategory)
	.filter(key => typeof key === 'number')
	.map(key => ({
		text: ExpenseCategory[key as number],
		value: key as number,
	}));
