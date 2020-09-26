import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Link } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";
import { useDispatch } from "react-redux";
import { startEdit } from "../reducers/editorReducer";

const StatusBarCss = css``;

const StatusBar: React.FC = () => {
  const user = useCurrentUser();
  const disptach = useDispatch();

  return (
    <div className="status-bar" css={StatusBarCss}>
      <button
        onClick={() => {
          disptach(startEdit(null));
        }}
      >
        New
      </button>
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
          <button
            onClick={() => {
              window.localStorage.removeItem("access_token");
              window.localStorage.removeItem("refresh_token");
              window.localStorage.removeItem("user");
              window.location.reload();
            }}
          >
            Logout
          </button>
        ) : (
          <a href="/api/auth/google/redirect">Login</a>
        )}
      </div>
    </div>
  );
};

export default StatusBar;
