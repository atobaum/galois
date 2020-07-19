import React from "react";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Tag from "./Tag";

const ZettelCardCss = css`
  width: 300px;
  height: 200px;
  border: 1px solid black;
  h3 {
    font-size: 1.25rem;
  }
  div {
    white-space: pre-line;
  }
`;

type ZettelCardProps = {
  content: string;
  tags: string[];
  title: string;
  source: string;
};
function ZettelCard({ content, title, tags, source }: ZettelCardProps) {
  return (
    <div css={ZettelCardCss}>
      <h3>{title}</h3>
      <div>{content}</div>
      <div>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div>{source}</div>
      <button>Archive</button>
      <button>Edit</button>
      <button>More</button>
    </div>
  );
}

export default ZettelCard;
