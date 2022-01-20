import React, {useState} from 'react';
import './App.css';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {TodoModel} from './todoModel';
import {deleteTodo, getTodos} from './api';

const App: React.FC = () => {

    const queryClient = useQueryClient();
    const {isLoading, error, data = []} = useQuery<Array<TodoModel>>('todos', getTodos);
    const mutation = useMutation(deleteTodo, {onSuccess: () => {queryClient.invalidateQueries('todos')}});

    if (isLoading) {
        return <h1>loading...</h1>
    }

    if (error) {
        return <h1>ERROR!!!</h1>
    }

    return (
        <ul>
            {data?.map(todo => (
                <li key={todo.id}>
                    <i className="fa fa-trash" onClick={() => mutation.mutate(todo.id)}/>
                    <span className="item">
                        {todo.text}
                    </span>
                </li>
            ))}
        </ul>
    )
}

export default App;
