/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Tag from "./Tag";
import { Zettel } from "../models/Zettel";

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

type ZettelCardProps = Zettel & {};
function ZettelCard({ id, content, title, tags }: ZettelCardProps) {
  return (
    <div css={ZettelCardCss}>
      <div>{id}</div>
      <h3>{title}</h3>
      <div>{content}</div>
      <div>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <button>Archive</button>
      <button>Edit</button>
      <button>More</button>
    </div>
  );
}

export default ZettelCard;
