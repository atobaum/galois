import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import ContentRenderer from "./renderer-component/ContentRenderer";
import SourceRenderer from "./renderer-component/SourceRenderer";

const RendererCss = css``;

const ArticleRenderer: React.FC<{
  content: string;
  meta: any;
}> = ({ meta, content }) => {
  return (
    <div css={RendererCss}>
      {meta.url ? (
        <div>deprecated: {meta.url}</div>
      ) : meta.source ? (
        <SourceRenderer source={meta.source} />
      ) : null}

      <ContentRenderer content={content} meta={meta} />
    </div>
  );
};

export default ArticleRenderer;
