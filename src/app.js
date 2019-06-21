import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureReduxStore from "./store/configureReduxStore";
import List from "./components/List";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureReduxStore();

const jsx = (
  <Provider store={store}>
    <List />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));
