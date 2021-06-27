import { Dispatch } from "react";
import { sort_directionType, sort_fieldType, tasksActionsEnum, tasksActionType } from "../../types/types";


const API_URL = "https://uxcandy.com/~shapoval/test-task-backend/v2/";

export const fetchTasksAction = (page: number, sort_field: sort_fieldType, sort_direction: sort_directionType) => {
  return async (dispatch: Dispatch<tasksActionType>) => {
    try {
      dispatch({
        type: tasksActionsEnum.TASKS_FETCH
      });
      await fetch(`${API_URL}?developer=Golman
      &page=${page}
      &sort_direction=${sort_direction}
      &sort_field=${sort_field}
      
      `)
        .then(response => response.json())
        .then(response => ({
          tasks: response['message']['tasks'],
          pagesCount: Math.ceil(response['message']['total_task_count'] / 3)
        }))
        .then(response => {
          dispatch({
            type: tasksActionsEnum.TASKS_FETCH_SUCCESS,
            payload: response
          });
        });
    }
    catch {
      dispatch({
        type: tasksActionsEnum.TASKS_FETCH_ERROR,
        payload: 'Tasks loading error'
      });
    }
  };
};

export const postTasksAction = async (data: HTMLFormElement) => {

  const formData: FormData = new FormData(data);

  return await fetch(`${API_URL}create?developer=Golman`, {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(response => {
      if (response['status'] === 'ok') {
        return response['message']['tasks'];
      }
      else {
        return response['message'];
      }
    })
    .catch(console.log);
};