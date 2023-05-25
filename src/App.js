import { useState, useEffect } from 'react';
import { Spinner, Card, Button } from 'flowbite-react';
import { MdPlaylistAdd } from 'react-icons/md';
import Header from './components/Header';
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
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    function handleAddListForm() {
        // Mostrar form de creacion de nueva lista
        setShowForm(!showForm);
    }

    const handleAppLoading = (loadingState) => {
        setLoading(loadingState);
    }

    return (
        <div className="App">
            <Header />
            
            { loading === true
                ?   <div className="flex items-center justify-center gap-2 w-full">
                        <Spinner
                            className="my-12"
                            aria-label="Extra large Center-aligned spinner example"
                            size="xl"
                        />    
                    </div>
                :   <div className="pt-8 flex overflow-x-scroll">
                        { lists.map((list) => <List key={list._id} list={list} handleAppLoading={handleAppLoading} />) }
                        <div className="max-w-sm mx-4">
                            <Card>
                                { !showForm
                                    ?   <div>
                                            <Button
                                                className="w-full"
                                                size="sm"
                                                outline={true}
                                                gradientDuoTone="purpleToBlue"
                                                onClick={handleAddListForm}
                                            >
                                                <MdPlaylistAdd className="mr-2"/>
                                                Agregar nueva lista
                                            </Button>
                                        </div> 
                                    :   <AddListForm handleAddListForm={handleAddListForm} handleAppLoading={handleAppLoading} />
                                }
                            </Card>
                        </div>
                    </div>
            }
        </div>
            
    );
}

export default App;
