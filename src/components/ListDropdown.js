const Dropdown = ({ list, show, handleDropdown, handleEditListForm, deleteList }) => {
    function handleEdit() {
        // Ocultar dropdown y mostrar formulario de edicion de lista
        handleDropdown();
        handleEditListForm();
    }
    function handleDelete() {
        // Ocultar dropdown y eliminar lista
        handleDropdown();
        deleteList(list.id);
    }    

    if(show) {
        return (
            <div className="list-actions-dropdown">
                <button onClick={handleEdit}>
                    <span className="material-symbols-outlined">edit</span>
                </button>
                <button onClick={handleDelete}>
                    <span className="material-symbols-outlined">delete</span>
                </button>
            </div>
        )
    }
}

export default Dropdown;