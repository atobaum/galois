/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Tag from "../common/Tag";
import { useEffect, useMemo, useRef } from "react";
import parseMarkdown from "../../lib/markdownParser";

export const ZettelCardCss = css`
  height: 180px;
  border: 1px solid black;
  padding: 0.3rem;
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

    a {
      cursor: default;
    }
  }
`;

type ZettelCardProps = {
  onClick?: (id: number) => void;
  zettel: Zettel;
};

function ZettelCard({
  zettel: { id, content, title, tags },
  onClick,
}: ZettelCardProps) {
  const dom = useRef<any>();
  const parsedContent = useMemo(() => {
    return parseMarkdown(content);
  }, [content]);

  useEffect(() => {
    const links: any[] = dom.current.querySelectorAll(".internal-link");
    links.forEach((link) =>
      link.addEventListener("click", (e: Event) => {
        e.preventDefault();
      })
    );
  }, []);

  return (
    <div css={ZettelCardCss} onClick={() => onClick && onClick(id)}>
      <div>{id}</div>
      <h3>{title}</h3>
      <div
        ref={dom}
        className="zettel-content"
        dangerouslySetInnerHTML={{ __html: parsedContent.contents as string }}
      ></div>
      <div>
        {tags.map((tag) => (
          <Tag name={tag} key={tag} />
        ))}
      </div>
    </div>
  );
}

export default ZettelCard;
