import axios from "axios";
import { useState } from "react";
import { useSetLoading } from "../context/boardContext";
import { TextInput, Button } from "flowbite-react";
import { MdSend, MdCancel } from "react-icons/md";

const TasklistForm = ({ tasklist, handleTasklistForm }) => {
  const [title, setTitle] = useState(tasklist?.title || "");
  const [pos, setPos] = useState(tasklist?.pos || 1);
  const setLoading = useSetLoading();

  const insertList = async () => {
    await axios.post("/api/tasklists", { title })
      .then((res) => JSON.stringify(res.data))
      .then(() => setLoading(true))
      .catch((err) => alert("err -> ", err));
  };

  const updateList = async () => {
    await axios.put(`/api/tasklists/${tasklist._id}`, { title, pos })
      .then((res) => JSON.stringify(res.data))
      .then(() => setLoading(true))
      .catch((err) => alert(err))
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      alert("El título debe ser una cadena de caracteres.");
      return;
    }

    tasklist ? await updateList() : await insertList();

    setTitle("");
    handleTasklistForm();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit} onReset={() => handleTasklistForm()}>
      <TextInput
        id="title"
        type="text"
        sizing="sm"
        placeholder="Título "
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex items-center justify-between gap-2 w-full">
        <Button type="submit" size="sm" gradientMonochrome="success">
          <MdSend className="mr-2" />
          Guardar
        </Button>
        <Button type="reset" size="sm" gradientMonochrome="failure">
          <MdCancel className="mr-2" />
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default TasklistForm;
