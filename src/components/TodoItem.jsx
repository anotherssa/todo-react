import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const { id, done } = todo;
  const [text, setText] = useState(todo.text);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing]);

  return (
    <div className={clsx('group flex items-center	p-2 border-b border-slate-300 last:border-0', done && 'is-done')}>
      <input type="checkbox" checked={done} onChange={e => onToggle(id, e.target.checked)} />
      {!isEditing && 
        <div 
          className="mx-2 py-[3px] pl-[5px] w-full group-[.is-done]:line-through group-[.is-done]:text-neutral-400"
          onDoubleClick={() => {
            setIsEditing(true);
          }}
        >{text}</div>
      }
      {isEditing && 
        <input
          ref={inputRef}
          type="text"
          className="mx-2 py-0.5 px-1 w-full rounded"
          value={text}
          onChange={e => setText(e.target.value)}
          onBlur={() => {
            onUpdate(id, text);
            setIsEditing(false);
          }}
          onKeyDown={e => {
            if (e.code == 'Enter') {
              onUpdate(id, text);
              setIsEditing(false);
            }
          }}
        />
      }
      <button onClick={() => onDelete(id)} className="opacity-0 text-lg font-bold text-rose-700 group-hover:opacity-100 transition-opacity duration-500">×</button>
    </div>
  )
}

export default TodoItem;
