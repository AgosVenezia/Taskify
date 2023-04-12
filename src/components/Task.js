import TaskOptions from './TaskOptions';

function Task({task}) {

    return (
        <div className="task-card">
            <div className="task-header">
                <div className={"task-label task-label-" + task.label}></div>
            </div>
            <h3 className="task-title">{task.title}</h3>
            <p>
                {task.text}
            </p>
            <TaskOptions taskId={task.id} />
        </div>
    )
};

export default Task;