import { useState } from 'react';
import { Modal, Card, Badge, Button } from 'flowbite-react';
import { MdEdit, MdDeleteForever, MdDangerous } from "react-icons/md";
import EditTaskForm from './EditTaskForm';

function Task({task, handleListLoading}) {
    const [editMode, setEditMode] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const labels = {
        green: 'Chill',
        yellow: 'Warning',
        red: 'Urgent'
    }

    const deleteTask = async () => {
        const url = `/.netlify/functions/delete-task?id=${task._id}`;
        
        try {
            await fetch(url).then((res) => res.json());
            handleListLoading(true);
        } catch (err) {
            alert(err);
        }   
    }

    function handleEditTaskForm() {
        setEditMode(!editMode);
    }

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
                            Eliminar {task.title}? Esta acción no tiene vuelta atrás
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                color="failure"
                                onClick={deleteTask}
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

            <div className="max-w-sm my-4">
                <Card>
                    { !editMode
                        ?   <div className="flex flex-col">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Badge color={task.label}>
                                        {labels[task.label]}
                                    </Badge>
                                </div>
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                    {task.title}
                                </h5>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {task.text}
                                </p>
                                <div className="flex flex-wrap items-center gap-2 mt-4">
                                    <Button
                                        size="xs"
                                        outline={true}
                                        color="dark"
                                        onClick={e => setEditMode(true)}
                                    >
                                        <MdEdit />
                                    </Button>
                                    <Button
                                        size="xs"
                                        outline={true}
                                        color="dark"
                                        onClick={e => setShowDeleteModal(true)}
                                    >
                                        <MdDeleteForever />
                                    </Button>
                                </div>
                            </div>
                        :   <EditTaskForm
                                task={task} 
                                handleEditTaskForm={handleEditTaskForm}
                                handleListLoading={handleListLoading}
                            />
                    }
                </Card>
            </div>
        </>
    )
};

export default Task;
