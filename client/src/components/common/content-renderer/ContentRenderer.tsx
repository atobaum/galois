import React from "react";
import ContentType from "../../../types/content-type";
import MarkdownRenderer from "./MarkdownRenderer";
import PlainRenderer from "./PlainRenderer";

const ContentRenderer: React.FC<{
  content: string;
  contentType: ContentType;
}> = ({ content, contentType }) => {
  switch (contentType) {
    case ContentType.MARKDOWN:
      return <MarkdownRenderer content={content} />;
    case ContentType.PLAIN:
      return <PlainRenderer content={content} />;
    default:
      return <div>{contentType} is not supported</div>;
  }
};

export default ContentRenderer;
