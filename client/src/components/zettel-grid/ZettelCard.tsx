/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Tag from "../common/Tag";
import { useEffect, useMemo, useRef } from "react";
import parseMarkdown from "../../lib/markdownParser";
import { Card, CardContent } from "@material-ui/core";

export const ZettelCardCss = css`
  /* height: 180px;
  border: 1px solid black;
  padding: 0.3rem; */
  h3 {
    font-size: 1.25rem;
  }

  .zettel-content {
    max-height: 10rem;
    overflow: hidden;
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
  onClick?: (number: number) => void;
  zettel: Zettel;
};

function ZettelCard({
  zettel: { id, number, content, title, tags },
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
    <Card
      variant="outlined"
      onClick={() => onClick && onClick(number)}
      css={ZettelCardCss}
    >
      <CardContent>
        {number}

        <h3>{title}</h3>
      </CardContent>
      <CardContent
        ref={dom}
        className="zettel-content"
        dangerouslySetInnerHTML={{ __html: parsedContent.contents as string }}
      ></CardContent>
      <CardContent>
        {tags.map((tag) => (
          <Tag name={tag} key={tag} />
        ))}
      </CardContent>
    </Card>
  );
}

export default ZettelCard;
