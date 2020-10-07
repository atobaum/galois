/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Tag from "../common/Tag";
import { useMemo } from "react";
import parseMarkdown from "../../lib/markdownParser";

const ZettelListItemCss = css`
  height: 200px;
  margin: 0.8rem;
  border: 1px solid black;
  border-radius: 0.8rem;
  padding: 1rem;
  h3 {
    font-size: 1.25rem;
  }

  .zettel-content {
    ol,
    ul {
      margin: 0 1rem;
    }
    ol {
      list-style: decimal;
    }

    ul {
      list-style: disc;
    }
  }
`;

type ZettelListItemProps = Zettel & {};
function ZettelListItem({
  id,
  content,
  title,
  tags,
  createdAt,
}: ZettelListItemProps) {
  const parsedContent = useMemo(() => {
    return parseMarkdown(content);
  }, [content]);

  return (
    <div css={ZettelListItemCss}>
      <div>{id}</div>
      <h3>{title}</h3>
      <div
        className="zettel-content"
        dangerouslySetInnerHTML={{ __html: parsedContent.contents as string }}
      ></div>
      <div>
        날짜 {createdAt.getMonth() + 1}월 {createdAt.getDate()}일
      </div>
      <div>{tags && tags.map((tag) => <Tag key={tag} name={tag} />)}</div>
    </div>
  );
}

export default ZettelListItem;
