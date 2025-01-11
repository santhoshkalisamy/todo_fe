'use client'
import Navbar from "@/components/Navbar";
import AddTodoButton from "@/components/AddTodoButton";
import TodoList, {Todo} from "@/components/TodoList";
import React, { useEffect } from "react";
import {ToastContainer, toast, Bounce} from 'react-toastify';

export default function Home() {
    const notify = () => toast.success('Added new task!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });
    const [todos, setTodos] = React.useState<Todo[]>([]);

    useEffect(() => {
        fetchTodos();
    },[]);

    function addTodo() {
        notify();
        fetchTodos();
    }

    function fetchTodos() {
        fetch('http://localhost:3100/api/todo')
            .then(response => response.json())
            .then(json => {
                const todos = json as Todo[];
                console.log(todos);
                const sorted = todos.sort((a, b) => {
                    return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
                });
                console.log(sorted);
                setTodos(sorted)
            })
    }

  return (
    <div className="w-full h-full mb-20 overflow-scroll absolute bg-gradient-to-b from-emerald-200 to-blue-300">
      <header className="flex justify-between items-center text-black py-6 px-8 md:px-32
       bg-white drop-shadow">
          <Navbar />
      </header>
        <section className="container mx-auto py-8 relative">
            <AddTodoButton onAddTodo={addTodo} />
            <TodoList todos={todos} fetchTodos={fetchTodos} />
        </section>
        <ToastContainer />
    </div>
  );
}
