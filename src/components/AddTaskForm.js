import { useState } from "react";

const AddTaskForm = ({listId, handleNewTaskForm, handleListLoading}) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [label, setLabel] = useState('');

    const insertTask = async (task) => {
        const params = new URLSearchParams(task)
        const url = `/.netlify/functions/insert-task?${params}`;

        try {
            await fetch(url).then((res) => res.json());
            handleListLoading(true);
        } catch (err) {
            alert(err);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

        handleNewTaskForm();

        insertTask({listId, title, text, label})
    }

    const onReset = () => {
        handleNewTaskForm();
    }

    return (
        <form className="new-task-form" onSubmit={onSubmit} onReset={onReset}>
            <input type="text" name="title" placeholder="Título" onChange={e => setTitle(e.target.value)}/>
            <input type="text" name="text" placeholder="Descripción" onChange={e => setText(e.target.value)}/>
            <select name="label" id="label-select" onChange={e => setLabel(e.target.value)}>
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

export default AddTaskForm;
