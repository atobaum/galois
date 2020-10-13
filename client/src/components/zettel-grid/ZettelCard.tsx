/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Tag from "../common/Tag";
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@material-ui/core";
import ContentRenderer from "../common/content-renderer/ContentRenderer";

export const ZettelCardCss = css`
  /* height: 180px;
  border: 1px solid black;
  padding: 0.3rem; */
  h3 {
    font-size: 1.25rem;
  }

  .zettel-content {
    overflow: hidden;
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
  zettel: { number, content, title, tags, contentType },
  onClick,
}: ZettelCardProps) {
  const dom = useRef<any>();

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
      <CardContent ref={dom} className="zettel-content">
        <ContentRenderer content={content} contentType={contentType} />
      </CardContent>
      <CardContent>
        {tags.map((tag) => (
          <Tag name={tag} key={tag} />
        ))}
      </CardContent>
    </Card>
  );
}

export default ZettelCard;
