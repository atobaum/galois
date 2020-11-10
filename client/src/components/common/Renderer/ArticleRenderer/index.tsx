import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import ZettelType from "../../../../types/zettel-type";
import BookmarkRenderer from "./BookmarkRenderer";
import ContentRenderer from "./ContentRenderer";

const RendererCss = css``;

const ArticleRenderer: React.FC<{
  content: string;
  meta: any;
  type: ZettelType;
}> = ({ meta, content, type }) => {
  let TypeRenderer;
  switch (type) {
    case ZettelType.BOOKMARK:
      TypeRenderer = BookmarkRenderer;
      break;
    default:
      TypeRenderer = ContentRenderer;
  }
  return (
    <div css={RendererCss}>
      <TypeRenderer content={content} meta={meta} />
    </div>
  );
};

export default ArticleRenderer;
