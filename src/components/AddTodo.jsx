import { useState } from 'react';
import { useTodosDispatch } from '../hooks/todosContext';
import { createTodo } from '../utils/utils';


export default function AddTodo({ onAddTodo }) {
  const [newTodoText, setNewTodoText] = useState('');
  const dispatch = useTodosDispatch();

  return (
    <div className="flex border-b border-slate-300">
      <input 
        type="text"
        className="w-full p-2 rounded-tl border-transparent"
        placeholder="Enter todo"
        value={newTodoText} 
        onChange={e => setNewTodoText(e.target.value)}
        onKeyDown={e => {
          if (e.code == 'Enter') {
            dispatch({ type: 'added', ...createTodo(newTodoText) });
            setNewTodoText('');
          }
        }}
        autoFocus
      />
      <button 
        title="Add"
        className="ml-[1px] py-2 px-4 rounded-tr bg-sky-500 hover:bg-sky-600 text-lg text-white"
        onClick={() => {
          dispatch({ type: 'added', ...createTodo(newTodoText) });
          setNewTodoText('');
        }}
        >+</button>
    </div>
  );
}