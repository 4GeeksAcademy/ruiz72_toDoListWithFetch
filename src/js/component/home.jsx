import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/caro72')
      .then(response => response.json())
      .then(data => {
        setTodos(data);
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  useEffect(() => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/caro72', {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        console.log(resp.ok);
        console.log(resp.status);
        console.log(resp.text());
        return resp.json();
      })
      .then(data => {
        console.log("Tasks synchronized with the server:", data);
      })
      .catch(error => {
        console.error("Error synchronizing tasks:", error);
      });
  }, [todos]);

  const addTodo = () => {
    if (newTask.trim() !== "") {
      const newTodo = {
        label: newTask,
        done: false,
      };
      setTodos([...todos, newTodo]);
      setNewTask("");
    }
  };

  const toggleTaskStatus = (taskId) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === taskId) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const removeAll = () => {
    setTodos([]);
  };

  return (
    <div className='todo-app'>
      <h1>Todo App</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTaskStatus(todo.id)}
            />
            <span>{todo.label}</span>
          </li>
        ))}
      </ul>
      <div>
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
