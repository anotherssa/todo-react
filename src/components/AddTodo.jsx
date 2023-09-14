import { useState } from 'react';


export default function AddTodo({ onAddTodo }) {
  const [newTodoText, setNewTodoText] = useState('');

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
            onAddTodo(newTodoText);
            setNewTodoText('');
          }
        }}
        autoFocus
      />
      <button 
        title="Add"
        className="ml-[1px] py-2 px-4 rounded-tr bg-sky-500 hover:bg-sky-600 text-lg text-white"
        onClick={() => onAddTodo(newTodoText)}>+</button>
    </div>
  );
}