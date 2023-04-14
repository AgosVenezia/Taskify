import { useState, useEffect } from 'react';
import './App.css';
import List from './components/List';
import AddListForm from './components/AddListForm';

function App() {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const getLists = async () => {
            const listsFromServer = await fetchLists();
            setLists(listsFromServer);
            setLoading(false);
        }

        if(loading) {
            getLists();
        }

    }, [ loading ])

    const fetchLists = async () => {
        const res = await fetch('http://localhost:5000/lists?_embed=tasks')
        const data = await res.json()

        return data
    }

    const saveList = async (list) => {
        await fetch('http://localhost:5000/lists', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(list)
        })

        setLoading(true);
    }

    const editList = async (id, title) => {
        await fetch(`http://localhost:5000/lists/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({title})
        })

        setLoading(true);
    }

    const deleteList = async (id) => {
        if(window.confirm('Eliminar lista? Esta acción no tiene vuelta atrás')) {
                const res = await fetch(`http://localhost:5000/lists/${id}`, {
                method: 'DELETE',
            })

            if(!res.status === 200) alert('Error eliminando lista')
        }

        setLoading(true);

    }

    const saveTask = async (task) => {
        await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        setLoading(true);
    }

    const editTask = async (task) => {
        await fetch(`http://localhost:5000/tasks/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        setLoading(true);
    }

    const deleteTask = async (id) => {
        if(window.confirm('Eliminar tarea? Esta acción no tiene vuelta atrás')) {
                const res = await fetch(`http://localhost:5000/tasks/${id}`, {
                method: 'DELETE',
            })

            if(!res.status === 200) alert('Error eliminando tarea')
        }

        setLoading(true);

    }

    function handleAddListForm() {
        // Mostrar form de creacion de nueva lista
        setShowForm(!showForm);
    }

    return (
        <div className="App">
            <>
                {lists.map((list) => (
                    <List key={list.id} list={list} editList={editList} deleteList={deleteList} saveTask={saveTask} editTask={editTask} deleteTask={deleteTask}/>
                ))}
            </>
            <div className='new-list-card'>
                { !showForm ?
                                <button className="btn-new-list" onClick={handleAddListForm}>
                                    <span className="material-symbols-outlined">
                                        add
                                    </span>
                                    Agregar nueva lista
                                </button>
                            :
                                <AddListForm handleAddListForm={handleAddListForm} saveList={saveList}/>
                }
                
            </div>
        </div>
    );
}

export default App;
