import React, { useEffect } from 'react';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { loadTodos, displayAlert, removeTodoRequest, markTodoAsCompletedRequest } from './thunks';
import { getTodosLoading, getCompletedTodos, getIncompleteTodos } from './selectors';

const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;

const TodoList = ({ 
    completedTodos, 
    incompleteTodos, 
    onRemovePressed, 
    onCompletedPressed, 
    isLoading, 
    startLoadingTodos }) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);
    const loadingMessage = <div>Loading todos...</div>;
    const content = (
        <ListWrapper className="list-wrapper">
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
        </ListWrapper>
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