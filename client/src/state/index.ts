import { createStore, applyMiddleware, AnyAction } from 'redux';
import reducers, { State } from './reducers';
import thunk, { ThunkDispatch, ThunkAction } from 'redux-thunk';

export const store = createStore(reducers, {}, applyMiddleware(thunk));

export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<State, any, AnyAction>;
export * as userActions from './actions/userActions';
