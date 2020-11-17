import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import ContentRenderer from "./ContentRenderer";
import ContentType from "../../../../types/content-type";
import SourceRenderer from "./SourceRenderer";

const BookmarkRendererCss = css``;

const BookmarkRenderer: React.FC<{
  meta: { renderer: ContentType; url?: string; source?: Source };
  content: string;
}> = ({ content, meta }) => {
  return (
    <div css={BookmarkRendererCss}>
      {meta.url ? (
        <div>deprecated: {meta.url}</div>
      ) : meta.source ? (
        <SourceRenderer source={meta.source} />
      ) : (
        <div>no source</div>
      )}
      <ContentRenderer content={content} meta={meta} />
    </div>
  );
};

export default BookmarkRenderer;
