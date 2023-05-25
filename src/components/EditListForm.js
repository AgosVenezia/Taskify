import { useState } from "react";
import { TextInput, Button } from "flowbite-react";
import { MdSend, MdCancel } from "react-icons/md";

const EditListForm = ({ list, handleEditListForm, updateList }) => {
    const [title, setTitle] = useState(list.title);

    const onSubmit = (e) => {
        e.preventDefault();

        if(!title) {
            alert('El título debe ser una cadena de caracteres.')
            return
        }

        updateList(list._id, title);

        handleEditListForm();
    } 

    const onReset = (e) => {
        handleEditListForm();
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={onSubmit} onReset={onReset}>
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

export default EditListForm;
