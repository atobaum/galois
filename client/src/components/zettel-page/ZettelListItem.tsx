/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import ArticleRenderer from "../common/Renderer/ArticleRenderer";
import Tag from "../common/Tag";

const ZettelListItemCss = css`
  height: 200px;
  margin: 0.8rem;
  border: 1px solid black;
  border-radius: 0.8rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 1.25rem;
  }

  .zettel-number {
    color: gray;
    margin-right: 0.2rem;
  }

  .zettel-content {
    flex-grow: 1;
    overflow: hidden;
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
  meta,
  type,
}: ZettelListItemProps) {
  return (
    <div css={ZettelListItemCss}>
      <div className="flex">
        <span>{type}</span>
        <div className="zettel-number">{number}</div>
      </div>
      <h3>{title}</h3>
      <div className="zettel-content">
        <ArticleRenderer content={content} meta={meta} />
      </div>
      <div>
        날짜 {createdAt.getMonth() + 1}월 {createdAt.getDate()}일
      </div>
      <div>{tags && tags.map((tag) => <Tag key={tag} name={tag} />)}</div>
    </div>
  );
}

export default ZettelListItem;
