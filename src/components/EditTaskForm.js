import { useState } from "react";

const EditTaskForm = ({task, handleEditTaskForm, handleListLoading}) => {
    const [title, setTitle] = useState(task.title);
    const [text, setText] = useState(task.text);
    const [label, setLabel] = useState(task.label);

    const updateTask = async (task) => {
        const params = new URLSearchParams(task)
        const url = `/.netlify/functions/update-task?${params}`;

        try {
            const response = await fetch(url).then((res) => res.json());
            handleListLoading(true);
        } catch (err) {
            alert(err);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        handleEditTaskForm();
        updateTask({taskId:task._id, title, text, label})
    }

    const onReset = () => {
        handleEditTaskForm();
    }

    return (
        <form className="new-task-form" onSubmit={onSubmit} onReset={onReset}>
            <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)}/>
            <input type="text" name="text" value={text} onChange={e => setText(e.target.value)}/>
            <select name="label" id="label-select" value={label} onChange={e => setLabel(e.target.value)}>
                <option value="">Etiqueta:</option>
                <option value="green">Tranqui</option>
                <option value="yellow">Metele</option>
                <option value="red">Para ayer</option>
            </select>
            <div className="form-btns">
                <button className="btn-add-task" type="submit">Guardar</button>
                <button className="btn-clear-task-form" type="reset">Volver</button>
            </div>
        </form>
    )
}

export default EditTaskForm;
