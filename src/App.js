import './App.css';
import List from './components/List';
import db from './db_mock.json';

function App() {
    const { lists, tasks } = db;

    function getListTasks(listId) {
        return tasks.filter(task => task.listId === listId)
    }

    function handleNewList() {
        // Mostrar form de creacion de nueva lista
        console.log('handleNewList -> revisar comentarios...')
    }

    return (
        <div className="App">
            <>
                {lists.map((list) => (
                    <List key={list.id} list={list} tasks={getListTasks(list.id)}/>
                ))}
            </>
            <div className='new-list-card'>
                <button className="btn-new-list" onClick={handleNewList}>
                    <span className="material-symbols-outlined">
                        add
                    </span>
                    Agregar nueva lista
                </button>
            </div>
        </div>
    );
}

export default App;
