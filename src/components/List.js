import { useState, useEffect } from "react";
import { Modal, Card, Dropdown, Button } from "flowbite-react";
import { MdEdit, MdDeleteForever, MdAddTask, MdDangerous } from "react-icons/md";
import EditListForm from "./EditListForm";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";

function List({ list, handleAppLoading }) {
    const [editMode, setEditMode] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showTaskForm, setShowTaskForm] = useState(false);

    useEffect(() => {
        const getTasks = async () => {
            const url = `/.netlify/functions/get-tasks?listId=${list._id}`;
    
            try {
                const response = await fetch(url).then((res) => res.json());
                setTasks(response);
            } catch (err) {
                alert(err);
            }
        }

        if(loading === true) getTasks();

        return () => {
            setLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ loading ]);

    const updateList = async (id, title) => {
        const url = `/.netlify/functions/update-list?id=${id}&title=${title}`;

        try {
            await fetch(url).then((res) => res.json());
            handleAppLoading(true);
        } catch (err) {
            alert(err);
        }
    }

    const deleteList = async () => {
        const url = `/.netlify/functions/delete-list?id=${list._id}`;

        try {
            const response = await fetch(url).then((res) => res.json());
            return response;
        } catch (err) {
            alert(err);
        } finally {
            handleAppLoading(true);
        }
    }

    const handleEditListForm = () => {
        // Mostrar/ocultar formulario de edición de lista
        setEditMode(!editMode);
    }

    const handleNewTaskForm = () => {
        // Mostrar/ocultar formulario de creacion de tarea
        setShowTaskForm(!showTaskForm);
    }

    const handleListLoading = (loadingState) => setLoading(loadingState);

    return (
        <>
            <Modal
                show={showDeleteModal}
                size="md"
                popup={true}
                onClose={e => setShowDeleteModal(false)}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <MdDangerous className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Eliminar {list.title}? Esta acción no tiene vuelta atrás
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                color="failure"
                                onClick={deleteList}
                            >
                                Sí, seguro
                            </Button>
                            <Button
                                color="dark"
                                onClick={e => setShowDeleteModal(false)}
                            >
                                No, cancelar
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        
            <div className="max-w-sm mx-4">
                <Card>
                    <div className="mb-4 flex items-center justify-between">
                        { !editMode
                            ?   <>
                                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                                        {list.title}
                                    </h5>
                                    <Dropdown inline={true} >
                                        <Dropdown.Item onClick={e => setEditMode(true)}>
                                            <MdEdit />
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={e => setShowDeleteModal(true)}>
                                            <MdDeleteForever />
                                        </Dropdown.Item>
                                    </Dropdown>
                                </>
                            :   <EditListForm
                                    list={list}
                                    handleEditListForm={handleEditListForm}
                                    updateList={updateList} 
                                />
                        }
                    </div>

                    <div className="flow-root">
                        { tasks.length > 0
                            ?   tasks.map(task => (
                                    <Task key={task._id} listId={list._id} task={task} handleListLoading={handleListLoading} />
                                ))
                            :   <p>No hay tareas...</p>
                        }
                    </div>

                    { !showTaskForm
                        ?   <div>
                                <Button
                                    className="w-full"
                                    size="sm"
                                    outline={true}
                                    gradientDuoTone="greenToBlue"
                                    onClick={handleNewTaskForm}
                                >
                                    <MdAddTask className="mr-2"/>
                                    Agregar nueva tarea
                                </Button>
                            </div>   
                        :   <AddTaskForm listId={list._id} handleNewTaskForm={handleNewTaskForm} handleListLoading={handleListLoading} />
                    }

                </Card>
            </div>
        </>
    )
};

export default List;
