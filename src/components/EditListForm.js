import { useState } from "react";

const EditListForm = ({ list, handleEditListForm, updateList }) => {
    const [title, setTitle] = useState(list.title);

    const onSubmit = (e) => {
        e.preventDefault();

        if(!title) {
            alert('El título debe ser una cadena de caracteres.')
            return
        }

        updateList(list._id, title);

        handleEditListForm();
    } 

    const onReset = (e) => {
        handleEditListForm();
    }

    return (
        <form className="edit-list-form" onSubmit={onSubmit} onReset={onReset}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <button className="btn-confirm-edit" type="submit">
                <span className="material-symbols-outlined">done</span>
            </button>
            <button className="btn-cancel-edit" type="reset">
                <span className="material-symbols-outlined">cancel</span>
            </button>
        </form>
    )
}

export default EditListForm;