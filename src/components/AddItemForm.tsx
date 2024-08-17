import React, {ChangeEvent, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import {AddBox} from '@mui/icons-material';
import TextField from '@mui/material/TextField';

export type AddItemFormPropsType = {
    addItem: (value: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    let [value, setValue] = useState('');
    let [error, setError] = useState<string | null>(null);

    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const addTask = () => {
        if (value.trim() !== '') {
            props.addItem(value);
            setValue('');
            setError(null)

        } else {
            setError('Title is required');
        }
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.code === 'Enter') {
            addTask();
        }
    }

    return (
        <div>
            <TextField variant="outlined"
                       error={!!error}
                       value={value}
                       onChange={changeInputValue}
                       onKeyDown={onKeyPressHandler}
                       label="Title"
                       helperText={error}
            />
            <IconButton color="primary" onClick={addTask}>
                <AddBox/>
            </IconButton>
        </div>
    )
}