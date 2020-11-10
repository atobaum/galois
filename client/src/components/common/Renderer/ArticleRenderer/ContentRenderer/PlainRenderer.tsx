import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const PlainRendererCss = css`
  white-space: pre-wrap;
`;

const PlainRenderer: React.FC<{ content: string }> = ({ content }) => {
  return <div css={PlainRendererCss}>{content}</div>;
};

export default PlainRenderer;
