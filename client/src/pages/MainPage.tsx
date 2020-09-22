// eslint-disable-next-line
import React from "react";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import StatusBar from "../components/StatusBar";
import GNB from "../components/GNB";
import ZettelView from "../components/main-page/ZettelView";
import ZettelList from "../components/main-page/ZettelList";
import { addZetel } from "../reducers/zettelReducer";
import { useDispatch } from "react-redux";
import { Zettel } from "../models/Zettel";
import { createZettel } from "../api/zettelApi";

const MainPageCss = css`
  height: 100vh;
  width: 100vw;
  margin: 0;
  display: grid;
  grid-template-columns: 100px 1fr 1fr;
  grid-template-rows: 60px 1fr 1fr;
  grid-template-areas:
    "gnb status-bar status-bar"
    "gnb zettel-list zettel-view"
    "gnb zettel-list meta";

  .status-bar {
    grid-area: status-bar;
  }

  .gnb {
    grid-area: gnb;
  }

  .zettel-list {
    grid-area: zettel-list;
  }

  .zettel-view {
    grid-area: zettel-view;
  }
`;

function MainPage() {
  const dispatch = useDispatch();
  return (
    <div css={MainPageCss}>
      <GNB />
      <StatusBar />
      <ZettelView
        onSubmit={async (args: Pick<Zettel, "title" | "content" | "tags">) => {
          const createdZettel = await createZettel(args);
          dispatch(addZetel(createdZettel));
        }}
      />
      <ZettelList />
    </div>
  );
}

export default MainPage;
