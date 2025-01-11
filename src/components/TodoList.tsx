'use client'

import React from 'react'
import {TodoCard} from "@/components/TodoCard";

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

    function handleDelete(_id: number) {
        fetch(`http://localhost:3100/api/todo/${_id}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
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
        </div>
    )
}
export default TodoList
