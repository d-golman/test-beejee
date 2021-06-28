import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { postTask } from '../../../../service/services';
import { fetchTasksAction } from '../../../../store/actions/tasksActions';
import './createTaskForm.sass';

const CreateTaskForm = () => {

  const dispatch = useDispatch();
  const { page, sort_field, sort_direction } = useTypedSelector(state => state.list);
  const [requestStatus, setRequestStatus] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postTask(event.currentTarget)
      .then((status: string) => {
        setRequestStatus(status);

        setTimeout(() => {
          setRequestStatus(null);
        }, 2000);
      })
      .then(() =>
        dispatch(fetchTasksAction(page, sort_field, sort_direction))
      );
  };

  return (
    <div className="create-task">

      <h2>Добавить задачу</h2>
      <form className='post-form' onSubmit={handleSubmit}>
        <div className="form-group">
          <input required type="username" placeholder='Username' name='username' />
        </div>
        <div className="form-group">
          <input required type="email" placeholder='Email' name='email' />
        </div>
        <div className="form-group">
          <input required type="text" placeholder='Текст задачи' name='text' />
        </div>
        <input className='form-submit' type="submit" value={requestStatus ? requestStatus : 'Добавить задачу'} />
      </form>
    </div>
  );
};

export default CreateTaskForm;
