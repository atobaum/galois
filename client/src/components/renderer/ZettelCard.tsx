/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Tag from "../common/Tag";
import { useEffect, useMemo, useRef } from "react";
import { Card, CardContent } from "@material-ui/core";
import ArticleRenderer from "./BasicRenderer";

const generateCss = (loading: boolean | undefined) => css`
  position: relative;
  h3 {
    font-size: 1.25rem;
  }

  .zettel-content {
    overflow: hidden;
    a {
      cursor: default;
    }
  }

  ${loading === true
    ? css`
        .zettel-foreground {
          position: absolute;
          width: 100%;
          height: 100%;
          backdrop-filter: blur(0.7px);
        }
      `
    : ""}
`;

type ZettelCardProps = {
  onClick?: (number: number) => void;
  zettel: Zettel | NewZettel;
  loading?: boolean; // true면 api call중, false면 실패, undefined면 저장 완료
};

function ZettelCard({
  zettel: { number, content, title, tags, type, meta },
  onClick,
  loading,
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
  const Cardcss = useMemo(() => generateCss(loading), [loading]);

  return (
    <Card
      variant="outlined"
      onClick={() => onClick && onClick(number || -1)}
      css={Cardcss}
      className={loading === undefined ? "" : "zettel-loading"}
    >
      <div className="zettel-foreground"></div>
      <CardContent className="flex">
        <div>
          <span>{type}</span>
          {number ? number : loading ? "기달" : "실패"}
        </div>
        <h3>{title}</h3>
      </CardContent>
      <CardContent ref={dom} className="zettel-content">
        <ArticleRenderer content={content} meta={meta} />
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
