import React, { useState } from "react";
import { Link } from "react-router-dom";
import ZettelEditor from "../components/ZettelEditor";
import ZettelList from "../components/ZettelList";
import { v4 as uuid } from "uuid";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const MainPageCss = css`
  max-width: 1280px;
  margin: 0 auto;
  min-height: 100vh;
`;

function TopNav() {
  return (
    <div>
      <Link to="/">Inbox</Link>
    </div>
  );
}

function MainPage() {
  const [notes, setNotes] = useState<any[]>([]);
  return (
    <div css={MainPageCss}>
      <TopNav />
      <ZettelEditor
        onSubmit={(args) => setNotes([...notes, { ...args, uuid: uuid() }])}
      />
      <ZettelList notes={notes} />
    </div>
  );
}

export default MainPage;
