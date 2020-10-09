// eslint-disable-next-line
import React from "react";
import StatusBar from "../components/core/StatusBar";
import ZettelGrid from "../components/zettel-grid/ZettelGrid";
import SmallEditor from "../components/main-page/SmallEditor";
import { Container } from "@material-ui/core";

function MainPage() {
  return (
    <div>
      <StatusBar />
      <Container>
        <SmallEditor />
        <ZettelGrid />
      </Container>
    </div>
  );
}

export default MainPage;
