import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import StatusBar from "../components/core/StatusBar";
import useSetTitle from "../hooks/useSetTitle";

const ProjectListPageCss = css``;

const ProjectListPage: React.FC = () => {
  useSetTitle("Projests");

  return (
    <div css={ProjectListPageCss}>
      <StatusBar />
    </div>
  );
};

export default ProjectListPage;
