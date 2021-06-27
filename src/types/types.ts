export type taskType = {
  id: number,
  username: string,
  email: string,
  text: string,
  status: number,
};

export type tasksStateType = {
  loading: boolean,
  error: null | string,
  pagesCount: number,
  tasks: taskType[] | [],
};

export enum tasksActionsEnum {
  TASKS_FETCH = 'TASKS_FETCH',
  TASKS_FETCH_SUCCESS = 'TASKS_FETCH_SUCCESS',
  TASKS_FETCH_ERROR = 'TASKS_FETCH_ERROR',
}

interface fetchTasks {
  type: tasksActionsEnum.TASKS_FETCH;
}
interface fetchTasksSucces {
  type: tasksActionsEnum.TASKS_FETCH_SUCCESS,
  payload: { tasks: taskType[], pagesCount: number; };
}
interface fetchTasksError {
  type: tasksActionsEnum.TASKS_FETCH_ERROR,
  payload: string;
}

export type tasksActionType = fetchTasks | fetchTasksSucces | fetchTasksError;

export type sort_fieldType = 'id' | 'username' | 'email' | 'status';
export type sort_directionType = 'asc' | 'desc';

export type todoListType = {
  page: number,
  sort_field: sort_fieldType,
  sort_direction: sort_directionType;
};

export enum todoListEnum {
  CHANGE_PAGE_INC = 'CHANGE_PAGE_INC',
  CHANGE_PAGE_DEC = 'CHANGE_PAGE_DEC',
  CHANGE_SORT = 'CHANGE_SORT',
  CHANGE_DIRECTION = 'CHANGE_DIRECTION',
}

interface changePage {
  type: todoListEnum.CHANGE_PAGE_INC | todoListEnum.CHANGE_PAGE_DEC,
}
interface changeSort {
  type: todoListEnum.CHANGE_SORT,
  payload: sort_fieldType;
}
interface changeDirection {
  type: todoListEnum.CHANGE_DIRECTION,
  payload: sort_directionType;
}

export type todoListActionType = changePage | changeSort | changeDirection;