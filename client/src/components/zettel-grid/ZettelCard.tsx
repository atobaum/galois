/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Tag from "../Tag";
import { Zettel } from "../../models/Zettel";
import { useMemo } from "react";
import parseMarkdown from "../../lib/markdownParser";

export const ZettelCardCss = css`
  width: 300px;
  height: 200px;
  border: 1px solid black;
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

type ZettelCardProps = Zettel & {
  onClick?: (id: number) => void;
};

function ZettelCard({ id, content, title, tags, onClick }: ZettelCardProps) {
  const parsedContent = useMemo(() => {
    return parseMarkdown(content);
  }, [content]);

  return (
    <div css={ZettelCardCss} onClick={() => onClick && onClick(id)}>
      <div>{id}</div>
      <h3>{title}</h3>
      <div
        className="zettel-content"
        dangerouslySetInnerHTML={{ __html: parsedContent.contents as string }}
      ></div>
      <div>{tags && tags.map((tag) => <Tag name={tag} key={tag} />)}</div>
    </div>
  );
}

export default ZettelCard;
