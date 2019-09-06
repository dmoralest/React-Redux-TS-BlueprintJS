import React from 'react';

import { MenuItem } from '@blueprintjs/core';
import { Suggest, ItemRenderer, ItemPredicate } from '@blueprintjs/select';

import RegexUtil from 'Utils/RegexUtil';
import ExpenseCategory, { ExpenseCategoryItem, ExpenseCategoryItemList } from 'Models/ExpenseCategory';

const TypedSuggest = Suggest.ofType<ExpenseCategoryItem>();

const ExpenseCategorySuggest: React.FC<IExpenseCategorySuggest> = ({ defaultCategory, onSelect }) => {
	const onItemSelect = (item: ExpenseCategoryItem) => {
		if (onSelect) onSelect(item.value);
	};

	const defaultSelectedItem = defaultCategory != null ? ExpenseCategoryItemList.find(item => item.value === defaultCategory) : undefined;

	return (
		<TypedSuggest
			fill
			itemRenderer={itemRenderer}
			onItemSelect={onItemSelect}
			itemPredicate={itemPredicate}
			items={ExpenseCategoryItemList}
			inputValueRenderer={item => item.text}
			defaultSelectedItem={defaultSelectedItem}
		/>
	);
};

//#region Item Predicate and Renderer
const itemPredicate: ItemPredicate<ExpenseCategoryItem> = (query, item, _index, exactMatch) => {
	const normalizedTitle = item.text.toLowerCase();
	const normalizedQuery = query.toLowerCase();

	if (exactMatch) {
		return normalizedTitle === normalizedQuery;
	} else {
		return `${normalizedTitle}`.indexOf(normalizedQuery) >= 0;
	}
};

const itemRenderer: ItemRenderer<ExpenseCategoryItem> = (item, { handleClick, modifiers, query }) => {
	return (
		<MenuItem
			active={modifiers.active}
			disabled={modifiers.disabled}
			// label={item.text}
			key={item.value}
			onClick={handleClick}
			text={RegexUtil.HighlightText(item.text, query)}
		/>
	);
};
//#endregion Item Predicate and Renderer

interface IExpenseCategorySuggest {
	defaultCategory?: ExpenseCategory;
	onSelect?: (category: ExpenseCategory) => void;
}

export default ExpenseCategorySuggest;
