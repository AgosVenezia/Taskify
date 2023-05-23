// REEMPLAZAR taskIndex POR task._id
const TaskOptions = ({taskId, handleEditTaskForm, handleListLoading}) => {
    function handleEdit(){
        // Mostrar formulario de edicion de tarea
        handleEditTaskForm();
    }

    const deleteTask = async () => {
        const url = `/.netlify/functions/delete-task?id=${taskId}`;
        
        if(window.confirm('Eliminar tarea? Esta acción no tiene vuelta atrás')) {
            try {
                await fetch(url).then((res) => res.json());
                handleListLoading(true);
            } catch (err) {
                alert(err);
            }   
        }
    }

    return (
        <div className="task-actions">
            <button onClick={handleEdit}>
                <span className="material-symbols-outlined">edit</span>
            </button>
            <button onClick={deleteTask}>
                <span className="material-symbols-outlined">delete</span>
            </button>
        </div>
    )
}

export default TaskOptions;
