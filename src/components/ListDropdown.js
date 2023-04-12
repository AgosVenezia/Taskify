const Dropdown = ({ listId, show }) => {
    function handleEdit() {
        // Mostrar formulario de edicion de lista
        console.log('edit list -> ', listId);
    }
    function handleDelete() {
        // Mostrar alerta/modal de confirmacion 
        console.log('delete list -> ', listId);
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