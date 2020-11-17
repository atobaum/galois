import React from "react";
import ContentType from "../../../types/content-type";
import MarkdownRenderer from "./MarkdownRenderer";
import PlainRenderer from "./PlainRenderer";

const ContentRenderer: React.FC<{
  content: string;
  meta: { renderer: ContentType };
}> = React.memo(({ content, meta }) => {
  switch (meta.renderer) {
    case ContentType.MARKDOWN:
      return <MarkdownRenderer content={content} />;
    case ContentType.PLAIN:
      return <PlainRenderer content={content} />;
    default:
      return <div>{meta.renderer} is not supported</div>;
  }
});

export default ContentRenderer;
