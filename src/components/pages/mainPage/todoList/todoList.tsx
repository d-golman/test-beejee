import React, { ChangeEvent, Props, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { editTask } from '../../../../service/services';
import { fetchTasksAction } from '../../../../store/actions/tasksActions';
import { incrementPage, decrementPage, changeSortField, changeSortDirection } from '../../../../store/actions/todoListActions';
import { taskType } from '../../../../types/types';
import './todoList.sass';

const TodoList: React.FC = () => {

  const dispatch = useDispatch();


  const handleSortFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeSortField(event.target.value));
  };

  const handleSortDirectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeSortDirection(event.target.value));
  };

  return (
    <div className='todo-list'>
      <div className="select-fields">
        <div className="select-group">
          <label htmlFor="select-sort-field">Поле сортировки</label>
          <select onChange={handleSortFieldChange} name="select-sort-field" id="select-sort-field">
            <option value="username">Имя</option>
            <option value="email">Email</option>
            <option value="status">Статус</option>
          </select>
        </div>
        <div className="select-group">
          <label htmlFor="select-sort-direction">Направление сортировки</label>
          <select onChange={handleSortDirectionChange} name="select-sort-direction" id="select-sort-direction">
            <option value="asc">По возрастанию</option>
            <option value="desc">По убыванию</option>
          </select>
        </div>
      </div>
      <Tasks />
    </div>
  );
};

const Tasks: React.FC = () => {

  const dispatch = useDispatch();
  const parser = new DOMParser();
  const { tasks, pagesCount, error } = useTypedSelector(state => state.tasks);
  const { page, sort_field, sort_direction } = useTypedSelector(state => state.list);
  const { logged } = useTypedSelector(state => state.user);


  useEffect(() => {
    dispatch(fetchTasksAction(page, sort_field, sort_direction));
  }, [page, sort_field, sort_direction]);

  const handlePageChange = (direction: 'inc' | 'dec') => {
    if (direction === 'inc' && page < pagesCount) {
      dispatch(incrementPage());
    } else if (direction === 'dec' && page > 1) {
      dispatch(decrementPage());
    }
  };

  const Status: React.FC<{ status: number; }> = ({ status }) => {
    switch (status) {
      case 0:
        return <div className="status">
          <span>Задача не выполнена</span>
        </div>;
      case 10:
        return <div className="status">
          <span>Задача выполнена</span>
        </div>;
      case 1:
        return <div className="status">
          <span>Задача не выполнена</span>
          <span>Задача отредактирована администратором</span>
        </div>;
      case 11:
        return <div className="status">
          <span>Задача выполнена</span>
          <span>Задача отредактирована администратором</span>
        </div>;
      default:
        return <></>;
    }
  };

  const Task: React.FC<{ task: taskType; }> = ({ task }) => {

    const textRef = useRef<HTMLTextAreaElement>(null);
    const completedRef = useRef<HTMLInputElement>(null);
    const [editStatus, setEditStatus] = useState<string | null>(null);

    const handleTaskEdit = (event: React.FormEvent<HTMLFormElement>, id: number, text: string, status: number) => {
      event.preventDefault();
      const editData = {
        id: id,
        oldText: text,
        newText: textRef.current!.value,
        completed: completedRef.current!.checked,
        oldStatus: status
      };
      editTask(editData)
        .then(editStatus => {
          setEditStatus(editStatus);
          setTimeout(() => {
            setEditStatus(null);
          }, 2000);
        });
    };

    return (
      <form onSubmit={(event) => handleTaskEdit(event, task.id, task.text, task.status)} key={task.id} className="task">
        <p>Имя: {task.username}</p>
        <p>Email: {task.email}</p>
        <Status status={task.status} />
        <textarea className='task-text' ref={textRef} readOnly={!logged} name='text' defaultValue={`${parser.parseFromString(task.text, 'text/html').body.textContent}`} />
        { logged && <>
          <label htmlFor={`task-complited${task.id}`}>Выполнено </label>
          <input ref={completedRef} type="checkbox" id={`task-complited${task.id}`} name="comlited" defaultChecked={task.status === 10 || task.status === 11} />
          <input className='task-save' type="submit" value={editStatus ? editStatus : 'Сохранить'} />
        </>}
      </form>
    );
  };

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div >
      <div className="tasks">
        {tasks.map((task: taskType) => {
          return <Task task={task} />;
        })}
      </div>
      <div className="pages">
        <button disabled={page <= 1} onClick={() => handlePageChange('dec')}>&lt;</button>
        <button disabled={page >= pagesCount} onClick={() => handlePageChange('inc')}>&gt;</button>
      </div>
    </div>
  );
};

export default TodoList;
