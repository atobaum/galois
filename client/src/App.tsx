import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={MainPage} />
      </Switch>
    </div>
  );
}

export default App;
