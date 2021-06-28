import { sort_directionType, sort_fieldType } from "../types/types";
import { deleteCookie, getCookie, setCookie } from "./cookie";

const API_URL = "https://uxcandy.com/~shapoval/test-task-backend/v2/";
const developer = '421421';

export const fetchTasks = async (page: number, sort_field: sort_fieldType, sort_direction: sort_directionType) => {
  return await fetch(`${API_URL}?developer=${developer}&page=${page}&sort_direction=${sort_direction}&sort_field=${sort_field}`)
    .then(response => response.json())
    .then(response => ({
      tasks: response['message']['tasks'],
      pagesCount: Math.ceil(response['message']['total_task_count'] / 3)
    }));
};

export const postTask = async (data: HTMLFormElement) => {

  const formData: FormData = new FormData(data);

  return await fetch(`${API_URL}create?developer=${developer}`, {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(response => {
      if (response['status'] === 'ok') {
        return ('Задача добавлена');
      }
      else {
        return ('Что-то пошло не так');
      }
    });
};

type editDataType = {
  id: number,
  oldText: string,
  newText: string,
  completed: boolean,
  oldStatus: number;
};

export const editTask = async (editData: editDataType) => {
  const { id, oldText, newText, completed, oldStatus } = editData;
  const formData: FormData = new FormData();
  const edited = oldText !== newText;
  let text: string = newText;
  let status: number;

  if (edited || oldStatus === 1 || oldStatus === 11) {
    if (completed) {
      status = 11;
    }
    else {
      status = 1;
    }
  } else {
    if (completed) {
      status = 10;
    }
    else {
      status = 0;
    }
  }

  formData.append('text', text!);
  formData.append('status', `${status}`);
  formData.append('token', `${getCookie('token')}`);

  return await fetch(`${API_URL}edit/${id}?developer=${developer}`, {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(response => {
      if (response['status'] === 'ok') {
        return null;
      }
      else {
        return ('Ошибка доступа, войдите в систему');
      }
    });

};

export const login = async (data: HTMLFormElement) => {

  const formData: FormData = new FormData(data);
  return await fetch(`${API_URL}login?developer=${developer}`, {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(response => {
      if (response['status'] !== 'ok') {
        return 'Неверные данные';
      }
      else {
        setCookie('token', response['message']['token']);
        return null;
      }
    });
};

export const logout = () => {
  deleteCookie('token');
};