import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

function splitContent(content: string): string[] {
  const idx = content.indexOf("\n\n");

  const url = content.substr(0, idx).trim();
  const desc = content.substr(idx + 2).trim();

  return [url, desc];
}
const BookmarkRendererCss = css``;

const BookmarkRenderer: React.FC<{ content: string }> = ({ content }) => {
  const [src, desc] = splitContent(content);

  return (
    <div css={BookmarkRendererCss}>
      <a href={src} target="_blank" rel="noopener noreferrer">
        {src}
      </a>
      <div>{desc}</div>
    </div>
  );
};

export default BookmarkRenderer;
