import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { useDispatch } from "react-redux";
import { getZettels } from "./api/zettelApi";
import LoginCallbackPage from "./pages/LoginCallbackPage";
import useCurrentUser from "./hooks/useCurrentUser";
import Toast from "./components/core/Toast";
import { setZettelsToGrid } from "./redux/modules/zettel-grid";

function App() {
  const dispatch = useDispatch();
  const user = useCurrentUser();

  useEffect(() => {
    if (user)
      getZettels().then((data) => {
        dispatch(setZettelsToGrid(data));
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/login_callback" component={LoginCallbackPage} />
        <Route path="/" component={MainPage} />
      </Switch>
      <Toast />
    </div>
  );
}

export default App;
