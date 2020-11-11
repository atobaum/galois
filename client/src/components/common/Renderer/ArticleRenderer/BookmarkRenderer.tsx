import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import ContentRenderer from "./ContentRenderer";
import ContentType from "../../../../types/content-type";

const BookmarkRendererCss = css``;

const BookmarkRenderer: React.FC<{
  meta: { renderer: ContentType; url: string };
  content: string;
}> = ({ content, meta }) => {
  return (
    <div css={BookmarkRendererCss}>
      <a href={meta.url} target="_blank" rel="noopener noreferrer">
        {meta.url}
      </a>
      <ContentRenderer content={content} meta={meta} />
    </div>
  );
};

export default BookmarkRenderer;
