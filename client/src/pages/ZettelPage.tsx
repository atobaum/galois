import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useParams } from "react-router-dom";
import StatusBar from "../components/core/StatusBar";
import useZettel from "../hooks/useZettel";
import ZettelViewer from "../components/zettel-page/ZettelViewer";
import ZettelList from "../components/zettel-page/ZettelList";
import useSetTitle from "../hooks/useSetTitle";
import Helmet from "react-helmet";

const ZettelPageCss = css`
  height: 100vh;
  display: flex;
  flex-direction: column;
  .main-panel {
    height: 0;
    display: grid;
    flex: 1 1;
    grid-template-columns: 1fr 0.7fr;
  }
`;

const ZettelPage: React.FC = () => {
  const params = useParams() as { id?: string };
  const id = parseInt(params.id || "");
  const { zettel, loading } = useZettel(id);
  const title = zettel ? (zettel.title ? zettel.title : id + "") : id + "";
  useSetTitle(title);

  return (
    <div css={ZettelPageCss}>
      <Helmet>
        <title>{(zettel && zettel.title) || "No" + id} - Galois</title>
      </Helmet>
      <StatusBar />
      <div className="main-panel">
        <ZettelViewer zettel={zettel} />
        <ZettelList />
      </div>
    </div>
  );
};

export default ZettelPage;
