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
            const listsFromSv = await fetchLists();
            setLists(listsFromSv);
            setLoading(false);
        }

        loading === true && getLists();

    }, [ loading ]);

    const fetchLists = async () => {
        const url = '/.netlify/functions/get-lists'

        try {
            const response = await fetch(url).then((res) => res.json());
            return response;
        } catch (err) {
            alert(err);
        }
    }

    const insertList = async (title) => {
        const url = `/.netlify/functions/insert-list?title=${title}`;

        try {
            await fetch(url).then((res) => res.json());
            setLoading(true);
        } catch (err) {
            alert(err);
        }
    }

    function handleAddListForm() {
        // Mostrar form de creacion de nueva lista
        setShowForm(!showForm);
    }

    const handleAppLoading = (loadingState) => {
        setLoading(loadingState);
    }

    return (
        <div className="App">
            {  
                loading === true
                    ?   <h1>Cargando...</h1>
                    :   lists.map((list) => <List key={list._id} list={list} handleAppLoading={handleAppLoading} />)  
            }

            <div className='new-list-card'>
                {   
                    !showForm
                        ?   <button className="btn-new-list" onClick={handleAddListForm}>
                                <span className="material-symbols-outlined">
                                    add
                                </span>
                                Agregar nueva lista
                            </button>
                        :   <AddListForm handleAddListForm={handleAddListForm} insertList={insertList}/>
                }
            </div>
        </div>
    );
}

export default App;
