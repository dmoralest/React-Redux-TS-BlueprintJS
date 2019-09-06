import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as AppState from './AppState';
import * as IncomeState from './IncomeState';
import * as ExpenseState from './ExpenseState';

import * as Persistance from './Persistance';

const rootReducer = combineReducers({
	appState: AppState.Reducer,
	incomeState: IncomeState.Reducer,
	expenseState: ExpenseState.Reducer,
});

const store = createStore(rootReducer, Persistance.LoadState(), composeWithDevTools());

store.subscribe(() => {
	Persistance.SaveState(store.getState());
});

export default store;
export type GlobalState = ReturnType<typeof rootReducer>;
