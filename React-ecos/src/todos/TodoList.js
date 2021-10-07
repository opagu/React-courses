import React, { useEffect } from 'react';
import TodoListItem from './TodoListItem';
import NewTodoForm from "./NewTodoForm";
import { connect } from 'react-redux';
import { loadTodos, displayAlert, removeTodoRequest, markTodoAsCompletedRequest } from './thunks';
import { getTodos, getTodosLoading, getCompletedTodos, getIncompleteTodos } from './selectors';
import './TodoList.css';


const TodoList = ({ completedTodos, incompleteTodos, onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);
    const loadingMessage = <div>Loading todos...</div>;
    const content = (
        <div className="list-wrapper">
            <NewTodoForm />
            <h3>Incomplete: </h3>
            { incompleteTodos.map((todo, index) => <TodoListItem
                key={index}
                todo={todo} 
                onRemovePressed={onRemovePressed} 
                onCompletedPressed={onCompletedPressed} />)}
            <h3>Completed: </h3>
            { completedTodos.map((todo, index) => <TodoListItem
                key={index}
                todo={todo} 
                onRemovePressed={onRemovePressed} 
                onCompletedPressed={onCompletedPressed} />)}
        </div>
    )
    return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
    completedTodos: getCompletedTodos(state),
    incompleteTodos: getIncompleteTodos(state),
    isLoading: getTodosLoading(state),
});

const mapDispatchToProps = dispatch => ({
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
    onDisplayAlertClicked: text => dispatch(displayAlert(text)),
    startLoadingTodos: () => dispatch(loadTodos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);