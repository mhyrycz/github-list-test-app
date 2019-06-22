import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureReduxStore from "./store/configureReduxStore";
import Main from "./components/Main";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureReduxStore();

const jsx = (
  <Provider store={store}>
    <Main />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));
