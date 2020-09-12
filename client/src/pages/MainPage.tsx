import React from "react";
import { Link } from "react-router-dom";
import ZettelEditor from "../components/ZettelEditor";
import ZettelList from "../components/ZettelList";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useDispatch } from "react-redux";
import { addZetel } from "../reducers/zettelReducer";
import { createZettel } from "../api/zettelApi";
import { Zettel } from "../models/Zettel";

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
      <a href="/api/auth/google/redirect">Login</a>
      <a href="/api/auth/logout">Login</a>
    </div>
  );
}

function MainPage() {
  const dispatch = useDispatch();
  return (
    <div css={MainPageCss}>
      <TopNav />
      <ZettelEditor
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
