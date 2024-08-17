import React from 'react';
import './Task.css';
import {InitialTasksStateType} from "./Todolist";
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';

export type TaskPropsType = {
    filteredTasks: () => InitialTasksStateType
    changeTaskStatus: (id: string) => void
    deleteTask: (id: string) => void
}

export const Task = (props: TaskPropsType) => {
    return (
        <div className='wrapper'>
            {props.filteredTasks().map(el =>
                <div key={el.id} className={el.isDone ? 'unactive' : ''}>
                    <Checkbox
                        checked={el.isDone}
                        color="primary"
                        onChange={(e) => props.changeTaskStatus(el.id)}
                    />
                    <label>{el.value}</label>
                    <IconButton onClick={e => props.deleteTask(el.id)} color="primary">
                        <Delete/>
                    </IconButton>
                </div>)}
        </div>
    )
}