const TaskOptions = ({taskId, handleEditTaskForm, deleteTask}) => {
    function handleEdit(){
        // Mostrar formulario de edicion de tarea
        handleEditTaskForm();
    }

    function handleDelete(){
        // Mostrar alerta/modal de confirmacion
        deleteTask(taskId);
    }

    return (
        <div className="task-actions">
            <button onClick={handleEdit}>
                <span className="material-symbols-outlined">edit</span>
            </button>
            <button onClick={handleDelete}>
                <span className="material-symbols-outlined">delete</span>
            </button>
        </div>
    )
}

export default TaskOptions;