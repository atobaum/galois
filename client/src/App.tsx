import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Toast from "./components/core/Toast";

import MainPage from "./pages/MainPage";
import ProjectListPage from "./pages/ProjectListPage";
import ProjectPage from "./pages/ProjectPage";
import ZettelPage from "./pages/ZettelPage";
import LoginCallbackPage from "./pages/LoginCallbackPage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

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

  useEffect(() => {
    if (!localStorage.getItem("refresh_token")) history.push("/login");
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/projects" component={ProjectListPage} />
        <Route path="/project/:id" component={ProjectPage} />
        <Route path="/zettel/:id" component={ZettelPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/login_callback" component={LoginCallbackPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/" component={MainPage} />
      </Switch>
      <Toast />
    </div>
  );
}

export default App;
