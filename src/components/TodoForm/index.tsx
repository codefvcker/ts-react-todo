import React, { useState } from 'react'

type TFormProps = {
    onAdd: (title: string) => void
}

export const TodoForm: React.FC<TFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState<string>("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const addHandler = (e: React.FormEvent<HTMLFormElement>, title: string) => {
    e.preventDefault();
    onAdd(title);
    setTitle("");
  };

  return (
    <form onSubmit={e => addHandler(e, title)}>
      <label htmlFor="input">Type ur note here</label>
      <input
        onChange={e => changeHandler(e)}
        value={title}
        placeholder="Type here"
        id="input"
        type="text"
      />
      <button type="submit" className="btn">
        Add
      </button>
    </form>
  );
};
