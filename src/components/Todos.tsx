import React from 'react'
import { Istate as Props } from '../App'
import checkList from '../images/icon-check.svg';
import deleteList from '../images/icon-cross.svg';

interface Iprops {
    todos: Props["todos"],
    setTodos: React.Dispatch<React.SetStateAction<Props["todos"]>>
}

const Todos: React.FC<Iprops> = ({ todos, setTodos }) => {

    const handleChecked = (index: number) => {
        const markTodo = todos.map(todo => {
            if (todo === todos[index]) {
                return {
                    ...todo,
                    completed: !todo.completed
                };
            }
            return todo;
        });
        setTodos(markTodo);
        console.log('checked')
    }

    const handleDelete = (index: number) => {
        setTodos(todos.filter(todo => todo !== todos[index]))
    }
    const clearTasks = () => {
        setTodos([])
    }
    const todo = (): JSX.Element[] => {
        return todos.map((todo, index) => {
            return (
                <div className='todo' key={index}>
                    <div className={`${todo.completed ? 'check' : null} todo-check`} onClick={() => handleChecked(index)}>
                        {todo.completed && <img src={checkList} alt='check list' />}
                    </div>
                    <p className={`${todo.completed ? 'line' : null} list`} onClick={() => handleChecked(index)}>{todo.text}</p>
                    <img className='delete' src={deleteList} alt='delete list' onClick={() => handleDelete(index)} />
                </div>
            )
        })
    }
    return (
        <div className={`${todos.length > 0 ? 'todo-container' : 'no-task'}`}>
            <div className='todos'>
                {todo()}
            </div>
            <div className='base'>
                <span>{todos.length} all tasks</span>
                <span onClick={clearTasks} style={{ cursor: 'pointer' }}>Clear Tasks</span>
            </div>
        </div>
    )
}

export default Todos