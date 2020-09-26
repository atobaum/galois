import React, { useMemo } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Tag from "../Tag";
import { useHistory } from "react-router-dom";
import parseMarkdown from "../../lib/markdownParser";

const ZettelViewerCss = css``;

type ZettelViewerProps = {
  title: string | null;
  content: string;
  tags: string[];
};

const ZettelViewer: React.FC<ZettelViewerProps> = ({
  title,
  content,
  tags,
}) => {
  const history = useHistory();
  const parsedContent = useMemo(() => {
    return parseMarkdown(content);
  }, [content]);
  return (
    <div css={ZettelViewerCss}>
      <div>{title}</div>
      <div>
        {tags &&
          tags.map((tag) => (
            <Tag
              name={tag}
              key={tag}
              onClick={() => history.push(`/tag/${tag}`)}
            />
          ))}
      </div>
      <div
        className="zettel-content"
        dangerouslySetInnerHTML={{
          __html: parsedContent.contents as string,
        }}
      ></div>
    </div>
  );
};

export default ZettelViewer;
