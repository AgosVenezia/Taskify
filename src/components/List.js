import { useState, useEffect } from "react";
import Dropdown from "./ListDropdown";
import EditListForm from "./EditListForm";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";

function List({list, editList, deleteList, saveTask, editTask, deleteTask}) {
    const [optionsDropdown, setOptionsDropdown] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [showTaskForm, setShowTaskForm] = useState(false);

    useEffect(() => {
        const getTasks = () => {
            setTasks(list.tasks)
        }

        getTasks(); 

    }, [ list ])

    function handleDropdown() {
        setOptionsDropdown(!optionsDropdown);
    }

    function handleEditListForm() {
        setEditMode(!editMode);
    }

    function handleNewTaskForm() {
        // Mostrar formulario de creacion de tarea
        console.log("handleNewTaskForm -> lee los comentarios...")
        setShowTaskForm(!showTaskForm);
    }

    return (
        <div className="list-card">
            <div className="list-card-header">
                { !editMode ?
                                <>
                                    <h2 className="list-card-title">{list.title.toUpperCase()}</h2>
                                    <button className="list-actions-btns" onClick={handleDropdown}>
                                        <span className="material-symbols-outlined">
                                            more_vert
                                        </span>
                                    </button>
                                </>
                            :
                                <EditListForm list={list} handleEditListForm={handleEditListForm} editList={editList} />

                }
                

            </div>
            <div className="list-dropdown-container">
                <Dropdown list={list} show={optionsDropdown} handleDropdown={handleDropdown} handleEditListForm={handleEditListForm} deleteList={deleteList}/>
            </div>

            <div className="list-card-content">
                <>
                    {tasks.map((task) => (
                        <Task key={task.id} task={task} editTask={editTask} deleteTask={deleteTask} />
                    ))}
                </>
            </div>
            
            <div className="list-card-footer">
                { !showTaskForm ?
                                    <button className="btn-new-task" onClick={handleNewTaskForm}>
                                        <span className="material-symbols-outlined">add</span>
                                        Agregar nueva tarea
                                    </button>
                                :
                                    <AddTaskForm listId={list.id} handleNewTaskForm={handleNewTaskForm} saveTask={saveTask} />
                }
                
            </div>

        </div>
    )
};

export default List;