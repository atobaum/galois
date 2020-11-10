// eslint-disable-next-line
import React from "react";
import StatusBar from "../components/core/StatusBar";
import ZettelGrid from "../components/zettel-grid/ZettelGrid";
import SmallEditor from "../components/common/Editor/SmallEditor";
import { Container } from "@material-ui/core";
import useSetTitle from "../hooks/useSetTitle";
import Helmet from "react-helmet";

function MainPage() {
  useSetTitle("Home");
  return (
    <div>
      <Helmet>
        <title>Home - Galois</title>
      </Helmet>
      <StatusBar />
      <Container>
        <SmallEditor />
        <ZettelGrid />
      </Container>
    </div>
  );
}

export default MainPage;
