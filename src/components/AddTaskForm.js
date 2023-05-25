import { useState } from "react";
import { Card, Label, Select, TextInput, Textarea, Button } from "flowbite-react";
import { MdSend, MdCancel } from "react-icons/md";

const AddTaskForm = ({listId, handleNewTaskForm, handleListLoading}) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [label, setLabel] = useState('');

    const insertTask = async (task) => {
        const params = new URLSearchParams(task)
        const url = `/.netlify/functions/insert-task?${params}`;

        try {
            await fetch(url).then((res) => res.json());
            handleListLoading(true);
        } catch (err) {
            alert(err);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        handleNewTaskForm();
        insertTask({listId, title, text, label})
    }

    const onReset = () => {
        handleNewTaskForm();
    }

    return (
        <div className="max-w-sm">
            <Card>
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
            </Card>
        </div>
    )
}

export default AddTaskForm;
