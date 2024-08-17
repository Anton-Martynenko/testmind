import React, {useState} from 'react';
import {Task} from "./Task";
import {AddItemForm} from "./AddItemForm";
import Button from '@mui/material/Button';

export type InitialTasksStateType =
    Array<{ id: string, value: string, isDone: boolean }>

export type FilterValueType = 'All' | 'Active' | 'Completed'

export const Todolist = () => {

    let getUniqId = () => Date.now().toString();
    const savedTodos = localStorage.getItem('todos')
    const initState = (savedTodos ? [...JSON.parse(savedTodos)] : []) as InitialTasksStateType
    let [tasks, setTasks] = useState<InitialTasksStateType>(initState);
    let [filter, setFilter] = useState<FilterValueType>('All')

    const addTask = (value: string) => {
        const newTaskState = [...tasks, {id: getUniqId(), value: value, isDone: false}]
        setTasks(newTaskState)
        localStorage.setItem('todos', JSON.stringify(newTaskState))
    }

    const deleteTask = (id: string) => {
        const newTaskState = [...tasks.filter(t => t.id !== id)]
        setTasks(newTaskState)
        localStorage.setItem('todos', JSON.stringify(newTaskState))
    }

    const changeTaskStatus = (id: string) => {
        const newTaskState = [...tasks.map(t => {
            if (t.id === id) {
                return {...t, isDone: !t.isDone}
            }
            return t
        })]
        setTasks(newTaskState)
        localStorage.setItem('todos', JSON.stringify(newTaskState))
    }

    const onAllClickHandler = () => {
        setFilter('All')
    }

    const onActiveClickHandler = () => {
        setFilter('Active')
    }

    const onCompletedClickHandler = () => {
        setFilter('Completed')
    }

    const clearCompleted = () => {
        const newTaskState = [...tasks.filter(e => !e.isDone)]
        setTasks(newTaskState)
        localStorage.setItem('todos', JSON.stringify(newTaskState))
    }

    const filteredTasks = () => {
        if (filter === 'Active') return tasks.filter(e => !e.isDone)
        if (filter === 'Completed') return tasks.filter(e => e.isDone)
        return tasks
    }

    const countActive = () => tasks.filter(e => !e.isDone).length

    return (
        <div>
            <h1>Todos</h1>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <div>
                <Task filteredTasks={filteredTasks} changeTaskStatus={changeTaskStatus} deleteTask={deleteTask}/>
            </div>
            <div>
                <Button variant={filter === 'All' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}
                        color={'inherit'}>All
                </Button>
                <Button variant={filter === 'Active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}
                        color={'primary'}>Active
                </Button>
                <Button variant={filter === 'Completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}
                        color={'secondary'}>Completed
                </Button>
            </div>
            <div>
                <p>Count active: {countActive()}</p>
                <Button variant={'outlined'}
                        onClick={clearCompleted}
                        color={'inherit'}>Clear Completed
                </Button>
            </div>
        </div>
    )
}