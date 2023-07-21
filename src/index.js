import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { UserContextProvider } from "./context/userContext";
import PrivateRoutes from "./utils/PrivateRoutes";
import App from "./App";
import Home from "./screens/Home";
import Board from "./screens/Board";
import Profile from "./screens/Profile";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="" element={<PrivateRoutes />}>
        <Route path="/board" element={<Board />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </UserContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
