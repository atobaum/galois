import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Toast from "./components/core/Toast";

import MainPage from "./pages/MainPage";
import ProjectListPage from "./pages/ProjectListPage";
import ProjectPage from "./pages/ProjectPage";
import ZettelPage from "./pages/ZettelPage";
import LoginCallbackPage from "./pages/LoginCallbackPage";

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
        <Route path="/projects" component={ProjectListPage} />
        <Route path="/project/:id" component={ProjectPage} />
        <Route path="/zettel/:id" component={ZettelPage} />
        <Route path="/login_callback" component={LoginCallbackPage} />
        <Route path="/" component={MainPage} />
      </Switch>
      <Toast />
    </div>
  );
}

export default App;
