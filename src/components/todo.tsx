export interface ITodo {
  title: string;
  id: string;
  desc: string;
  isCompleted: boolean;
  isUpdated: boolean;
}

interface ITodoComp extends ITodo {
  setTodos : React.Dispatch<React.SetStateAction<ITodo[] | null>>;
  todos : ITodo[] | null;
  handleUpdateTodo : () => void;
}

export const Todo: React.FC<ITodoComp> = ({
  title,
  id,
  desc,
  isCompleted,
  isUpdated,
  setTodos,
  todos,
  handleUpdateTodo
}) => {
  const handleDelete = (id: string) => {
    if (!todos) {
      return;
    }
    const filteredTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(filteredTodos);
  };

  const handleToggleComplete = () => {
    if (!todos) return;
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <li key={id} style={{ textDecoration: isCompleted ? "line-through" : "none" }}>
      <h3>{title} {isUpdated && <span>(edited)</span>}</h3>
      <p>{desc}</p>
      <button type="button" onClick={() => handleDelete(id)}>
        delete
      </button>
      <button type="button" onClick={handleUpdateTodo} disabled={isCompleted}>
        update
      </button>
      <input 
        type="checkbox" 
        checked={isCompleted} 
        onChange={handleToggleComplete} 
      />
    </li>
  );
};
