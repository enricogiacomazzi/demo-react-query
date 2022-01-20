import {TodoModel} from './todoModel';


export const getTodos = async (): Promise<Array<TodoModel>> => {
    const res = await fetch('http://localhost:3005/todo');
    return await res.json();
}

export const deleteTodo = async (id: number): Promise<void> => {
    await fetch(`http://localhost:3005/todo/${id}`, {method: 'DELETE'});
}
