import { Reducer } from "react";
import { tasksActionsEnum, tasksActionType, tasksStateType } from "../../types/types";

const initialState: tasksStateType = {
  tasks: [],
  pagesCount: 0,
  error: null,
  loading: false
};

export const tasksReducer = (state = initialState, action: tasksActionType): tasksStateType => {
  switch (action.type) {
    case tasksActionsEnum.TASKS_FETCH:
      return {
        ...state,
        loading: true
      };
    case tasksActionsEnum.TASKS_FETCH_SUCCESS:
      return {
        ...state,
        tasks: action.payload.tasks,
        pagesCount: action.payload.pagesCount,
        loading: false
      };
    case tasksActionsEnum.TASKS_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    default:
      return state;
  }
};