import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "components/App/App";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://e0819b1bf06247caba3ce6d125bd18f4@sentry.io/1441787"
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
