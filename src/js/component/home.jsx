import React, { useState, useEffect } from 'react';


const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    // PUT
    fetch('https://playground.4geeks.com/apis/fake/todos/user/caro72', {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data => {
        console.log("Tasks synchronized with the server:", data);
      })
      .catch(error => {
        console.error("Error synchronizing tasks:", error);
      });
  }, [todos]);

  // Function to add a new task
  const addTodo = () => {
    if (newTask.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        label: newTask,
        done: false,
      };
      setTodos([...todos, newTodo]);
      setNewTask(""); 
    }
  };

  // Function to toggle the status of a task (done or not done)
  const toggleTaskStatus = (taskId) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === taskId) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Function to remove a task by its id
  const removeTodo = (taskId) => {
    const updatedTodos = todos.filter(todo => todo.id !== taskId);
    setTodos(updatedTodos);
  };

  // Function to remove all tasks
  const removeAll = () => {
    setTodos([]);
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTaskStatus(todo.id)}
            />
            <span className={todo.done ? "task-done" : ""}>{todo.label}</span>
          </li>
        ))}
      </ul>
      <div className="add-todo">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTodo}>Add</button>
        <button onClick={removeAll}>Remove All</button>
      </div>
    </div>
  );
};

export default TodoApp;

