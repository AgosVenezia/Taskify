import { useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import axios from "axios";

const useBoardContext = () => {
  const [loading, setLoading] = useState(true);
  const [tasklists, setTasklists] = useState([]);

  return {
    tasklists,
    loading,
    setLoading,
    getTasklists: async () => {
      return await axios
        .get("/api/tasklists")
        .then((res) => setTasklists(res.data))
        .then(() => setLoading(false))
        .catch((err) => err);
    },
  };
};

const BoardContext = createContext(null);

export const BoardContextProvider = ({ children }) => (
  <BoardContext.Provider value={useBoardContext()}>
    { children }
  </BoardContext.Provider>
)

export const useLoading = () => useContextSelector(BoardContext, (ctx) => ctx.loading);
export const useSetLoading = () => useContextSelector(BoardContext, (ctx) => ctx.setLoading);
export const useTasklists = () => useContextSelector(BoardContext, (ctx) => ctx.tasklists);
export const useGetTasklists = () => useContextSelector(BoardContext, (ctx) => ctx.getTasklists);
