import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <ToastContainer autoClose={2000} />
      <Outlet />
    </div>
  );
}

export default App;
