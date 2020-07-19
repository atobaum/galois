import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./style.css";

import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { BrowserRouter } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension"; // 리덕스 개발자 도구

let store = null;
if (process.env.NODE_ENV === "development")
  store = createStore(rootReducer, composeWithDevTools());
else store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
