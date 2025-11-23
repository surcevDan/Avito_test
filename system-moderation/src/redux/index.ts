import { combineReducers, compose, applyMiddleware, createStore } from "redux";
import { thunk, type ThunkDispatch } from "redux-thunk";
import listReducer from "@/redux/reducers/list-reducer.ts";
import { useDispatch } from "react-redux";
import type { AnyAction } from "redux";
import type { Dispatch } from "redux";
import itemReducer from "@/redux/reducers/item-reducer.ts";
import statsReducer from "@/redux/reducers/stats-reducer.ts";


let rootReducers = combineReducers({
  list: listReducer,
  item: itemReducer,
  stats: statsReducer
});


type RootReducerType = typeof rootReducers;
export type AppStateType = ReturnType<RootReducerType>;
export type AppThunkDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>;
export type AppDispatch = AppThunkDispatch & Dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

// @ts-ignore
window.store = store;
export default store;