import { createContext, useContext, useReducer, useEffect } from 'react';

const TodosContext = createContext(null);

const TodosDispatchContext = createContext(null);

export function TodosProvider({ children }) {
  const [todos, dispatch] = useReducer(todosReducer, JSON.parse(localStorage.getItem('todos')) ?? []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos]);

  return (
    <TodosContext.Provider value={todos}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodosContext);
}

export function useTodosDispatch() {
  return useContext(TodosDispatchContext);
}

function todosReducer(todos, action) {
  switch (action.type) {
    case 'added': {
      return [...todos, {
        id: action.id,
        text: action.text,
        done: false,
      }];
    }
    case 'changed': {
      return todos.map(todo => {
        if (todo.id === action.todo.id) {
          return action.todo;
        }

        return todo;
      });
    }
    case 'deleted': {
      return todos.filter(todo => todo.id !== action.id)
    }
    default: {
      throw Error(`Unknown action ${action.type}`);
    }
  }
}