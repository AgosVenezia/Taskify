import { useState, useEffect } from "react";
import Dropdown from "./ListDropdown";
import EditListForm from "./EditListForm";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";

function List({ list, handleAppLoading }) {
    const [optionsDropdown, setOptionsDropdown] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showTaskForm, setShowTaskForm] = useState(false);

    useEffect(() => {
        const getTasks = async () => {
            const url = `/.netlify/functions/get-tasks?listId=${list._id}`;
    
            try {
                const response = await fetch(url).then((res) => res.json());
                setTasks(response);
            } catch (err) {
                alert(err);
            }
        }

        if(loading === true) getTasks();

        return () => {
            setLoading(false);
        }

    }, [ loading ]);

    const updateList = async (id, title) => {
        const url = `/.netlify/functions/update-list?id=${id}&title=${title}`;

        try {
            const response = await fetch(url).then((res) => res.json());
            handleAppLoading(true);
        } catch (err) {
            alert(err);
        }
    }

    const handleDropdown = () => {
        // Mostrar/ocultar dropdown de opciones de lista
        setOptionsDropdown(!optionsDropdown);
    }

    const handleEditListForm = () => {
        // Mostrar/ocultar formulario de edición de lista
        setEditMode(!editMode);
    }

    const handleNewTaskForm = () => {
        // Mostrar/ocultar formulario de creacion de tarea
        setShowTaskForm(!showTaskForm);
    }

    const handleListLoading = (loadingState) => setLoading(loadingState);

    return (
        <div className="list-card">
            <div className="list-card-header">
                {
                    !editMode
                        ?   <>
                                <h2 className="list-card-title">{list.title.toUpperCase()}</h2>
                                <button className="list-actions-btns" onClick={handleDropdown}>
                                    <span className="material-symbols-outlined">
                                        more_vert
                                    </span>
                                </button>
                            </>
                        :   <EditListForm list={list} handleEditListForm={handleEditListForm} updateList={updateList} />
                }
            </div>
            
            {
                optionsDropdown && 
                    <div className="list-dropdown-container">
                        <Dropdown listId={list._id} handleDropdown={handleDropdown} handleEditListForm={handleEditListForm} handleAppLoading={handleAppLoading} />
                    </div>
            }

            <div className="list-card-content">
                <>
                    {
                        tasks.length > 0
                            ?   tasks.map(task => (
                                    <Task key={task._id} listId={list._id} task={task} handleListLoading={handleListLoading} />
                                ))
                            :   <p>No hay tareas...</p>
                    }
                </>
            </div>
            
            <div className="list-card-footer">
                {
                    !showTaskForm
                        ?   <button className="btn-new-task" onClick={handleNewTaskForm}>
                                <span className="material-symbols-outlined">add</span>
                                Agregar nueva tarea
                            </button>
                        :   <AddTaskForm listId={list._id} handleNewTaskForm={handleNewTaskForm} handleListLoading={handleListLoading} />
                }
            </div>
        </div>
    )
};

export default List;
