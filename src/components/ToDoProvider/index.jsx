import { useEffect, useState } from "react";
import ToDoContext from "./ToDoContext";

export  function ToDoProvider({ children }) {
  const [showDialog, setShowDialog] = useState(false);
  const TODOS = "todos";
  const savedTodos = localStorage.getItem(TODOS);
  const [todos, setTodos] = useState(savedTodos ? JSON.parse(savedTodos) : []);
  const [selectedTodo, setSelectedTodo] = useState();

  const openDialogForm = (todo) => {
    if (todo) {
      setSelectedTodo(todo);
    }
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setSelectedTodo(null);
  };

  useEffect(() => {
    localStorage.setItem(TODOS, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (formData) => {
    const description = formData.get("description");
    setTodos((prevState) => {
      const todo = {
        id: prevState.length + 1,
        description,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      return [...prevState, todo];
    });
  };

  const toggleTodoCompleted = (todo) => {
    setTodos((prevState) => {
      return prevState.map((t) => {
        if (t.id == todo.id) {
          return {
            ...t,
            completed: !t.completed,
          };
        }
        return t;
      });
    });
  };

  const removeTodo = (todo) => {
    setTodos((prevState) => {
      return prevState.filter((t) => t.id != todo.id);
    });
  };

  const editSelectedTodo = (formData) => {
    if (!selectedTodo) return;
    setTodos((prevState) => {
      return prevState.map((t) => {
        if (t.id == selectedTodo.id) {
          return {
            ...t,
            description: formData.get("description"),
          };
        }
        return t;
      });
    });
  };

  return (
    <ToDoContext
      value={{
        todos,
        showDialog,
        selectedTodo,
        addTodo,
        toggleTodoCompleted,
        removeTodo,
        closeDialog,
        openDialogForm,
        editSelectedTodo,
      }}
    >
      {children}
    </ToDoContext>
  );
}
