import axios from "axios";
import { useState } from "react";
import { useSetLoading } from "../context/boardContext";
import { Modal, Card, Dropdown, Button } from "flowbite-react";
import {
  MdEdit,
  MdDeleteForever,
  MdAddTask,
  MdDangerous,
} from "react-icons/md";
import TasklistForm from "./TasklistForm";
import TaskForm from "./TaskForm";
import Task from "./Task";
import { toast } from "react-toastify";

function Tasklist({ tasklist }) {
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const setLoading = useSetLoading();

  const deleteTasklist = async (e) => {
    e.preventDefault();
    await axios.delete(`/api/tasklists/${tasklist._id}`)
                .then(() => {
                  setLoading(true)
                  toast.success("Lista de tareas eliminada")
                })
                .catch((err) => {
                  toast.error(`Error: ${err}`)
                });
  }

  const handleTasklistForm = () => {
    // Mostrar/ocultar formulario de edición de lista
    setEditMode(!editMode);
  };

  const handleTaskForm = () => {
    // Mostrar/ocultar formulario de creacion de tarea
    setShowTaskForm(!showTaskForm);
  };

  return (
    <>
      <Modal
        show={showDeleteModal}
        size="md"
        popup={true}
        onClose={(e) => setShowDeleteModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <MdDangerous className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Eliminar <strong>{tasklist.title}</strong>? Esta acción no tiene vuelta atrás
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteTasklist}>
                Sí, seguro
              </Button>
              <Button color="dark" onClick={(e) => setShowDeleteModal(false)}>
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="w-64 mx-4 shrink-0">
        <Card className="-p-4">
          <div className="mb-4 flex items-center justify-between">
            {!editMode ? (
              <>
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  {tasklist.title}
                </h5>
                <Dropdown inline={true}>
                  <Dropdown.Item onClick={(e) => setEditMode(true)}>
                    <MdEdit />
                  </Dropdown.Item>
                  <Dropdown.Item onClick={(e) => setShowDeleteModal(true)}>
                    <MdDeleteForever />
                  </Dropdown.Item>
                </Dropdown>
              </>
            ) : (
              <TasklistForm 
                tasklist={tasklist}
                handleTasklistForm={handleTasklistForm}
              />
            )}
          </div>

          <div className="flow-root">
            {tasklist.tasks?.length > 0 ? (
              tasklist.tasks.map((task) => (
                <Task
                  key={task._id}
                  tasklistId={tasklist._id}
                  task={task}
                />
              ))
            ) : (
              <p>No hay tareas...</p>
            )}
          </div>

          {!showTaskForm ? (
            <div>
              <Button
                className="w-full"
                size="sm"
                outline={true}
                gradientDuoTone="greenToBlue"
                onClick={handleTaskForm}
              >
                <MdAddTask className="mr-2" />
                Agregar nueva tarea
              </Button>
            </div>
          ) : (
            <TaskForm
              tasklistId={tasklist._id}
              handleTaskForm={handleTaskForm}
            />
          )}
        </Card>
      </div>
    </>
  );
}

export default Tasklist;
