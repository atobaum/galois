import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useParams } from "react-router-dom";
import StatusBar from "../components/core/StatusBar";

const ZettelPageCss = css``;

const ZettelPage: React.FC = () => {
  const params = useParams() as { id?: number };
  return (
    <div css={ZettelPageCss}>
      <StatusBar />
      {params.id}
    </div>
  );
};

export default ZettelPage;
