import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ZettelViewPage from "./pages/ZettelViewPage";
import { useDispatch } from "react-redux";
import { addZetel } from "./reducers/zettelReducer";
import { getZettels } from "./api/zettelApi";
import LoginCallbackPage from "./pages/LoginCallbackPage";
import useCurrentUser from "./hooks/useCurrentUser";

function App() {
  const dispatch = useDispatch();
  const user = useCurrentUser();

  useEffect(() => {
    if (user)
      getZettels().then((data) => {
        data.forEach((z) => dispatch(addZetel(z)));
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/zettel/:id" component={ZettelViewPage} />
        <Route path="/login_callback" component={LoginCallbackPage} />
        <Route path="/" component={MainPage} />
      </Switch>
    </div>
  );
}

export default App;
