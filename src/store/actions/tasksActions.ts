import { Dispatch } from "react";
import { sort_directionType, sort_fieldType, tasksActionsEnum, tasksActionType } from "../../types/types";
import { fetchTasks } from '../../service/services';



export const fetchTasksAction = (page: number, sort_field: sort_fieldType, sort_direction: sort_directionType) => {
  return async (dispatch: Dispatch<tasksActionType>) => {
    try {
      dispatch({
        type: tasksActionsEnum.TASKS_FETCH
      });
      fetchTasks(page, sort_field, sort_direction)
        .then(response => {
          dispatch({
            type: tasksActionsEnum.TASKS_FETCH_SUCCESS,
            payload: response
          });
        })
        .catch(console.log);
    }
    catch {
      dispatch({
        type: tasksActionsEnum.TASKS_FETCH_ERROR,
        payload: 'Tasks loading error'
      });
    }
  };
};
