const TaskOptions = ({taskId}) => {
    function handleEdit(){
        // Mostrar formulario de edicion de tarea
        console.log('edit task -> ', taskId)
    }

    function handleDelete(){
        // Mostrar alerta/modal de confirmacion
        console.log('delete task -> ', taskId)
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