import React from "react";
import { Link } from "react-router-dom";
import ZettelEditor from "../components/ZettelEditor";
import ZettelList from "../components/ZettelList";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useDispatch, useSelector } from "react-redux";
import { addZetel } from "../reducers/zettelReducer";
import { createZettel } from "../api/zettelApi";
import { Zettel } from "../models/Zettel";

const MainPageCss = css`
  max-width: 1280px;
  margin: 0 auto;
  min-height: 100vh;
`;

function TopNav() {
  const user = useSelector((state: any) => state.core.user);
  return (
    <div>
      {user && (
        <span>
          {user.picture && (
            <img
              style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
              src={user.picture}
            />
          )}
          Hi {user.username}
        </span>
      )}
      <div>
        <Link to="/">Home</Link>
        <Link to="/tag/inbox">Inbox</Link>
        {user ? (
          <a
            href="#"
            onClick={() => {
              window.localStorage.removeItem("access_token");
              window.localStorage.removeItem("refresh_token");
              window.location.reload();
            }}
          >
            Logout
          </a>
        ) : (
          <a href="/api/auth/google/redirect">Login</a>
        )}
      </div>
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
