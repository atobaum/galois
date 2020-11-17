import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import SourceType from "../../../types/source-type";

const SourceRendererCss = css`
  margin-bottom: 1rem;
  border: 1px solid brown;
`;

const SourceRenderer: React.FC<{
  source: Source;
}> = ({ source: { type, data } }) => {
  return (
    <div css={SourceRendererCss}>
      <div>출처</div>
      {type === SourceType.URL ? (
        <a href={data} target="_blank" rel="noopener noreferrer">
          {data}
        </a>
      ) : type === SourceType.BOOK ? (
        <div>
          <span>책 : </span>
          <span>{data}</span>
        </div>
      ) : (
        <div>Unsupported source type: {type}</div>
      )}
    </div>
  );
};

export default SourceRenderer;
