import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "./i18n/config";
import { Provider } from "react-redux";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";

axios.defaults.headers["x-icode"] = "46A0A6ADED08D5A9";
axios.defaults.baseURL = "/api";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store.store}>
      <PersistGate persistor={store.persistedStore}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
