import { useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { MdSend, MdCancel } from "react-icons/md";

const AddListForm = ({ handleAddListForm, handleAppLoading }) => {
    const [title, setTitle] = useState('')

    const insertList = async (title) => {
        const url = `/.netlify/functions/insert-list?title=${title}`;

        try {
            await fetch(url).then((res) => res.json());
            handleAppLoading(true);
        } catch (err) {
            alert(err);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(!title) {
            alert('El título debe ser una cadena de caracteres.')
            return
        }

        insertList(title);

        handleAddListForm();
        setTitle('');
    }

    const onReset = () => {
        handleAddListForm();
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={onSubmit} onReset={onReset}>
                <Label
                    htmlFor="title"
                    value="Título"
                />
            <TextInput
                id="title"
                type="text"
                sizing="sm"
                value={title}
                onChange={e => setTitle(e.target.value)}
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
    )
}

export default AddListForm;
