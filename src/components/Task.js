import { useState } from 'react';
import TaskOptions from './TaskOptions';
import EditTaskForm from './EditTaskForm';

function Task({listId, task, handleListLoading}) {
    const [editMode, setEditMode] = useState(false);

    function handleEditTaskForm() {
        setEditMode(!editMode);
    }

    return (
        <div className="task-card">
            { !editMode
                ?   <>
                        <div className="task-header">
                            <div className={"task-label task-label-" + task.label}></div>
                        </div>
                        <h3 className="task-title">{task.title}</h3>
                        <p>
                            {task.text}
                        </p>
                        <TaskOptions taskId={task._id} handleEditTaskForm={handleEditTaskForm} handleListLoading={handleListLoading} />
                    </>
                :
                    <EditTaskForm listId={listId} task={task} handleEditTaskForm={handleEditTaskForm} handleListLoading={handleListLoading} />
            }
            
        </div>
    )
};

export default Task;