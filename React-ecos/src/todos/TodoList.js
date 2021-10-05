import React from "react";
import TodoListItem from './TodoListItem';
import './TodoList.css';
import NewTodoForm from "./NewTodoForm";

const TodoList = ({ todos = [{text: 'Hello My first Todo Item'}] }) => (
    <div className="list-wrapper">
        <NewTodoForm />
        { todos.map((todo, index) => <TodoListItem key={index} todo={todo} />)}
    </div>
);

export default TodoList;