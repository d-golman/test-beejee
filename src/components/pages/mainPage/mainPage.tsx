import React from 'react';
import CreateTaskForm from './createTaskForm/createTaskForm';
import TodoList from './todoList/todoList';

const MainPage = () => {
  return (
    <>
      <TodoList />
      <CreateTaskForm />

    </>
  );
};

export default MainPage;
