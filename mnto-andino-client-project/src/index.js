import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { Provider } from "react-redux";
import store from "./store/store";

/*  el objeto store como prop al proveedor. Esto permitirá que todos los componentes en la aplicación tengan acceso al estado de Redux. */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
