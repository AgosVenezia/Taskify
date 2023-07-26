import { BoardContextProvider, useLoading, useGetTasklists, useTasklists } from '../context/boardContext';
import { useState, useEffect } from 'react';
import { Spinner, Card, Button } from 'flowbite-react';
import { MdPlaylistAdd } from "react-icons/md";
import Tasklist from '../components/Tasklist';
import TasklistForm from "../components/TasklistForm";

const Board = () => {
  const [showForm, setShowForm] = useState(false);
  const loading = useLoading();
  const getTasklists = useGetTasklists();
  const tasklists = useTasklists();

  useEffect(() => {
    if(loading) {
      getTasklists()
    }
  }, [loading])

  // Mostrar form de creacion de nueva lista
  const handleTasklistForm = () => setShowForm(!showForm);

  if(loading) {
    return (
      <div className="pt-32 flex items-center justify-center gap-2 w-full min-h-screen dark:bg-gray-900">
        <Spinner
          className="my-12"
          aria-label="Extra large Center-aligned spinner example"
          size="xl"
        />
      </div>
    );
  }

  return (
    <div className="pt-20 flex flex-nowrap overflow-x-scroll min-h-screen dark:bg-gray-900">
        {tasklists?.map((tasklist) => (
          <Tasklist key={tasklist._id} tasklist={tasklist}  />
        ))}
        <div className="w-64 mx-4 shrink-0">
          <Card>
            {!showForm ? (
              <div>
                <Button
                  className="w-full"
                  size="sm"
                  outline={true}
                  gradientDuoTone="purpleToBlue"
                  onClick={handleTasklistForm}
                >
                  <MdPlaylistAdd className="mr-2" />
                  Agregar nueva lista
                </Button>
              </div>
            ) : (
              <TasklistForm
                handleTasklistForm={handleTasklistForm}
              />
            )}
          </Card>
        </div>
    </div>
  );
};

export default function BoardContextWrapper() {
  return (
    <BoardContextProvider>
      <Board />
    </BoardContextProvider>
  )
};
