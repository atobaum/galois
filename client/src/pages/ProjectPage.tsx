import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useParams } from "react-router-dom";
import useSetTitle from "../hooks/useSetTitle";
import StatusBar from "../components/core/StatusBar";

const ProjectPageCss = css``;

const ProjectPage: React.FC = () => {
  const { id } = useParams() as { id?: string };
  useSetTitle("projest " + id);
  return (
    <div css={ProjectPageCss}>
      <StatusBar />
    </div>
  );
};

export default ProjectPage;
