import React from "react";
import { Link } from "react-router-dom";
import ZettelEditor from "../components/ZettelEditor";
import ZettelList from "../components/ZettelList";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useDispatch } from "react-redux";
import { addZetel } from "../reducers/zettelReducer";

const MainPageCss = css`
  max-width: 1280px;
  margin: 0 auto;
  min-height: 100vh;
`;

function TopNav() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/tags/inbox">Inbox</Link>
    </div>
  );
}

function MainPage() {
  const dispatch = useDispatch();
  return (
    <div css={MainPageCss}>
      <TopNav />
      <ZettelEditor
        onSubmit={(args) =>
          dispatch(addZetel({ ...args, id: ~~(Math.random() * 1000) }))
        }
      />
      <ZettelList />
    </div>
  );
}

export default MainPage;
