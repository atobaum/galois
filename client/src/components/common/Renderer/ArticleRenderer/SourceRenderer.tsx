import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import SourceType from "../../../../types/source-type";

const SourceRendererCss = css``;

const SourceRenderer: React.FC<{
  source: Source;
}> = ({ source: { type, data } }) => {
  return (
    <div css={SourceRendererCss}>
      {type === SourceType.URL ? (
        <a href={data} target="_blank" rel="noopener noreferrer">
          {data}
        </a>
      ) : null}
    </div>
  );
};

export default SourceRenderer;
