import { useState, useEffect } from "react";
import Todo from "./Todo"


const Home = () => {
    const [todos, setTodos] = useState(() => {
        const storedTodos = localStorage.getItem('todos');
        return storedTodos ? JSON.parse(storedTodos) : [];
    });

    const [inputValue, setInputValue] = useState("");
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);
    

    const handleAddTodo = (e) => {
        e.preventDefault();
        const todo = { value: inputValue, createdAt: new Date() };
        setTodos([...todos, todo]);
        setInputValue('');
    };



    const handleEditTodo = (index, newValue) => {
        const newTodos = [...todos];
        newTodos[index].value = newValue;
        setTodos(newTodos);
    };


    const handleDeleteTodo = (index) => {
        const newTodo = [...todos];
        newTodo.splice(index, 1);
        setTodos(newTodo)
    }



    return (
        <div className="todo-mother-con">

        <div className="todo-container">
             <h2> Your Digital Assistant for Task Management</h2>
            <form onSubmit={handleAddTodo}>
                <input type="text" placeholder="Enter your to do" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <button type="submit">ADD</button>
            </form>
            <ol>
                {
                    todos.map((todo, index) => (
                        <li key={index}>
                            <Todo
                                key={index}
                                Todo={todo.value}
                                createdAt={todo.createdAt}
                                handleEdit={(newValue) => handleEditTodo(index, newValue)}
                                handleDelete={() => handleDeleteTodo(index)}
                                />
                        </li>
                    ))
                }
            </ol>
        </div>
                </div>
    );
}

export default Home;