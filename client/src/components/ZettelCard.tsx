/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Tag from "./Tag";
import { Zettel } from "../models/Zettel";
import { useMemo } from "react";
import parseMarkdown from "../lib/markdownParser";
import { Link, useHistory } from "react-router-dom";

const ZettelCardCss = css`
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
  onDelete: (id: number) => void;
};
function ZettelCard({ id, content, title, tags, onDelete }: ZettelCardProps) {
  const parsedContent = useMemo(() => {
    return parseMarkdown(content);
  }, [content]);
  const history = useHistory();

  return (
    <div css={ZettelCardCss}>
      <div>{id}</div>
      <h3>{title}</h3>
      <div
        className="zettel-content"
        dangerouslySetInnerHTML={{ __html: parsedContent.contents as string }}
      ></div>
      <div>
        {tags &&
          tags.map((tag) => (
            <Tag key={tag} onClick={() => history.push(`/tag/${tag}`)}>
              {tag}
            </Tag>
          ))}
      </div>
      <button>Archive</button>
      <button>Edit</button>
      <button
        onClick={async () => {
          if (window.confirm("삭제 ㄱ?")) {
            onDelete(id);
          }
        }}
      >
        Delete
      </button>
      <Link to={`/zettel/${id}`}>More</Link>
    </div>
  );
}

export default ZettelCard;
