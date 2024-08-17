import {InitialTasksStateType} from "../components/Todolist";

test('correct task should be added', () => {

    const startState: InitialTasksStateType = [
        {id: '1', value: 'React', isDone: false},
        {id: '2', value: 'Redux', isDone: false}
    ]

    const newTaskState = [...startState, {id: '3', value: 'JS', isDone: false}]

    expect(startState.length).toBe(2);
    expect(newTaskState.length).toBe(3);
    expect(newTaskState[2].value).toBe('JS');
})

test('correct task should be removed', () => {

    const startState: InitialTasksStateType = [
        {id: '1', value: 'React', isDone: false},
        {id: '2', value: 'Redux', isDone: false},
        {id: '3', value: 'JS', isDone: false}
    ]

    const newTaskState = [...startState.filter(t => t.id !== '2')]

    expect(startState.length).toBe(3);
    expect(newTaskState.length).toBe(2);
    expect(newTaskState[1].value).toBe('JS');
    expect(newTaskState[1].id).toBe('3');
})

test('correct task should be completed', () => {

    const startState: InitialTasksStateType = [
        {id: '1', value: 'React', isDone: false},
        {id: '2', value: 'Redux', isDone: false},
        {id: '3', value: 'JS', isDone: false}
    ]

    const newTaskState = [...startState.map(t => {
        if (t.id === '2') {
            return {...t, isDone: !t.isDone}
        }
        return t
    })]

    expect(startState.length).toBe(3);
    expect(startState[1].isDone).toBe(false);
    expect(newTaskState.length).toBe(3);
    expect(newTaskState[1].value).toBe('Redux');
    expect(newTaskState[1].isDone).toBe(true);
})

test('completed tasks should be removed', () => {

    const startState: InitialTasksStateType = [
        {id: '1', value: 'React', isDone: false},
        {id: '2', value: 'Redux', isDone: true},
        {id: '3', value: 'JS', isDone: false},
        {id: '4', value: 'Angular', isDone: true}
    ]

    const newTaskState = [...startState.filter(e => !e.isDone)]

    expect(startState.length).toBe(4);
    expect(startState[1].id).toBe('2');
    expect(startState[1].value).toBe('Redux');
    expect(newTaskState.length).toBe(2);
    expect(newTaskState[1].value).toBe('JS');
    expect(newTaskState[1].id).toBe('3');
})