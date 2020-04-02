import React, { useEffect } from 'react'
import { TodoList, TodoForm } from '../../components'
import {useStore} from 'effector-react'
import { TTodo } from '../../types'
import  {$todos, addTodo, getSavedTodo} from './model';


export const Main: React.FC = () => {
  const todos = useStore($todos)

  useEffect(() => {
    const saved: TTodo[] = JSON.parse(localStorage.getItem('todos') || '[]') as TTodo[]
    getSavedTodo(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addHandler = (title: string) => {
    const todo: TTodo = {
      id: Date.now(),
      title,
      completed: false,
      editing: false
    };
    addTodo(todo)
  };

  

  return (
    <div>
      <TodoForm onAdd={addHandler} />
      <TodoList
        todos={todos}
      />
    </div>
  );
};
