/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Tag from "../common/Tag";
import MarkdownViewer from "../common/MarkdownViewer";

const ZettelListItemCss = css`
  height: 200px;
  margin: 0.8rem;
  border: 1px solid black;
  border-radius: 0.8rem;
  padding: 1rem;
  h3 {
    font-size: 1.25rem;
  }
`;

type ZettelListItemProps = Zettel & {};
function ZettelListItem({
  number,
  id,
  content,
  title,
  tags,
  createdAt,
}: ZettelListItemProps) {
  return (
    <div css={ZettelListItemCss}>
      <div>{number}</div>
      <h3>{title}</h3>
      <div className="zettel-content">
        <MarkdownViewer content={content} />
      </div>
      <div>
        날짜 {createdAt.getMonth() + 1}월 {createdAt.getDate()}일
      </div>
      <div>{tags && tags.map((tag) => <Tag key={tag} name={tag} />)}</div>
    </div>
  );
}

export default ZettelListItem;
