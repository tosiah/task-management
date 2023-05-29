import {useEffect, useState} from "react";
import tasksService from './services/tasks'

const TaskList = ({tasks, onNameChange, onPriorityChange, onEdit, onDelete, onSave}) => {
    return (
        tasks.map((task) => <TaskItem key={task.id} task={task} onNameChange={onNameChange}
                                      onPriorityChange={onPriorityChange} onEdit={onEdit} onDelete={onDelete}  onSave={onSave}/>)
    )
}


const TaskItem = ({task, onNameChange, onPriorityChange, onEdit, onDelete, onSave}) => {
    if (!task.currentlyEdited) {
        return <li><b>{task.name}</b> {task.priority}
            <button onClick={() => onEdit(task.id)}>edit</button>
            <button onClick={() => onDelete(task.id)}>delete</button>
        </li>
    } else {
        return <li><input value={task.name} onChange={(event) => onNameChange(task.id, event)}/> <input
            value={task.priority}
            onChange={(event) => onPriorityChange(task.id, event)}/>
            <button onClick={() => onSave(task.id)}>save</button>
        </li>
    }
}

const Form = ({newTask, onchangeInput, onSubmit}) => {
    return (
        <>
            <input value={newTask} onChange={onchangeInput}/>
            <button onClick={onSubmit}>add</button>
        </>
    )
}


const App = () => {

    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')
    const [editedTaskName, setEditedTaskName] = useState('')
    const [editedTaskPriority, setEditedTaskPriority] = useState('')

    const onchangeInput = (event) => {
        setNewTask(event.target.value)
        console.log(newTask)
    }

    const onNameChange = (id, event) => {
        console.log({id})
        console.log({event})
        const foundTask = findTaskById(id)
        setEditedTaskName(event.target.value)
        setTasks(tasks.map((task) => task.id === foundTask.id ? {...foundTask, name: event.target.value} : task))
    }

    const onPriorityChange = (id, event) => {
        const foundTask = findTaskById(id)
        setEditedTaskPriority(event.target.value)
        setTasks(tasks.map((task) => task.id === foundTask.id ? {...foundTask, priority: event.target.value} : task))
    }


    const onSubmit = () => {
        // setTasks([...tasks, ({id: tasks.length + 1, name: newTask, priority: 'medium', currentlyEdited: false})])
        const newTaskObj = ({
            name: newTask,
            priority: 'medium'
        })
        tasksService.create(newTaskObj)
            .then(((returnedTask) => setTasks([...tasks, ({...returnedTask, currentlyEdited: false})])))
    }

    const findTaskById = (id) => {
        return tasks.find((task) => task.id === id)
    }

    const onEdit = (id) => {
        const foundTask = findTaskById(id)
        if(tasks.find((task) => task.currentlyEdited)){
            window.alert(`end edition of currently edited task first`)
        } else{
            setEditedTaskName(foundTask.name)
            setEditedTaskPriority(foundTask.priority)
            setTasks(tasks.map((task) => task.id === foundTask.id ? {...foundTask, currentlyEdited: true} : task))
        }
    }

    const onSave = (id) => {
        const foundTask = findTaskById(id)
        const updatedTask = ({
            name: editedTaskName, priority: editedTaskPriority
        })
        tasksService.update(foundTask.id, updatedTask).then((returnedTask) => setTasks(tasks.map((task) => task.id === returnedTask.id ? {...returnedTask, currentlyEdited: false} : task)))
        console.log(foundTask)
    }

    const onDelete = (id) => {
        const foundTask = findTaskById(id)
        tasksService.remove(foundTask.id).then(() => setTasks(tasks.filter((task) => task.id !== foundTask.id)))
        console.log(foundTask)
    }

    useEffect(() => {
        tasksService.getAll().then((returnedData) => setTasks(returnedData))
    }, [])

    return (
        <>
            <h3>TODO</h3>
            <Form newTask={newTask} onchangeInput={onchangeInput} onSubmit={onSubmit}/>
            <TaskList tasks={tasks} onNameChange={onNameChange} onPriorityChange={onPriorityChange} onEdit={onEdit} onDelete={onDelete}
                      onSave={onSave}/>
        </>)

}
export default App