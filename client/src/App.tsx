import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { useDispatch } from "react-redux";
import LoginCallbackPage from "./pages/LoginCallbackPage";
import Toast from "./components/core/Toast";
import ZettelPage from "./pages/ZettelPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // To dispatch redux action in apolloClient if error occurred.
    const dispatchHandler = (evt: any) => {
      dispatch(evt.detail);
    };
    window.addEventListener("dispatch-redux", dispatchHandler);

    return () => {
      window.removeEventListener("dispatch-redux", dispatchHandler);
    };
  }, [dispatch]);

  return (
    <div className="App">
      <Switch>
        <Route path="/zettel/:id" component={ZettelPage} />
        <Route path="/login_callback" component={LoginCallbackPage} />
        <Route path="/" component={MainPage} />
      </Switch>
      <Toast />
    </div>
  );
}

export default App;
