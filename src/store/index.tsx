import { applyMiddleware, combineReducers, createStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { tasksReducer } from './reducers/tasksReducer';
import { todoListReducer } from "./reducers/todoListReducer";
import { userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  tasks: tasksReducer,
  list: todoListReducer,
  user: userReducer
});

export const store = createStore(reducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;