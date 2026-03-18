import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { Todo, type ITodo } from "./components/todo";

// hooks => useState, useCallBack, useMemo, useContext, useEffect , useRef
// addTodo, deleteTodo, updateTodo, markTodoAsComplete, searchTodo
// custom hooks

function App() {
  const [todos, setTodos] = useState<ITodo[] | null>(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateTodoId, setUpdateTodoId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const createTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) {
      return;
    }
    if (isUpdating) {
      if (updateTodoId === "") return;
      if (!todos) return;
      const updatedTodos = todos.map((ele) => {
        if (ele.id === updateTodoId) {
          return { ...ele, title: title.trim(), desc: desc.trim(), isUpdated: true };
        }
        return ele;
      });
      setTodos(updatedTodos);
      handleCancelUpdate();
      return;
    }

    const formBody: ITodo = {
      title: title.trim(),
      desc: desc.trim(),
      isCompleted: false,
      isUpdated: false,
      id: crypto.randomUUID(),
    };
    resetFormValues();
    if (!todos) {
      setTodos([formBody]);
      return;
    }
    setTodos([...todos, formBody]);
  };

  const resetFormValues = () => {
    setTitle("");
    setDesc("");
  };

  const handleCancelUpdate = () => {
    setIsUpdating(false);
    setUpdateTodoId("");
    resetFormValues();
  };

  const handleUpdateTodo = (id: string) => {
    if (!todos) return;
    const todo = todos.find((ele) => ele.id === id);
    if (!todo) return;
    if (todo.isCompleted) return;
    setTitle(todo.title);
    setDesc(todo.desc);
    setIsUpdating(true);
    setUpdateTodoId(id);
  };

  const filteredTodos = todos?.filter((todo) => 
    todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    todo.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1>Todos</h1>

      <div style={{ marginBottom: "20px" }}>
        <input 
          type="text" 
          placeholder="Search todos..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <form onSubmit={createTodo}>
        <input
          type="text"
          placeholder="title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          value={title}
          required
        />
        <input
          type="text"
          placeholder="type in your description"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDesc(e.target.value)
          }
          value={desc}
          required
        />

        <button type="submit">
          {isUpdating ? "Update Todo" : "Create todo"}
        </button>
        {isUpdating && (
          <button type="button" onClick={handleCancelUpdate}>
            Cancel
          </button>
        )}
      </form>

      <ul>
        {filteredTodos && filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <Todo
              key={todo.id}
              {...todo}
              setTodos={setTodos}
              todos={todos}
              handleUpdateTodo={() => handleUpdateTodo(todo.id)}
            />
          ))
        ) : (
          <p>{searchTerm ? "No matches found" : "No todos yet"}</p>
        )}
      </ul>
    </>
  );
}

export default App;
