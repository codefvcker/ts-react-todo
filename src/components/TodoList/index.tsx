import React, {useState} from 'react'
import {removeTodo, toggleTodo, isEditingTodo, editTodo} from '../../pages/Main/model'

interface IListProps {
    todos: any[];
}

export const TodoList: React.FC<IListProps> = ({ todos }) => {
  const [newTitle, setNewTitle] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const editHandler = (
    e: React.KeyboardEvent,
    id: number,
    newTitle: string
  ) => {
    const editTitle = {
      id,
      newTitle
    };
    if (e.key === "Enter") {
      editTodo(editTitle);
      setNewTitle("");
    }
  };

  const editingHandler = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    isEditingTodo(id);
  };

  if (todos.length === 0) {
    return <p className="center">Is empty</p>;
  }

  return (
    <ul>
      {todos.map(todo => {
        const cls = ["todo"];
        if (todo.completed) {
          cls.push("completed");
        }
        return (
          <li key={todo.id} id={todo.id} className={cls.join(" ")}>
            <label>
              <input
                onChange={() => toggleTodo(todo.id)}
                checked={todo.completed}
                type="checkbox"
              />
              {todo.editing ? (
                <input
                  autoFocus
                  onChange={e => handleChange(e)}
                  value={newTitle}
                  type="text"
                  onKeyPress={e => editHandler(e, todo.id, newTitle)}
                />
              ) : (
                <span>{todo.title}</span>
              )}

              <div className="btn-block">
                <i
                  onClick={e => editingHandler(e, todo.id)}
                  className="material-icons red-text"
                >
                  Edit
                </i>
                <i
                  onClick={() => removeTodo(todo.id)}
                  className="material-icons red-text"
                >
                  Delete
                </i>
              </div>
            </label>
          </li>
        );
      })}
    </ul>
  );
};
