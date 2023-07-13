import axios from "axios";
import { useState } from "react";
import { useSetLoading } from "../context/boardContext";
import {
  Select,
  TextInput,
  Textarea,
  Button,
} from "flowbite-react";
import { MdSend, MdCancel } from "react-icons/md";

const TaskForm = ({ task, tasklistId, handleTaskForm }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [label, setLabel] = useState(task?.label || "");
  const [pos, setPos] = useState(task?.pos || 1)

  const setLoading = useSetLoading();

  const insertTask = async () => {
    await axios.post("/api/tasks", { title, description, label, tasklistId })
      .then((res) => JSON.stringify(res.data))
      .then(() => setLoading(true))
      .catch((err) => alert("err -> ", err));
  };

  const updateTask = async () => {
    await axios.put(`/api/tasks/${task._id}`, {
      title,
      description,
      label,
      pos,
      tasklistId
    })
      .then((res) => JSON.stringify(res.data))
      .then(() => setLoading(true))
      .catch((err) => alert(err))
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    
    task ? await updateTask() : await insertTask();

    setTitle("");
    handleTaskForm();
  };

  const onReset = () => {
    handleTaskForm();
  };

  return (
    <div className="w-full px-2 py-4 border rounded-md shadow-md">
      <form
        className="flex flex-col gap-4"
        onSubmit={onSubmit}
        onReset={onReset}
      >
        <div id="select">
          <Select
            sizing="sm"
            id="label"
            placeholder="Urgencia"
            required={true}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          >
            <option value={null}>Urgencia</option>
            <option value="green">Aplazable</option>
            <option value="yellow">Necesario</option>
            <option value="red">Urgente</option>
          </Select>
        </div>
        <div>
          <TextInput
            id="title"
            placeholder="Título..."
            type="description"
            sizing="sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div id="textarea">
          <Textarea
            className="description-xs text-xs"
            id="description"
            placeholder="Descripción..."
            required={true}
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-2 w-full">
          <Button type="submit" size="xs" gradientMonochrome="success">
            <MdSend className="mr-2" />
            Guardar
          </Button>
          <Button type="reset" size="xs" gradientMonochrome="failure">
            <MdCancel className="mr-2" />
            Cancelar
          </Button>
        </div>

      </form>
    </div>
  );
};

export default TaskForm;
