import React from "react";
import { render } from "@testing-library/react";
import MarkdownRenderer from "../Renderer/ArticleRenderer/ContentRenderer/MarkdownRenderer";

describe("MarkdownViewer", () => {
  const testMarkdown =
    "# header1\r\n## header2\r\n### header3\r\n\r\n[[ 1 | internal link ]]\r\n\r\n**bold**";
  it("internal link가 잘 나온다", () => {
    const { getByText } = render(<MarkdownRenderer content={testMarkdown} />);

    getByText("header1");
    const internalLink = getByText("internal link");

    expect(internalLink.tagName).toBe("A");
    expect(internalLink.getAttribute("href")).toBe("/zettel/1");
  });
});
