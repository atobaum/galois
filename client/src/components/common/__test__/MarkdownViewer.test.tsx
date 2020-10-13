import React from "react";
import { render } from "@testing-library/react";
import MarkdownViewer from "../MarkdownViewer";

describe("MarkdownViewer", () => {
  const testMarkdown =
    "# header1\r\n## header2\r\n### header3\r\n\r\n[[ 1 | internal link ]]\r\n\r\n**bold**";
  it("render markdown", () => {
    const { getByText } = render(<MarkdownViewer content={testMarkdown} />);

    getByText("header1");
    const internalLink = getByText("internal link");

    expect(internalLink.tagName).toBe("A");
    expect(internalLink.getAttribute("href")).toBe("/zettel/1");
  });
});
