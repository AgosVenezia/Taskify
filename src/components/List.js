import { useState } from "react";
import Dropdown from "./ListDropdown";
import Task from "./Task";

function List({id, list, tasks}) {
    const [optionsDropdown, setOptionsDropdown] = useState(false);

    function handleDropdown() {
        setOptionsDropdown(!optionsDropdown);
    }

    function handleNewTask() {
        // Mostrar formulario de creacion de tarea
        console.log("handleNewTask -> lee los comentarios...")
    }

    return (
        <div className="list-card">
            <div className="list-card-header">
                <h2 className="list-card-title">{list.title.toUpperCase()}</h2>
                <button className="list-actions-btns" onClick={handleDropdown}>
                    <span className="material-symbols-outlined">
                        more_vert
                    </span>
                </button>
            </div>
            <div style={{position:"absolute", width:"90%",}}>
                <Dropdown listId={list.id} show={optionsDropdown}/>
            </div>

            <div className="list-card-content">
                <>
                    {tasks.map((task) => (
                        <Task key={task.id} task={task}/>
                    ))}
                </>
            </div>
            
            <div className="list-card-footer">
                <button className="btn-new-task" onClick={handleNewTask}>
                    <span className="material-symbols-outlined">add</span>
                    Agregar nueva tarea
                </button>
            </div>

        </div>
    )
};

export default List;