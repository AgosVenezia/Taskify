import { useState } from "react";
import { Label, Select, TextInput, Textarea, Button } from "flowbite-react";
import { MdSend, MdCancel } from "react-icons/md";

const EditTaskForm = ({task, handleEditTaskForm, handleListLoading}) => {
    const [title, setTitle] = useState(task.title);
    const [text, setText] = useState(task.text);
    const [label, setLabel] = useState(task.label);

    const updateTask = async (task) => {
        const params = new URLSearchParams(task)
        const url = `/.netlify/functions/update-task?${params}`;

        try {
            await fetch(url).then((res) => res.json());
            handleListLoading(true);
        } catch (err) {
            alert(err);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        handleEditTaskForm();
        updateTask({taskId:task._id, title, text, label})
    }

    const onReset = () => {
        handleEditTaskForm();
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={onSubmit} onReset={onReset}>
            <div id="select">
                <div className="mb-2 block">
                    <Label
                        htmlFor="label"
                        value="Urgencia"
                    />
                </div>
                <Select
                    sizing="sm"
                    id="label"
                    required={true}
                    value={label}
                    onChange={e => setLabel(e.target.value)}
                >
                    <option value="green">Chill</option>
                    <option value="yellow">Warning</option>
                    <option value="red">Urgent</option>
                </Select>
                </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="title"
                        value="Título"
                    />
                </div>
                    <TextInput
                        id="title"
                        type="text"
                        sizing="sm"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
            </div>
            <div id="textarea">
                <div className="mb-2 block">
                    <Label
                        htmlFor="text"
                        value="Descripción"
                    />
                </div>
                <Textarea
                    className="text-xs"
                    id="text"
                    placeholder="Descripción..."
                    required={true}
                    rows={4}
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
            </div>
            
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
    )
}

export default EditTaskForm;
