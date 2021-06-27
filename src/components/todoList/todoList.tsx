import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchTasksAction } from '../../store/actions/tasksActions';
import { incrementPage, decrementPage } from '../../store/actions/todoListActions';
import { taskType } from '../../types/types';

const TodoList: React.FC = () => {

  const parser = new DOMParser();
  const { tasks, pagesCount, loading, error } = useTypedSelector(state => state.tasks);
  const { page, sort_field, sort_direction } = useTypedSelector(state => state.list);
  const dispatch = useDispatch();

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

  if (loading) {
    return <p>Загрузка</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="tasks">
      {tasks.map((task: taskType) => {
        return (
          <div key={task.id} className="task">
            <p>{task.username}</p>
            <p>{task.email}</p>
            <p>{parser.parseFromString(task.text, 'text/html').body.textContent}</p>
          </div>
        );
      })}
      <div className="pages">
        <button onClick={() => handlePageChange('dec')}>&lt;</button>
        <button onClick={() => handlePageChange('inc')}>&gt;</button>
      </div>
    </div>
  );
};

export default TodoList;
