import React, { useMemo } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { ZettelCardCss } from "./ZettelCard";
import parseMarkdown from "../../lib/markdownParser";
import Tag from "../Tag";

const PendingZettelCardCss = css`
  ${ZettelCardCss}
`;

const PendingZettelCard: React.FC<{ loading: boolean; zettel: NewZettel }> = ({
  loading,
  zettel,
}) => {
  const parsedContent = useMemo(() => {
    return parseMarkdown(zettel.content);
  }, [zettel.content]);
  return (
    <div css={PendingZettelCardCss}>
      <div>{loading ? "loding중" : "실패"}</div>
      <h3>{zettel.title}</h3>
      <div
        className="zettel-content"
        dangerouslySetInnerHTML={{ __html: parsedContent.contents as string }}
      ></div>
      <div>
        {zettel.tags.map((tag) => (
          <Tag name={tag} key={tag} />
        ))}
      </div>
    </div>
  );
};

export default PendingZettelCard;
