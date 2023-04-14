import { useState } from "react";

const AddListForm = ({ handleAddListForm, saveList }) => {
    const [title, setTitle] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();

        if(!title) {
            alert('El título debe ser una cadena de caracteres.')
            return
        }

        saveList({title});

        handleAddListForm();
        setTitle('');

    }

    const onReset = () => {
        handleAddListForm();
    }

    return (
        <form action="" className="add-list-form" onSubmit={onSubmit} onReset={onReset}>
            <input type="text" name="list-title" placeholder="Título de lista" onChange={(e) => setTitle(e.target.value)} />
            <div className="form-btns">
                <button className="btn-add-list" type="submit">
                    <span className="material-symbols-outlined">
                        add
                    </span>
                    Agregar
                </button>
                <button className="btn-clear-list-form" type="reset">
                    <span className="material-symbols-outlined">
                        close
                    </span>
                    Cancelar
                </button>
            </div>
        </form>
    )
}

export default AddListForm;