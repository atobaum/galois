// eslint-disable-next-line
import React from "react";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import StatusBar from "../components/StatusBar";
import ZettelGrid from "../components/zettel-grid/ZettelGrid";
import SmallEditor from "../components/SmallEditor";

const MainPageCss = css`
  min-height: 100vh;
  width: 100vw;
  margin: 0;

  .centered-layout {
    border-right: 1px solid gray;
    border-left: 1px solid gray;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;

    @media (max-width: 760px) {
      width: 100%;
    }

    width: 760px;
  }
`;

function MainPage() {
  return (
    <div css={MainPageCss}>
      <StatusBar />
      <div className="centered-layout">
        <SmallEditor />
        <ZettelGrid />
      </div>
    </div>
  );
}

export default MainPage;
