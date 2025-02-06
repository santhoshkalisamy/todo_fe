'use client'

import React from 'react'
import {TodoCard} from "@/components/TodoCard";
import {ToastContainer, toast} from 'react-toastify';


export type Todo = {
    title: string,
    done: boolean,
    _id: number,
    dueDate: string,
    description: string,
}
type TodoListProps = {
    todos: Todo[];
    fetchTodos: () => void;
}

const TodoList = (todoProps: TodoListProps) => {

    const notifyUpdate = () => toast.info('Marked as complete!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    const notifyDelete = () => toast.error('Deleted Successfully!', {
        position: "bottom-right",
    });

    function handleDelete(_id: number) {
        fetch(`http://localhost:3100/api/todo/${_id}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                notifyDelete();
                todoProps.fetchTodos();
            }
        }).catch(error => {
            console.error('Error deleting item', error);
        });
    }

    function handleMarkAsDone(_id: number) {
        fetch(`http://localhost:3100/api/todo/${_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({done: true})
        }).then(response => {
            if (response.ok) {
                notifyUpdate();
                todoProps.fetchTodos();
            }
        }).catch(error => {
            console.error('Error marking item as done', error);
        });
    }

    return (
        <div className="mt-8">
            <ul className="grid grid-cols-3 gap-4">
                {todoProps.todos.map(todo => (
                    <li key={todo._id} className="flex justify-between items-center py-4">
                        <TodoCard onUpdate={handleMarkAsDone} onDelete={handleDelete} title={todo.title} done={todo.done} dueDate={todo.dueDate}
                                  description={todo.description} _id={todo._id}/>
                    </li>
                ))}
            </ul>
            <ToastContainer />
        </div>
    )
}
export default TodoList
