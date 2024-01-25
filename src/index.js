import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import "./style/responsive.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);
