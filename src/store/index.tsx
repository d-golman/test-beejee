import { applyMiddleware, combineReducers, createStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { tasksReducer } from './reducers/tasksReducer';
import { todoListReducer } from "./reducers/todoListReducer";

const reducer = combineReducers({
  tasks: tasksReducer,
  list: todoListReducer
});

export const store = createStore(reducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;