import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ZettelViewPage from "./pages/ZettelViewPage";
import { useDispatch } from "react-redux";
import { addZetel } from "./reducers/zettelReducer";
import { getZettels } from "./api/zettelApi";
import ZettelTagFilterPage from "./pages/ZettelTagFilterPage";
import { getCurrentUser } from "./api/userApi";
import { setUser } from "./reducers/coreReducer";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getZettels().then((data) => {
      data.forEach((z) => dispatch(addZetel(z)));
    });
    getCurrentUser().then((data) => dispatch(setUser(data)));
    // eslint-disable-next-line
  }, []);
  return (
    <div className="App">
      <Switch>
        <Route path="/zettel/:id" component={ZettelViewPage} />
        <Route path="/tag/:tag" component={ZettelTagFilterPage} />
        <Route path="/" component={MainPage} />
      </Switch>
    </div>
  );
}

export default App;
