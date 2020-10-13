import React, { useMemo } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import parseMarkdown from "../../../lib/markdownParser";

const MarkdownRendererCss = css`
  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0.8rem;
  }

  h1,
  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.2rem;
  }

  h4 {
    font-size: 1rem;
  }

  blockquote {
    margin: 1rem 1.3rem;
    border-left: 0.5rem solid green;
    padding-left: 0.7rem;
  }

  code {
    font-family: monospace;
    background-color: rgba(27, 31, 35, 0.05);
    padding: 3px 5px;
  }

  pre {
    margin: 1rem 0;
    padding: 1rem;
    white-space: pre;
    border: 1px solid gray;

    code {
      background-color: inherit;
      padding: 0;
    }
  }

  ol,
  ul {
    margin: 0.5rem 1.5rem;
  }
  ol {
    list-style: decimal;
  }

  ul {
    list-style: disc;
  }

  li + li {
    margin-block-start: 0.3rem;
  }

  .internal-link {
    text-decoration: none;
    color: #555555;
  }

  .internal-link::before {
    content: "[[";
    margin-right: 0.2rem;
  }

  .internal-link::after {
    content: "]]";
    margin-left: 0.2rem;
  }
`;

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const renderedMarkdown = parseMarkdown(content);

  return (
    <article
      css={MarkdownRendererCss}
      dangerouslySetInnerHTML={{ __html: renderedMarkdown.contents as string }}
    ></article>
  );
};

export default MarkdownRenderer;
