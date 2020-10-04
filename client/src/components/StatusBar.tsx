import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Link } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";
import { useDispatch } from "react-redux";
import { startEdit } from "../redux/editorReducer";

const StatusBarCss = css`
  display: flex;
  justify-content: space-between;

  button {
    border: 1px solid gray;
    border-radius: 0.3rem;
    padding: 0.2rem;
    background: none;
  }
`;

const StatusBar: React.FC = () => {
  const user = useCurrentUser();
  const disptach = useDispatch();

  return (
    <div className="status-bar" css={StatusBarCss}>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <button
          onClick={() => {
            disptach(startEdit(null));
          }}
        >
          New
        </button>
        {user && (
          <span>
            {user.thumbnail && (
              <img
                style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
                src={user.thumbnail}
                alt={user.username}
              />
            )}
            {user.username}
          </span>
        )}
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
          <a
            href={
              (process.env.REACT_APP_API_URL || "") +
              "/api/auth/google/redirect"
            }
          >
            Login
          </a>
        )}
        <div></div>
      </div>
    </div>
  );
};

export default StatusBar;
