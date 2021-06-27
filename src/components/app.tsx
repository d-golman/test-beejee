import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { fetchTasksAction, postTasksAction } from '../store/actions/tasksActions';
import TodoList from './todoList/todoList';

const App: React.FC = () => {

  const dispatch = useDispatch();
  const { page, sort_field, sort_direction } = useTypedSelector(state => state.list);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postTasksAction(event.currentTarget)
      .then(() =>
        dispatch(fetchTasksAction(page, sort_field, sort_direction))
      );
  };


  return (
    <div>
      <TodoList />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Имя</label>
          <input required type="username" id='username' name='username' />
        </div>
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input required type="email" id='email' name='email' />
        </div>
        <div className="form-group">
          <label htmlFor="text">Задача</label>
          <input required type="text" id='text' name='text' />
        </div>
        <input type="submit" value="Отправить" />
      </form>
    </div>
  );
};

export default App;
