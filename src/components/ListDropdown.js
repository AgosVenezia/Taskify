const Dropdown = ({ listId, handleDropdown, handleEditListForm, handleAppLoading }) => {
    const handleEdit = () => {
        // Ocultar dropdown y mostrar formulario de edicion de lista
        handleDropdown();
        handleEditListForm();
    }

    const deleteList = async (id) => {
        handleDropdown();

        const url = `/.netlify/functions/delete-list?id=${listId}`;

        if(window.confirm('Eliminar lista? Esta acción no tiene vuelta atrás')) {
            try {
                const response = await fetch(url).then((res) => res.json());
                return response;
            } catch (err) {
                alert(err);
            } finally {
                handleAppLoading(true);
            }
        }
    }

    return (
        <div className="list-actions-dropdown">
            <button onClick={handleEdit}>
                <span className="material-symbols-outlined">edit</span>
            </button>
            <button onClick={deleteList}>
                <span className="material-symbols-outlined">delete</span>
            </button>
        </div>
    )
}

export default Dropdown;
