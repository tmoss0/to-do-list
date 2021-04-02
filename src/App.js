import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/form';
import ToDoList from './components/todolist';

function App() {
    // State management
    const [inputText, setInputText] = useState(""); 
    const [todos, setTodos] = useState([]);
    const [status, setStatus] = useState("all");
    const [filterTodos, setFilterTodos] = useState([]);

    // Run once when the app starts
    useEffect(() => {
        getLocalTodos();
    }, []);

    useEffect(() => {
        filterHandler();
        saveLocalTodos();
    }, [todos, status]);


    // Functions
    const filterHandler = () => {
        switch(status) {
            case 'completed':
                setFilterTodos(todos.filter(todo => todo.completed === true));
                break;
            case 'uncompleted':
                setFilterTodos(todos.filter(todo => todo.completed === false));
                break;
            default:
                setFilterTodos(todos);
                break;
        }
    };

    const saveLocalTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const getLocalTodos = () => {
        if(localStorage.getItem('todos') === null) {
            localStorage.setItem('todos', JSON.stringify([]));
        }
        else {
            let todoLocal = JSON.parse(localStorage.getItem("todos"));
            setTodos(todoLocal);
        }
    };


    return (
        <div>
            <header>
                <h1>To Do List</h1>
            </header>
            <Form 
                todos={todos} 
                inputText={inputText} 
                setTodos={setTodos} 
                setInputText={setInputText} 
                setStatus={setStatus}
            />
            <ToDoList 
                setTodos={setTodos} 
                todos={todos} 
                filterTodos={filterTodos}
            />
        </div>
    );
}

export default App;
