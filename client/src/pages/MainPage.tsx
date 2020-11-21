// eslint-disable-next-line
import React from "react";
import StatusBar from "../components/core/StatusBar";
import ZettelGrid from "../components/zettel-grid/ZettelGrid";
import SmallEditor from "../components/editor/SmallEditor";
import { Container } from "@material-ui/core";
import useSetTitle from "../hooks/useSetTitle";
import Helmet from "react-helmet";
import { useDispatch } from "react-redux";
import { createZettelAction } from "../redux/modules/zettel-grid";

function MainPage() {
  useSetTitle("Home");
  const dispatch = useDispatch();
  return (
    <div>
      <Helmet>
        <title>Home - Galois</title>
      </Helmet>
      <StatusBar />
      <Container>
        <SmallEditor
          onSubmit={(data) => {
            dispatch(createZettelAction(data));
          }}
        />
        <ZettelGrid />
      </Container>
    </div>
  );
}

export default MainPage;
