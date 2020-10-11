import React from "react";
import { Link } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";
import logout from "../../lib/logout";
import { AppBar, Icon, Toolbar, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";

const StatusBar: React.FC = () => {
  const user = useCurrentUser();
  const title = useSelector((state: RootState) => state.core.title);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Link to="/">
          <Icon>home</Icon>
        </Link>
        <Link to="/projects">
          <Icon>apps</Icon>
        </Link>
        <Typography style={{ flexGrow: 1 }}>{title}</Typography>
        <div>
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
            <button onClick={logout}>Logout</button>
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
      </Toolbar>
    </AppBar>
  );
};

export default StatusBar;
